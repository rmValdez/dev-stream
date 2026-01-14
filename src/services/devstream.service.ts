"use client";
import apiClient from "./apiSauce";

export interface DeveloperMachine {
  id: string;
  userId: string;
  name: string;
  os: string;
  hostname: string;
  agents?: Agent[];
}

export interface Agent {
  id: string;
  machineId: string;
  lastSeenAt: string;
  containers?: Container[];
  databases?: DatabaseInstance[];
  editors?: EditorSession[];
}

export interface Container {
  id: string;
  agentId: string;
  name: string;
  image: string;
  status: string;
  cpu: number;
  memory: number;
}

export interface DatabaseInstance {
  id: string;
  agentId: string;
  type: string;
  name: string;
  host: string;
  port: number;
  status: string;
}

export interface EditorSession {
  id: string;
  agentId: string;
  editor: string;
  project: string;
  branch: string;
}

export class DevStreamService {
  /**
   * Register a developer machine
   */
  async registerMachine(data: { name: string; os: string; hostname: string }) {
    const response = await apiClient.post("/devstream/machines", data);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to register machine");
    }
    return response.data as DeveloperMachine;
  }

  /**
   * List user's machines
   */
  async listUserMachines(userId: string) {
    const response = await apiClient.get(`/devstream/machines/user/${userId}`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch machines");
    }
    return response.data as DeveloperMachine[];
  }

  /**
   * Send agent heartbeat
   */
  async sendHeartbeat(agentId: string) {
    const response = await apiClient.post("/devstream/agent/heartbeat", {
      agentId,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to send heartbeat");
    }
    return response.data;
  }

  /**
   * Report container status
   */
  async reportContainer(data: {
    agentId: string;
    name: string;
    image: string;
    status: string;
    cpu: number;
    memory: number;
  }) {
    const response = await apiClient.post("/devstream/agent/container", data);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to report container");
    }
    return response.data as Container;
  }

  /**
   * Report database status
   */
  async reportDatabase(data: {
    agentId: string;
    type: string;
    name: string;
    host: string;
    port: number;
    status: string;
  }) {
    const response = await apiClient.post("/devstream/agent/database", data);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to report database");
    }
    return response.data as DatabaseInstance;
  }

  /**
   * Report editor session
   */
  async reportEditor(data: {
    agentId: string;
    editor: string;
    project: string;
    branch: string;
  }) {
    const response = await apiClient.post("/devstream/agent/editor", data);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to report editor session");
    }
    return response.data as EditorSession;
  }
}

export const devStreamService = new DevStreamService();
export default devStreamService;
