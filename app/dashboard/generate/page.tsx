"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [style, setStyle] = useState("cinematic_xl");
  const [quality, setQuality] = useState("standard");
  const [isGenerating, setIsGenerating] = useState(false);

  const createGeneration = useMutation(api.generations.createImageGeneration);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      await createGeneration({
        prompt,
        negativePrompt: negativePrompt || undefined,
        style,
        quality,
      });

      // Reset form
      setPrompt("");
      setNegativePrompt("");
      alert("Generation started! Check your dashboard for results.");
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const creditCost = quality === "standard" ? 1 : quality === "high" ? 2 : 5;

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Generate Image</h1>
        <p className="text-muted-foreground">
          Create AI-generated images using Promptchan
        </p>
      </div>

      <div className="space-y-6 rounded-lg border bg-card p-6">
        {/* Prompt */}
        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="Describe what you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            {prompt.length} / 500 characters
          </p>
        </div>

        {/* Negative Prompt */}
        <div className="space-y-2">
          <Label htmlFor="negative-prompt">Negative Prompt (Optional)</Label>
          <Textarea
            id="negative-prompt"
            placeholder="What to avoid in the generation..."
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            rows={2}
            className="resize-none"
          />
        </div>

        {/* Style */}
        <div className="space-y-2">
          <Label htmlFor="style">Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger id="style">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cinematic_xl">Cinematic XL</SelectItem>
              <SelectItem value="anime_xl_plus">Anime XL+</SelectItem>
              <SelectItem value="realistic_xl">Realistic XL</SelectItem>
              <SelectItem value="artistic_xl">Artistic XL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quality */}
        <div className="space-y-2">
          <Label htmlFor="quality">Quality</Label>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger id="quality">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard (1 credit)</SelectItem>
              <SelectItem value="high">High (2 credits)</SelectItem>
              <SelectItem value="max">Max (5 credits)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Cost: <span className="font-semibold">{creditCost} credits</span>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            size="lg"
          >
            {isGenerating ? "Generating..." : "Generate Image"}
          </Button>
        </div>
      </div>
    </div>
  );
}
