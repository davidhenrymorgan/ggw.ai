"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AssetCard } from "./asset-card";

interface GalleryGridProps {
  filter: "all" | "images" | "videos";
  sort: "new" | "trending";
}

export function GalleryGrid({ filter, sort }: GalleryGridProps) {
  const assets = useQuery(api.assets.getExploreFeed, {
    filter,
    sort,
    limit: 50,
  });

  if (!assets) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-foreground" />
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-muted-foreground">No assets yet</p>
        <p className="text-sm text-muted-foreground">
          Be the first to create something!
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {assets.map((asset) => (
        <AssetCard
          key={asset._id}
          id={asset._id}
          type={asset.type}
          cdnUrl={asset.cdnUrl}
          posterUrl={asset.posterUrl}
          prompt={asset.prompt}
          likeCount={asset.likeCount}
        />
      ))}
    </div>
  );
}
