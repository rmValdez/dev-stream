'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { socketService } from '@/services/socket.service';
import { JobStatusUpdate } from '@/interfaces/socket.interface';

export interface JobActivity {
  type: 'evaluating' | 'importing' | 'skipped' | 'imported' | 'failed' | 'syncing';
  productId?: string;
  productName?: string;
  score?: number;
  message?: string;
  timestamp?: number;
}

export interface JobProgress {
  jobId: string;
  status: string;
  processed: number;
  total: number;
  success: number;
  failed: number;
  skipped: number;
  percentage: number;
  error?: string;
  isComplete: boolean;
  isRunning: boolean;
  activity?: JobActivity;
  // Activity log for Live Activity panel
  activityLog?: JobActivity[];
}

interface UseJobProgressOptions {
  onComplete?: (job: JobProgress) => void;
  onError?: (error: string) => void;
  onProgress?: (job: JobProgress) => void;
}

export function useJobProgress(options: UseJobProgressOptions = {}) {
  const [currentJob, setCurrentJob] = useState<JobProgress | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const optionsRef = useRef(options);
  // Track previous values to detect changes for activity log
  const prevValuesRef = useRef<{
    success: number;
    failed: number;
    skipped: number;
    processed: number;
  }>({
    success: 0,
    failed: 0,
    skipped: 0,
    processed: 0,
  });
  // Store activity log entries
  const activityLogRef = useRef<JobActivity[]>([]);

  // Keep options ref updated
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  // Connect to socket on mount and listen for connection changes
  useEffect(() => {
    // Connect immediately
    socketService.connect();

    // Subscribe to connection state changes
    const unsubscribeConnection = socketService.onConnectionChange((connected) => {
      setIsConnected(connected);
    });

    return () => {
      unsubscribeConnection();
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  // Subscribe to a specific job
  const subscribeToJob = useCallback((jobId: string) => {
    // Unsubscribe from previous job if any
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    // Reset activity log and previous values
    activityLogRef.current = [];
    prevValuesRef.current = { success: 0, failed: 0, skipped: 0, processed: 0 };

    // Initialize job state
    setCurrentJob({
      jobId,
      status: 'PENDING',
      processed: 0,
      total: 0,
      success: 0,
      failed: 0,
      skipped: 0,
      percentage: 0,
      isComplete: false,
      isRunning: true,
      activity: undefined,
      activityLog: [],
    });

    // Subscribe to updates
    unsubscribeRef.current = socketService.subscribeToJob(jobId, (data: JobStatusUpdate) => {
      const progress = parseJobUpdate(data);

      // Generate activity entries based on changes
      const prev = prevValuesRef.current;
      const newActivities: JobActivity[] = [];

      // Detect new successes
      const successDelta = progress.success - prev.success;
      for (let i = 0; i < successDelta; i++) {
        newActivities.push({
          type: 'imported',
          message: 'Imported successfully',
          timestamp: Date.now() - (successDelta - i - 1) * 10,
        });
      }

      // Detect new skipped
      const skippedDelta = progress.skipped - prev.skipped;
      for (let i = 0; i < skippedDelta; i++) {
        newActivities.push({
          type: 'skipped',
          message: 'Skipped (score below threshold)',
          timestamp: Date.now() - (skippedDelta - i - 1) * 10,
        });
      }

      // Detect new failures
      const failedDelta = progress.failed - prev.failed;
      for (let i = 0; i < failedDelta; i++) {
        newActivities.push({
          type: 'failed',
          message: 'Import failed',
          timestamp: Date.now() - (failedDelta - i - 1) * 10,
        });
      }

      // Show "evaluating" state when processing increases but outcomes haven't caught up
      const totalOutcomes = progress.success + progress.failed + progress.skipped;
      const prevTotalOutcomes = prev.success + prev.failed + prev.skipped;
      if (progress.processed > prev.processed && totalOutcomes === prevTotalOutcomes) {
        newActivities.push({
          type: 'evaluating',
          message: `Evaluating product ${progress.processed} of ${progress.total}...`,
          timestamp: Date.now(),
        });
      }

      // Add new activities to log (keep most recent 50)
      if (newActivities.length > 0) {
        activityLogRef.current = [...newActivities, ...activityLogRef.current].slice(0, 50);
      }

      // Update previous values
      prevValuesRef.current = {
        success: progress.success,
        failed: progress.failed,
        skipped: progress.skipped,
        processed: progress.processed,
      };

      // Add activity log to progress
      const progressWithLog: JobProgress = {
        ...progress,
        activityLog: activityLogRef.current,
      };

      setCurrentJob(progressWithLog);

      // Call callbacks
      if (progress.isComplete) {
        if (progress.error) {
          optionsRef.current.onError?.(progress.error);
        } else {
          optionsRef.current.onComplete?.(progressWithLog);
        }
      } else {
        optionsRef.current.onProgress?.(progressWithLog);
      }
    });
  }, []);

  // Unsubscribe from current job
  const unsubscribe = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    setCurrentJob(null);
  }, []);

  // Clear job state
  const clearJob = useCallback(() => {
    setCurrentJob(null);
  }, []);

  return {
    currentJob,
    isConnected,
    subscribeToJob,
    unsubscribe,
    clearJob,
  };
}

// Parse job update into progress format
function parseJobUpdate(data: JobStatusUpdate): JobProgress {
  const job = data.job;
  const payload = job?.payload;
  const progress = payload?.progress;
  const checkpoint = payload?.checkpoint as Record<string, unknown> | undefined;
  const activity = payload?.activity as JobActivity | undefined;

  const status = data.status || job?.status || 'UNKNOWN';
  const isComplete = ['DONE', 'FAILED', 'CANCELLED'].includes(status);
  const isRunning = ['PENDING', 'PROCESSING', 'RUNNING'].includes(status);

  const processed = progress?.processed ?? job?.processedItems ?? 0;
  const total = progress?.total ?? job?.totalItems ?? 0;

  // Get skipped from checkpoint (where it's tracked) or progress
  const skipped =
    (checkpoint?.skipped as number) ??
    ((progress as Record<string, unknown>)?.skipped as number) ??
    0;

  // Calculate percentage - use from progress if available, otherwise calculate
  const percentage =
    ((progress as Record<string, unknown>)?.percentage as number) ??
    (total > 0 ? Math.round((processed / total) * 100) : 0);

  return {
    jobId: data.jobId,
    status,
    processed,
    total,
    success: progress?.success ?? 0,
    failed: progress?.failed ?? 0,
    skipped,
    percentage,
    error:
      data.error ||
      (status === 'FAILED' ? ((payload as Record<string, unknown>)?.error as string) : undefined),
    isComplete,
    isRunning,
    activity: activity ? { ...activity, timestamp: Date.now() } : undefined,
  };
}

// Hook for subscribing to all job updates
export function useAllJobsProgress(onUpdate?: (data: JobStatusUpdate) => void) {
  const [jobs, setJobs] = useState<Map<string, JobProgress>>(new Map());
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketService.connect();

    // Use onConnectionChange to avoid sync setState in effect
    const unsubscribeConnection = socketService.onConnectionChange((connected) => {
      setIsConnected(connected);
    });
    // Initial state (wrapped in setTimeout to avoid sync setState warning)
    const initialTimer = setTimeout(() => {
      setIsConnected(socketService.isConnected());
    }, 0);

    const unsubscribe = socketService.subscribeToAllJobs((data) => {
      const progress = parseJobUpdate(data);
      setJobs((prev) => {
        const newMap = new Map(prev);
        newMap.set(data.jobId, progress);
        return newMap;
      });
      onUpdate?.(data);
    });

    const interval = setInterval(() => {
      setIsConnected(socketService.isConnected());
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
      unsubscribe();
      unsubscribeConnection();
    };
  }, [onUpdate]);

  return { jobs, isConnected };
}
