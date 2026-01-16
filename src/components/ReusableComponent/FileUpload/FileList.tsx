"use client";

import { useEffect, useState } from "react";
import apiClient from "@/services/apiSauce";
import FileItem from "./FileItem";

interface UserFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export default function FileList({
  refreshTrigger,
}: {
  refreshTrigger: number;
}) {
  const [files, setFiles] = useState<UserFile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/files");
      if (response.ok && response.data) {
        setFiles((response.data as { data: UserFile[] }).data || []);
      }
    } catch (error) {
      console.error("Failed to fetch files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">
          progress_activity
        </span>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-white/20 mb-4">
          folder_open
        </span>
        <p className="text-slate-500 dark:text-white/40">
          No files uploaded yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <FileItem key={file.id} file={file} onDelete={fetchFiles} />
      ))}
    </div>
  );
}
