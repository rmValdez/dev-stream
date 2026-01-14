"use client";
import apiClient from "./apiSauce";

export interface CallSession {
  id: string;
  startedBy: string;
  startedAt: string;
  endedAt?: string;
  participants?: CallParticipant[];
}

export interface CallParticipant {
  callId: string;
  userId: string;
  user?: any;
}

export class CallService {
  /**
   * Start a new call
   */
  async startCall(startedBy: string) {
    const response = await apiClient.post("/calls/start", {
      startedBy,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to start call");
    }
    return response.data as CallSession;
  }

  /**
   * End a call
   */
  async endCall(callId: string) {
    const response = await apiClient.put(`/calls/${callId}/end`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to end call");
    }
    return response.data as CallSession;
  }

  /**
   * Join a call
   */
  async joinCall(callId: string, userId: string) {
    const response = await apiClient.post("/calls/join", {
      callId,
      userId,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to join call");
    }
    return response.data;
  }
}

export const callService = new CallService();
export default callService;
