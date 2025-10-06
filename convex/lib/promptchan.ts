/**
 * Promptchan API Client
 * Docs: https://promptchan.com/docs
 * Base URL: https://prod.aicloudnetservices.com/
 */

export interface ImageGenerationRequest {
  prompt: string;
  negative_prompt?: string;
  style?: string; // "Cinematic XL", "Anime XL+", etc.
  quality?: "Ultra" | "Extreme" | "Max";
  poses?: string;
  filter?: string;
  emotion?: string;
  age_slider?: number;
  weight_slider?: number;
  breast_slider?: number;
  ass_slider?: number;
  seed?: number;
  creativity?: number;
  image_size?: "512x512" | "512x768" | "768x512";
  restore_faces?: boolean;
  detail?: number;
}

export interface ImageGenerationResponse {
  image: string; // base64 encoded
  gems: number; // remaining gems
}

export interface VideoGenerationRequest {
  prompt: string;
  video_quality?: "Standard" | "High" | "Max";
  aspect?: "Portrait" | "Wide";
  audioEnabled?: boolean;
  age_slider?: number;
  seed?: number;
}

export interface VideoSubmitResponse {
  request_id: string;
}

export interface VideoStatusResponse {
  status: string; // e.g., "Completed"
  details?: string | null;
}

export interface VideoStatusWithLogsResponse {
  progress: number; // 0-1 (e.g., 0.5 = 50%)
}

export interface VideoResultResponse {
  status: string;
  message: string;
  video: string[]; // Array of URLs
  gems: number;
}

export class PromptchanClient {
  private apiKey: string;
  private baseUrl = "https://prod.aicloudnetservices.com";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Generate image (synchronous)
   */
  async generateImage(
    request: ImageGenerationRequest
  ): Promise<ImageGenerationResponse> {
    const response = await fetch(`${this.baseUrl}/api/external/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(`Promptchan API error: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  /**
   * Submit video generation job (asynchronous)
   */
  async submitVideoJob(
    request: VideoGenerationRequest
  ): Promise<VideoSubmitResponse> {
    const response = await fetch(`${this.baseUrl}/api/external/video_v2/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(`Promptchan API error: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  /**
   * Check video generation status
   */
  async getVideoStatus(requestId: string): Promise<VideoStatusResponse> {
    const response = await fetch(
      `${this.baseUrl}/api/external/video_v2/status/${requestId}`,
      {
        headers: {
          "x-api-key": this.apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Promptchan API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get video status with progress logs
   */
  async getVideoStatusWithLogs(requestId: string): Promise<VideoStatusWithLogsResponse> {
    const response = await fetch(
      `${this.baseUrl}/api/external/video_v2/status_with_logs/${requestId}`,
      {
        headers: {
          "x-api-key": this.apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Promptchan API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get video result (download URL)
   */
  async getVideoResult(requestId: string): Promise<VideoResultResponse> {
    const response = await fetch(
      `${this.baseUrl}/api/external/video_v2/result/${requestId}`,
      {
        headers: {
          "x-api-key": this.apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Promptchan API error: ${response.statusText}`);
    }

    return response.json();
  }
}

/**
 * Initialize Promptchan client from environment
 */
export function initPromptchanClient(): PromptchanClient {
  const apiKey = process.env.PROMPTCHAN_API_KEY;
  if (!apiKey) {
    throw new Error("PROMPTCHAN_API_KEY not set in environment");
  }
  return new PromptchanClient(apiKey);
}

/**
 * Calculate credit cost for image generation (in Gems)
 * Base: 1 Gem
 * Extreme: +1 Gem
 * Max: +2 Gems
 * restore_faces: +1 Gem
 */
export function calculateImageCost(quality: string, restoreFaces = false): number {
  let cost = 1; // Base cost

  switch (quality) {
    case "Extreme":
      cost += 1;
      break;
    case "Max":
      cost += 2;
      break;
  }

  if (restoreFaces) {
    cost += 1;
  }

  return cost;
}

/**
 * Calculate credit cost for video generation
 * Standard: 100 credits
 * High: 200 credits
 * Max: 500 credits
 */
export function calculateVideoCost(quality: string): number {
  switch (quality) {
    case "High":
      return 200;
    case "Max":
      return 500;
    default:
      return 100; // Standard
  }
}

/**
 * Map UI quality to API quality
 */
export function mapQualityToAPI(quality: string): "Ultra" | "Extreme" | "Max" {
  switch (quality.toLowerCase()) {
    case "high":
      return "Extreme";
    case "max":
      return "Max";
    default:
      return "Ultra";
  }
}

/**
 * Map UI aspect ratio to API aspect
 */
export function mapAspectToAPI(aspect: string): "Portrait" | "Wide" {
  return aspect.toLowerCase() === "wide" ? "Wide" : "Portrait";
}
