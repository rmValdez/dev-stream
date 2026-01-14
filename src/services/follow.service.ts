"use client";
import apiClient from "./apiSauce";

export interface Follow {
  followerId: string;
  followingId: string;
  follower?: any;
  following?: any;
}

export class FollowService {
  /**
   * Toggle follow/unfollow a user
   */
  async toggleFollow(followingId: string) {
    const response = await apiClient.post("/follows/toggle", {
      followingId,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to toggle follow");
    }
    return response.data;
  }

  /**
   * Get user's followers
   */
  async getFollowers(userId: string) {
    const response = await apiClient.get(`/follows/followers/${userId}`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch followers");
    }
    return response.data as Follow[];
  }

  /**
   * Get users being followed
   */
  async getFollowing(userId: string) {
    const response = await apiClient.get(`/follows/following/${userId}`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch following");
    }
    return response.data as Follow[];
  }
}

export const followService = new FollowService();
export default followService;
