import { v } from "convex/values";
import { query } from "./_generated/server";

/**
 * Get public assets for explore feed
 */
export const getExploreFeed = query({
  args: {
    filter: v.union(v.literal("all"), v.literal("images"), v.literal("videos")),
    sort: v.union(v.literal("new"), v.literal("trending")),
    limit: v.optional(v.number()),
  },
  returns: v.array(
    v.object({
      _id: v.id("assets"),
      _creationTime: v.number(),
      userId: v.id("users"),
      type: v.union(v.literal("image"), v.literal("video")),
      cdnUrl: v.optional(v.string()),
      thumbnailUrl: v.optional(v.string()),
      posterUrl: v.optional(v.string()),
      prompt: v.string(),
      likeCount: v.number(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx, args) => {
    const limit = args.limit || 50;

    // Start with public assets
    let assetsQuery = ctx.db
      .query("assets")
      .withIndex("by_visibility", (q) => q.eq("visibility", "public"))
      .filter((q) => q.eq(q.field("status"), "ready"));

    // Apply type filter
    if (args.filter === "images") {
      assetsQuery = assetsQuery.filter((q) => q.eq(q.field("type"), "image"));
    } else if (args.filter === "videos") {
      assetsQuery = assetsQuery.filter((q) => q.eq(q.field("type"), "video"));
    }

    // Fetch assets
    let assets = await assetsQuery.take(limit);

    // Sort by trending (like count) if needed
    if (args.sort === "trending") {
      assets = assets.sort((a, b) => b.likeCount - a.likeCount);
    }
    // "new" is already sorted by createdAt desc from the index

    return assets;
  },
});

/**
 * Get asset by ID
 */
export const getById = query({
  args: {
    id: v.id("assets"),
  },
  returns: v.union(
    v.object({
      _id: v.id("assets"),
      _creationTime: v.number(),
      userId: v.id("users"),
      type: v.union(v.literal("image"), v.literal("video")),
      visibility: v.union(
        v.literal("public"),
        v.literal("private"),
        v.literal("unlisted")
      ),
      status: v.union(
        v.literal("pending"),
        v.literal("processing"),
        v.literal("ready"),
        v.literal("failed")
      ),
      r2Key: v.optional(v.string()),
      cdnUrl: v.optional(v.string()),
      thumbnailUrl: v.optional(v.string()),
      posterUrl: v.optional(v.string()),
      prompt: v.string(),
      metadata: v.optional(
        v.object({
          width: v.optional(v.number()),
          height: v.optional(v.number()),
          duration: v.optional(v.number()),
          fileSize: v.optional(v.number()),
        })
      ),
      likeCount: v.number(),
      createdAt: v.number(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/**
 * Get user's assets (their gallery)
 */
export const getUserAssets = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  returns: v.array(
    v.object({
      _id: v.id("assets"),
      _creationTime: v.number(),
      userId: v.id("users"),
      type: v.union(v.literal("image"), v.literal("video")),
      visibility: v.union(
        v.literal("public"),
        v.literal("private"),
        v.literal("unlisted")
      ),
      cdnUrl: v.optional(v.string()),
      thumbnailUrl: v.optional(v.string()),
      posterUrl: v.optional(v.string()),
      prompt: v.string(),
      likeCount: v.number(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("assets")
      .withIndex("by_owner", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "ready"))
      .order("desc")
      .take(args.limit || 50);
  },
});
