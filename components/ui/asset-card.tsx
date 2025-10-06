"use client";

import { Heart, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface AssetCardProps {
  id: string;
  type: "image" | "video";
  cdnUrl?: string;
  posterUrl?: string;
  prompt: string;
  likeCount: number;
}

export function AssetCard({
  id,
  type,
  cdnUrl,
  posterUrl,
  prompt,
  likeCount,
}: AssetCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const imageUrl = type === "video" ? posterUrl : cdnUrl;

  return (
    <div className="group relative mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80 hover:shadow-xl">
      {/* Image/Video Thumbnail */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={prompt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        )}

        {/* Video Play Icon */}
        {type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
              <Play className="ml-1 h-8 w-8 fill-black text-black" />
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-all hover:bg-black/60"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked
                ? "fill-red-500 text-red-500"
                : "fill-transparent text-white"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {prompt}
        </p>

        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Heart className="h-3.5 w-3.5" />
          <span>{likes.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
