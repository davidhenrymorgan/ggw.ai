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
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Explore</h1>

            {/* Filters */}
            <div className="flex items-center gap-4">
              {/* Type Filter */}
              <div className="flex gap-2 rounded-lg border bg-card p-1">
                <button
                  onClick={() => setFilter("all")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    filter === "all"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("images")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    filter === "images"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Images
                </button>
                <button
                  onClick={() => setFilter("videos")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    filter === "videos"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Videos
                </button>
              </div>

              {/* Sort */}
              <div className="flex gap-2 rounded-lg border bg-card p-1">
                <button
                  onClick={() => setSort("new")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    sort === "new"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  New
                </button>
                <button
                  onClick={() => setSort("trending")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    sort === "trending"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
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
