"use client";

import { io, Socket } from "socket.io-client";
import { JobStatusUpdate } from "@/interfaces/socket.interface";

const SOCKET_URL = "http://localhost:3002";

// Token management - same as api.ts
const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      if (parsed?.state?.access_token) {
        return parsed.state.access_token;
      }
    }
    return localStorage.getItem("access_token");
  } catch {
    return localStorage.getItem("access_token");
  }
};

class SocketService {
  private socket: Socket | null = null;
  private jobListeners: Map<string, Set<(data: JobStatusUpdate) => void>> =
    new Map();
  private globalListeners: Set<(data: JobStatusUpdate) => void> = new Set();
  private connectionListeners: Set<(connected: boolean) => void> = new Set();

  /**
   * Connect to the socket server
   */
  connect(): Socket | null {
    // If already have a socket (connected or connecting), return it
    if (this.socket) {
      return this.socket;
    }

    const token = getAuthToken();
    if (!token) {
      console.warn("[SocketService] No auth token available");
      this.notifyConnectionChange(false);
      return null;
    }

    console.log("[SocketService] Connecting to", SOCKET_URL);

    this.socket = io(SOCKET_URL, {
      // Use extraHeaders with polling-first transport order
      // Headers are sent during polling handshake, then connection upgrades to WebSocket
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      // IMPORTANT: Start with polling first, then upgrade to websocket
      // This ensures headers are sent during the initial HTTP handshake
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    console.log("[SocketService] Socket instance created", this.socket.id);

    this.socket.on("connect", () => {
      console.log("[SocketService] Connected to server");
      this.notifyConnectionChange(true);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("[SocketService] Disconnected:", reason);
      this.notifyConnectionChange(false);
    });

    this.socket.on("connect_error", (error) => {
      console.error("[SocketService] Connection error:", error.message);
      this.notifyConnectionChange(false);
    });

    // Listen for job status updates
    this.socket.on("getJobStatus", (data: JobStatusUpdate) => {
      this.handleJobStatusUpdate(data);
    });

    return this.socket;
  }

  /**
   * Notify all connection listeners of state change
   */
  private notifyConnectionChange(connected: boolean): void {
    this.connectionListeners.forEach((cb) => cb(connected));
  }

  /**
   * Subscribe to connection state changes
   */
  onConnectionChange(callback: (connected: boolean) => void): () => void {
    this.connectionListeners.add(callback);
    // Immediately notify current state
    callback(this.isConnected());
    return () => {
      this.connectionListeners.delete(callback);
    };
  }

  /**
   * Disconnect from the socket server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Subscribe to a specific job's status updates
   */
  subscribeToJob(
    jobId: string,
    callback: (data: JobStatusUpdate) => void
  ): () => void {
    // Ensure connected
    if (!this.socket?.connected) {
      this.connect();
    }

    // Request to join job room and get current status
    this.socket?.emit("getJobStatus", jobId);

    // Add callback to listeners
    if (!this.jobListeners.has(jobId)) {
      this.jobListeners.set(jobId, new Set());
    }
    this.jobListeners.get(jobId)!.add(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.jobListeners.get(jobId);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.jobListeners.delete(jobId);
        }
      }
    };
  }

  /**
   * Subscribe to all job updates (joins 'jobs-work' room)
   */
  subscribeToAllJobs(callback: (data: JobStatusUpdate) => void): () => void {
    if (!this.socket?.connected) {
      this.connect();
    }

    this.globalListeners.add(callback);

    return () => {
      this.globalListeners.delete(callback);
    };
  }

  /**
   * Handle incoming job status updates
   */
  private handleJobStatusUpdate(data: JobStatusUpdate): void {
    // Notify specific job listeners
    const listeners = this.jobListeners.get(data.jobId);
    if (listeners) {
      listeners.forEach((cb) => cb(data));
    }

    // Notify global listeners
    this.globalListeners.forEach((cb) => cb(data));
  }

  /**
   * Get the socket instance
   */
  getSocket(): Socket | null {
    return this.socket;
  }
}

// Singleton instance
export const socketService = new SocketService();
