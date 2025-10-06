import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * R2 Storage Client for Cloudflare R2
 * Uses S3-compatible API
 */
export class R2Storage {
  private client: S3Client;
  private bucketName: string;
  private publicUrl: string;

  constructor(config: {
    accountId: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
    publicUrl: string;
  }) {
    this.bucketName = config.bucketName;
    this.publicUrl = config.publicUrl;

    this.client = new S3Client({
      region: "auto",
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  /**
   * Upload image to R2
   * @param buffer - Image data buffer
   * @param key - Storage key (path)
   * @param contentType - MIME type
   * @returns Public CDN URL
   */
  async uploadImage(
    buffer: Buffer,
    key: string,
    contentType: string
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await this.client.send(command);
    return `${this.publicUrl}/${key}`;
  }

  /**
   * Upload from base64 string
   */
  async uploadBase64(
    base64Data: string,
    key: string,
    contentType: string
  ): Promise<string> {
    const buffer = Buffer.from(base64Data, "base64");
    return this.uploadImage(buffer, key, contentType);
  }

  /**
   * Upload from URL (download then upload)
   */
  async uploadFromUrl(url: string, key: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download from ${url}: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    return this.uploadImage(buffer, key, contentType);
  }

  /**
   * Generate storage key for asset
   */
  static generateKey(userId: string, assetId: string, filename: string): string {
    return `assets/${userId}/${assetId}/${filename}`;
  }
}

/**
 * Initialize R2 client from environment variables
 */
export function initR2Storage(): R2Storage {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
    throw new Error("Missing R2 configuration in environment variables");
  }

  return new R2Storage({
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicUrl,
  });
}
