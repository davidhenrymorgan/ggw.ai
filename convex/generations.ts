import { v } from "convex/values";
import { mutation, action, query } from "./_generated/server";
import { api } from "./_generated/api";
import { initPromptchanClient, calculateImageCost } from "./lib/promptchan";
import { initR2Storage, R2Storage } from "./lib/r2";
import { getCurrentUserOrThrow } from "./users";

/**
 * Create image generation request
 */
export const createImageGeneration = mutation({
  args: {
    prompt: v.string(),
    negativePrompt: v.optional(v.string()),
    style: v.optional(v.string()),
    quality: v.optional(v.string()),
    seed: v.optional(v.number()),
  },
  returns: v.id("generations"),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Calculate credit cost
    const creditsUsed = calculateImageCost(args.quality || "standard");

    // TODO: Check user has enough credits
    // const balance = await ctx.db.query("credits").filter(q => q.eq(q.field("userId"), user._id)).first();
    // if (!balance || balance.amount < creditsUsed) {
    //   throw new Error("Insufficient credits");
    // }

    // Create generation record
    const generationId = await ctx.db.insert("generations", {
      userId: user._id,
      type: "image",
      prompt: args.prompt,
      negativePrompt: args.negativePrompt,
      settings: {
        style: args.style,
        quality: args.quality || "standard",
        seed: args.seed,
      },
      engine: "promptchan",
      status: "pending",
      creditsUsed,
      createdAt: Date.now(),
    });

    // Trigger async processing
    await ctx.scheduler.runAfter(0, api.generations.processImageGeneration, {
      generationId,
    });

    return generationId;
  },
});

/**
 * Process image generation (action - can call external APIs)
 */
export const processImageGeneration = action({
  args: {
    generationId: v.id("generations"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Get generation record
    const generation = await ctx.runQuery(api.generations.getById, {
      id: args.generationId,
    });

    if (!generation) {
      throw new Error("Generation not found");
    }

    try {
      // Update status to processing
      await ctx.runMutation(api.generations.updateStatus, {
        id: args.generationId,
        status: "processing",
      });

      // Call Promptchan API
      const promptchan = initPromptchanClient();
      const result = await promptchan.generateImage({
        prompt: generation.prompt,
        negative_prompt: generation.negativePrompt,
        style: generation.settings.style,
        quality: generation.settings.quality as any,
        seed: generation.settings.seed,
      });

      if (!result.success || !result.image_base64) {
        throw new Error(result.error || "Image generation failed");
      }

      // Upload to R2
      const r2 = initR2Storage();
      const key = R2Storage.generateKey(
        generation.userId,
        args.generationId,
        "original.jpg"
      );

      const cdnUrl = await r2.uploadBase64(result.image_base64, key, "image/jpeg");

      // Create asset record
      const assetId = await ctx.runMutation(api.generations.createAsset, {
        generationId: args.generationId,
        cdnUrl,
        r2Key: key,
      });

      // Mark generation as completed
      await ctx.runMutation(api.generations.updateStatus, {
        id: args.generationId,
        status: "completed",
        assetId,
        completedAt: Date.now(),
      });
    } catch (error) {
      // Mark as failed
      await ctx.runMutation(api.generations.updateStatus, {
        id: args.generationId,
        status: "failed",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      });

      // TODO: Refund credits
    }

    return null;
  },
});

/**
 * Get generation by ID (internal query)
 */
export const getById = query({
  args: {
    id: v.id("generations"),
  },
  returns: v.union(
    v.object({
      _id: v.id("generations"),
      _creationTime: v.number(),
      userId: v.string(),
      type: v.union(v.literal("image"), v.literal("video")),
      prompt: v.string(),
      negativePrompt: v.optional(v.string()),
      settings: v.object({
        style: v.optional(v.string()),
        quality: v.optional(v.string()),
        aspectRatio: v.optional(v.string()),
        seed: v.optional(v.number()),
      }),
      engine: v.string(),
      status: v.union(
        v.literal("pending"),
        v.literal("processing"),
        v.literal("completed"),
        v.literal("failed")
      ),
      assetId: v.optional(v.id("assets")),
      creditsUsed: v.number(),
      requestId: v.optional(v.string()),
      errorMessage: v.optional(v.string()),
      createdAt: v.number(),
      completedAt: v.optional(v.number()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/**
 * Update generation status (internal mutation)
 */
export const updateStatus = mutation({
  args: {
    id: v.id("generations"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    assetId: v.optional(v.id("assets")),
    errorMessage: v.optional(v.string()),
    completedAt: v.optional(v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return null;
  },
});

/**
 * Create asset from generation result
 */
export const createAsset = mutation({
  args: {
    generationId: v.id("generations"),
    cdnUrl: v.string(),
    r2Key: v.string(),
  },
  returns: v.id("assets"),
  handler: async (ctx, args) => {
    const generation = await ctx.db.get(args.generationId);
    if (!generation) {
      throw new Error("Generation not found");
    }

    const assetId = await ctx.db.insert("assets", {
      userId: generation.userId,
      type: "image",
      visibility: "public",
      status: "ready",
      r2Key: args.r2Key,
      cdnUrl: args.cdnUrl,
      prompt: generation.prompt,
      likeCount: 0,
      createdAt: Date.now(),
    });

    return assetId;
  },
});

/**
 * Get user's generations
 */
export const getUserGenerations = query({
  args: {
    limit: v.optional(v.number()),
  },
  returns: v.array(
    v.object({
      _id: v.id("generations"),
      _creationTime: v.number(),
      userId: v.string(),
      type: v.union(v.literal("image"), v.literal("video")),
      prompt: v.string(),
      status: v.union(
        v.literal("pending"),
        v.literal("processing"),
        v.literal("completed"),
        v.literal("failed")
      ),
      assetId: v.optional(v.id("assets")),
      createdAt: v.number(),
      completedAt: v.optional(v.number()),
    })
  ),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    return await ctx.db
      .query("generations")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(args.limit || 50);
  },
});
