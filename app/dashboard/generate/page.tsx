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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/ui/image-upload";
import { Image as ImageIcon, Video, Wand2, Pencil } from "lucide-react";

type GenerationMode = "text-to-image" | "text-to-video" | "image-to-image" | "image-edit";

export default function GeneratePage() {
  const [mode, setMode] = useState<GenerationMode>("text-to-image");
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [style, setStyle] = useState("cinematic_xl");
  const [quality, setQuality] = useState("standard");
  const [isGenerating, setIsGenerating] = useState(false);

  // Image upload state
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const createGeneration = useMutation(api.generations.createImageGeneration);

  const handleImageSelect = (file: File) => {
    setUploadedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
    setImagePreview("");
  };

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

  const getModeConfig = () => {
    switch (mode) {
      case "text-to-video":
        return { title: "Generate Video", description: "Create AI-generated videos", creditCost: quality === "standard" ? 100 : quality === "high" ? 200 : 500 };
      case "image-to-image":
        return { title: "Image to Image", description: "Transform images with AI", creditCost: quality === "standard" ? 2 : quality === "high" ? 4 : 10 };
      case "image-edit":
        return { title: "Edit Image", description: "Edit images with AI instructions", creditCost: quality === "standard" ? 2 : quality === "high" ? 4 : 10 };
      default:
        return { title: "Generate Image", description: "Create AI-generated images", creditCost: quality === "standard" ? 1 : quality === "high" ? 2 : 5 };
    }
  };

  const config = getModeConfig();

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">{config.title}</h1>
        <p className="text-muted-foreground">{config.description}</p>
      </div>

      {/* Mode Tabs */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as GenerationMode)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="text-to-image" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Text to Image</span>
            <span className="sm:hidden">Image</span>
          </TabsTrigger>
          <TabsTrigger value="text-to-video" className="gap-2">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Text to Video</span>
            <span className="sm:hidden">Video</span>
          </TabsTrigger>
          <TabsTrigger value="image-to-image" className="gap-2">
            <Wand2 className="h-4 w-4" />
            <span className="hidden sm:inline">Image to Image</span>
            <span className="sm:hidden">I2I</span>
          </TabsTrigger>
          <TabsTrigger value="image-edit" className="gap-2">
            <Pencil className="h-4 w-4" />
            <span className="hidden sm:inline">Edit Image</span>
            <span className="sm:hidden">Edit</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={mode} className="mt-6">
          <div className="space-y-6 rounded-lg border bg-card p-6">
            {/* Image Upload (for image-to-image and image-edit modes) */}
            {(mode === "image-to-image" || mode === "image-edit") && (
              <div className="space-y-2">
                <Label>
                  {mode === "image-edit" ? "Image to Edit" : "Base Image"}
                </Label>
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  onImageRemove={handleImageRemove}
                  preview={imagePreview}
                />
              </div>
            )}

            {/* Prompt */}
            <div className="space-y-2">
              <Label htmlFor="prompt">
                {mode === "image-edit" ? "Edit Instructions" : "Prompt"}
              </Label>
              <Textarea
                id="prompt"
                placeholder={
                  mode === "image-edit"
                    ? "Describe how to edit the image..."
                    : "Describe what you want to generate..."
                }
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
                Cost: <span className="font-semibold">{config.creditCost} credits</span>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={
                  !prompt.trim() ||
                  isGenerating ||
                  ((mode === "image-to-image" || mode === "image-edit") && !uploadedImage)
                }
                size="lg"
              >
                {isGenerating ? "Generating..." : `Generate ${mode === "text-to-video" ? "Video" : "Image"}`}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
