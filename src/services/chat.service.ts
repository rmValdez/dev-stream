"use client";
import apiClient from "./apiSauce";

export interface Conversation {
  id: string;
  isGroup: boolean;
  members?: ConversationMember[];
  messages?: Message[];
}

export interface ConversationMember {
  conversationId: string;
  userId: string;
  user?: any;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: "TEXT" | "IMAGE" | "AUDIO" | "FILE";
  createdAt: string;
  sender?: any;
}

export class ChatService {
  /**
   * Start a new conversation
   */
  async startConversation(isGroup: boolean, memberIds: string[]) {
    const response = await apiClient.post("/chat/conversations", {
      isGroup,
      memberIds,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to start conversation");
    }
    return response.data as Conversation;
  }

  /**
   * List user's conversations
   */
  async listUserConversations(userId: string) {
    const response = await apiClient.get(`/chat/user/${userId}`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch conversations");
    }
    return response.data as Conversation[];
  }

  /**
   * Send a message
   */
  async sendMessage(
    conversationId: string,
    content: string,
    type: "TEXT" | "IMAGE" | "AUDIO" | "FILE" = "TEXT"
  ) {
    const response = await apiClient.post("/chat/messages", {
      conversationId,
      content,
      type,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to send message");
    }
    return response.data as Message;
  }

  /**
   * Get chat history
   */
  async getChatHistory(conversationId: string) {
    const response = await apiClient.get(`/chat/messages/${conversationId}`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch chat history");
    }
    return response.data as Message[];
  }

  /**
   * Add member to conversation
   */
  async addMember(conversationId: string, userId: string) {
    const response = await apiClient.post("/chat/members/add", {
      conversationId,
      userId,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to add member");
    }
    return response.data;
  }

  /**
   * Remove member from conversation
   */
  async removeMember(conversationId: string, userId: string) {
    const response = await apiClient.post("/chat/members/remove", {
      conversationId,
      userId,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to remove member");
    }
    return response.data;
  }
}

export const chatService = new ChatService();
export default chatService;
