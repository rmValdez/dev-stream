export interface JobStatusUpdate {
  jobId: string;
  status?: string;
  error?: string;
  job?: {
    id: string;
    type: string;
    content: string;
    status: string;
    payload?: {
      progress?: {
        processed: number;
        total: number;
        success: number;
        failed: number;
      };
      [key: string]: unknown;
    };
    processedItems?: number;
    totalItems?: number;
    createdAt: string;
    updatedAt: string;
  };
}
