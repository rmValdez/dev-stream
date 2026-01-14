"use client";
import apiClient from "./apiSauce";

export type JobDescriptionStatus = "OPEN" | "CLOSED" | "HIRED";
export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface JobDescription {
  id: string;
  title: string;
  description: string;
  budgetMin?: number;
  budgetMax?: number;
  status: JobDescriptionStatus;
  employerId: string;
  createdAt: string;
  employer?: any;
  applications?: JobApplication[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  message: string;
  job?: JobDescription;
  user?: any;
}

export class JobDescriptionService {
  /**
   * Create a job description
   */
  async createJob(data: {
    title: string;
    description: string;
    budgetMin?: number;
    budgetMax?: number;
    status: JobDescriptionStatus;
  }) {
    const response = await apiClient.post("/job-descriptions", data);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to create job");
    }
    return response.data as JobDescription;
  }

  /**
   * List all jobs
   */
  async listJobs() {
    const response = await apiClient.get("/job-descriptions");
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch jobs");
    }
    return response.data as JobDescription[];
  }

  /**
   * Get job details
   */
  async getJob(jobId: string) {
    const response = await apiClient.get(`/job-descriptions/${jobId}`);
    if (!response.ok) {
      throw new Error(response.problem || "Failed to fetch job");
    }
    return response.data as JobDescription;
  }

  /**
   * Apply for a job
   */
  async applyForJob(jobId: string, message: string) {
    const response = await apiClient.post("/job-descriptions/apply", {
      jobId,
      message,
    });
    if (!response.ok) {
      throw new Error(response.problem || "Failed to apply for job");
    }
    return response.data as JobApplication;
  }
}

export const jobDescriptionService = new JobDescriptionService();
export default jobDescriptionService;
