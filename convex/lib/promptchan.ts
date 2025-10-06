/**
 * Promptchan API Client
 * Docs: https://promptchan.ai/api
 */

export interface ImageGenerationRequest {
  prompt: string;
  negative_prompt?: string;
  style?: string; // "cinematic_xl", "anime_xl_plus", etc.
  quality?: "standard" | "high" | "max";
  pose?: string;
  filter?: string;
  emotion?: string;
  age?: number;
  weight?: number;
  body?: string;
  seed?: number;
}

export interface ImageGenerationResponse {
  success: boolean;
  image_url?: string;
  image_base64?: string;
  error?: string;
  gems_used?: number;
}

export interface VideoGenerationRequest {
  prompt: string;
  quality?: "standard" | "high" | "max";
  aspect_ratio?: "portrait" | "wide";
  audio?: boolean;
  age?: number;
  seed?: number;
}

export interface VideoSubmitResponse {
  success: boolean;
  request_id?: string;
  error?: string;
}

export interface VideoStatusResponse {
  status: "pending" | "processing" | "completed" | "failed";
  progress?: number;
  queue_position?: number;
  video_url?: string;
  error?: string;
}

export class PromptchanClient {
  private apiKey: string;
  private baseUrl = "https://api.promptchan.ai";

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
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Promptchan API error: ${response.statusText}`);
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
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Promptchan API error: ${response.statusText}`);
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
          Authorization: `Bearer ${this.apiKey}`,
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
  async getVideoResult(requestId: string): Promise<string> {
    const response = await fetch(
      `${this.baseUrl}/api/external/video_v2/result/${requestId}`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Promptchan API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.video_url;
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
 * Calculate credit cost for image generation
 */
export function calculateImageCost(quality: string): number {
  switch (quality) {
    case "standard":
      return 1;
    case "high":
      return 2;
    case "max":
      return 5;
    default:
      return 1;
  }
}

/**
 * Calculate credit cost for video generation
 */
export function calculateVideoCost(quality: string): number {
  switch (quality) {
    case "standard":
      return 100;
    case "high":
      return 200;
    case "max":
      return 500;
    default:
      return 100;
  }
}
