"use client";

import { useState } from "react";
import { GalleryGrid } from "@/components/ui/gallery-grid";

type FilterType = "all" | "images" | "videos";
type SortType = "new" | "trending";

export default function ExplorePage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("new");

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header with gradient backdrop */}
      <div className="sticky top-0 z-10 border-b border-border/50 bg-gradient-to-b from-background via-background/95 to-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
              <p className="text-sm text-muted-foreground">Discover amazing AI-generated content</p>
            </div>

            {/* Filters with glass morphism */}
            <div className="flex items-center gap-3">
              {/* Type Filter */}
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 hover:bg-card/80 hover:border-border hover:shadow-glow transition-all duration-300 flex gap-1.5 rounded-2xl p-1.5">
                <button
                  onClick={() => setFilter("all")}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    filter === "all"
                      ? "bg-gradient-card-purple text-white shadow-glow-purple"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("images")}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    filter === "images"
                      ? "bg-gradient-card-cyan text-white shadow-glow-cyan"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  Images
                </button>
                <button
                  onClick={() => setFilter("videos")}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    filter === "videos"
                      ? "bg-gradient-card-gold text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  Videos
                </button>
              </div>

              {/* Sort */}
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 hover:bg-card/80 hover:border-border hover:shadow-glow transition-all duration-300 flex gap-1.5 rounded-2xl p-1.5">
                <button
                  onClick={() => setSort("new")}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    sort === "new"
                      ? "bg-gradient-card-magenta text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  New
                </button>
                <button
                  onClick={() => setSort("trending")}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    sort === "trending"
                      ? "bg-gradient-card-magenta text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  Trending
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <GalleryGrid filter={filter} sort={sort} />
      </div>
    </div>
  );
}
