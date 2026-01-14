"use client";
import apiClient from "./apiSauce";

export interface Post {
  id: string;
  content: string;
  authorId: string;
  jobId?: string;
  createdAt: string;
  author?: any;
  comments?: Comment[];
  likes?: Like[];
  media?: any[];
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: string;
  author?: any;
}

export interface Like {
  userId: string;
  postId: string;
}

export class SocialService {
  /**
   * Create a new post
   */
  async createPost(content: string, jobId?: string) {
    const response = await apiClient.post("/social/posts", {
      content,
      jobId,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to create post");
    }
    return response.data as Post;
  }

  /**
   * List all posts
   */
  async listPosts() {
    const response = await apiClient.get("/social/posts");
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch posts");
    }
    return response.data as Post[];
  }

  /**
   * Add a comment to a post
   */
  async addComment(postId: string, content: string) {
    const response = await apiClient.post("/social/comments", {
      postId,
      content,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to add comment");
    }
    return response.data as Comment;
  }

  /**
   * Toggle like on a post
   */
  async toggleLike(postId: string) {
    const response = await apiClient.post("/social/likes/toggle", {
      postId,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to toggle like");
    }
    return response.data;
  }

  /**
   * Link media to a post
   */
  async linkMedia(postId: string, assetId: string) {
    const response = await apiClient.post("/social/media/link", {
      postId,
      assetId,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to link media");
    }
    return response.data;
  }
}

export const socialService = new SocialService();
export default socialService;
