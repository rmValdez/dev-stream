"use client";
import apiClient from "./apiSauce";

export interface Notification {
  id: string;
  userId: string;
  type: string;
  postId?: string;
  isRead: boolean;
  createdAt: string;
}

export class NotificationService {
  /**
   * Get user notifications
   */
  async getUserNotifications(userId: string) {
    const response = await apiClient.get(`/notifications/user/${userId}`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch notifications");
    }
    return response.data as Notification[];
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string) {
    const response = await apiClient.put(
      `/notifications/${notificationId}/read`
    );
    if (!response.ok) {
      throw new Error(
        response.problem || "Failed to mark notification as read"
      );
    }
    return response.data;
  }
}

export const notificationService = new NotificationService();
export default notificationService;
