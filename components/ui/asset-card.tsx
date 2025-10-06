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
    <div className="group relative mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/80 hover:shadow-glow hover:scale-[1.02] animate-fade-in">
      {/* Image/Video Thumbnail */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {/* Luminous glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-t from-brand-purple/20 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={prompt}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        )}

        {/* Video Play Icon with enhanced styling */}
        {type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-glow transition-transform group-hover:scale-110">
              <Play className="ml-1 h-10 w-10 fill-black text-black" />
            </div>
          </div>
        )}

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Like Button with gradient */}
        <button
          onClick={handleLike}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md transition-all duration-200 hover:bg-black/70 hover:scale-110"
        >
          <Heart
            className={`h-5 w-5 transition-all duration-200 ${
              isLiked
                ? "fill-red-500 text-red-500 scale-110"
                : "fill-transparent text-white"
            }`}
          />
        </button>
      </div>

      {/* Content with enhanced spacing */}
      <div className="p-5">
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {prompt}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Heart className="h-4 w-4" />
          <span className="font-medium">{likes.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
