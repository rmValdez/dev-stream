"use client";
import apiClient from "./apiSauce";

export interface FileAsset {
  id: string;
  url: string;
  mimeType: string;
  size: number;
}

export interface Music {
  id: string;
  title: string;
  audioFileId: string;
  audioFile?: FileAsset;
}

export class MediaService {
  /**
   * Upload a file
   */
  async uploadFile(data: { url: string; mimeType: string; size: number }) {
    const response = await apiClient.post("/media/upload", data);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to upload file");
    }
    return response.data as FileAsset;
  }

  /**
   * List all music
   */
  async listMusic() {
    const response = await apiClient.get("/media/music");
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch music");
    }
    return response.data as Music[];
  }

  /**
   * Create a music entry
   */
  async createMusic(title: string, audioFileId: string) {
    const response = await apiClient.post("/media/music", {
      title,
      audioFileId,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to create music");
    }
    return response.data as Music;
  }
}

export const mediaService = new MediaService();
export default mediaService;
