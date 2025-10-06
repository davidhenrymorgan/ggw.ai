"use client";

import { AssetCard } from "./asset-card";

interface GalleryGridProps {
  filter: "all" | "images" | "videos";
  sort: "new" | "trending";
}

// Mock data for now - will be replaced with Convex query
const MOCK_ASSETS = [
  {
    id: "1",
    type: "image" as const,
    cdnUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    prompt: "A beautiful portrait in cinematic style",
    likeCount: 42,
    userId: "user1",
  },
  {
    id: "2",
    type: "video" as const,
    cdnUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    posterUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    prompt: "An animated video with smooth transitions",
    likeCount: 89,
    userId: "user2",
  },
  {
    id: "3",
    type: "image" as const,
    cdnUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
    prompt: "Fashion portrait with dramatic lighting",
    likeCount: 156,
    userId: "user3",
  },
  {
    id: "4",
    type: "image" as const,
    cdnUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    prompt: "Elegant pose in studio setting",
    likeCount: 203,
    userId: "user4",
  },
  {
    id: "5",
    type: "video" as const,
    cdnUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    posterUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    prompt: "Dynamic movement captured in slow motion",
    likeCount: 124,
    userId: "user5",
  },
  {
    id: "6",
    type: "image" as const,
    cdnUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    prompt: "Natural light portrait with soft shadows",
    likeCount: 78,
    userId: "user6",
  },
];

export function GalleryGrid({ filter, sort }: GalleryGridProps) {
  // Filter assets
  const filteredAssets = MOCK_ASSETS.filter((asset) => {
    if (filter === "all") return true;
    if (filter === "images") return asset.type === "image";
    if (filter === "videos") return asset.type === "video";
    return true;
  });

  // Sort assets
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sort === "trending") {
      return b.likeCount - a.likeCount;
    }
    // "new" - already in order for mock data
    return 0;
  });

  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {sortedAssets.map((asset) => (
        <AssetCard
          key={asset.id}
          id={asset.id}
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
