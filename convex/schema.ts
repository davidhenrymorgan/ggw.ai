import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { paymentAttemptSchemaValidator } from "./paymentAttemptTypes";

export default defineSchema({
    users: defineTable({
      name: v.string(),
      // this the Clerk ID, stored in the subject JWT field
      externalId: v.string(),
    }).index("byExternalId", ["externalId"]),

    paymentAttempts: defineTable(paymentAttemptSchemaValidator)
      .index("byPaymentId", ["payment_id"])
      .index("byUserId", ["userId"])
      .index("byPayerUserId", ["payer.user_id"]),

    assets: defineTable({
      userId: v.id("users"),
      type: v.union(v.literal("image"), v.literal("video")),
      visibility: v.union(v.literal("public"), v.literal("private"), v.literal("unlisted")),
      status: v.union(v.literal("pending"), v.literal("processing"), v.literal("ready"), v.literal("failed")),
      r2Key: v.optional(v.string()),
      cdnUrl: v.optional(v.string()),
      thumbnailUrl: v.optional(v.string()),
      posterUrl: v.optional(v.string()),
      prompt: v.string(),
      metadata: v.optional(v.object({
        width: v.optional(v.number()),
        height: v.optional(v.number()),
        duration: v.optional(v.number()),
        fileSize: v.optional(v.number()),
      })),
      likeCount: v.number(),
      createdAt: v.number(),
    })
      .index("by_visibility", ["visibility", "createdAt"])
      .index("by_createdAt", ["createdAt"])
      .index("by_owner", ["userId", "createdAt"])
      .index("by_status", ["status"]),

    generations: defineTable({
      userId: v.id("users"),
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
      status: v.union(v.literal("pending"), v.literal("processing"), v.literal("completed"), v.literal("failed")),
      assetId: v.optional(v.id("assets")),
      creditsUsed: v.number(),
      requestId: v.optional(v.string()),
      errorMessage: v.optional(v.string()),
      createdAt: v.number(),
      completedAt: v.optional(v.number()),
    })
      .index("by_user", ["userId", "createdAt"])
      .index("by_status", ["status"])
      .index("by_user_and_status", ["userId", "status", "createdAt"]),

    likes: defineTable({
      userId: v.id("users"),
      assetId: v.id("assets"),
      createdAt: v.number(),
    })
      .index("by_user", ["userId", "createdAt"])
      .index("by_asset", ["assetId"])
      .index("by_user_and_asset", ["userId", "assetId"]),

    collections: defineTable({
      userId: v.id("users"),
      name: v.string(),
      description: v.optional(v.string()),
      parentId: v.optional(v.id("collections")),
      isFolder: v.boolean(),
      createdAt: v.number(),
    })
      .index("by_user", ["userId", "createdAt"])
      .index("by_parent", ["parentId"]),

    collectionItems: defineTable({
      collectionId: v.id("collections"),
      assetId: v.id("assets"),
      userId: v.id("users"),
      addedAt: v.number(),
    })
      .index("by_collection", ["collectionId", "addedAt"])
      .index("by_asset", ["assetId"])
      .index("by_user", ["userId"]),
  });