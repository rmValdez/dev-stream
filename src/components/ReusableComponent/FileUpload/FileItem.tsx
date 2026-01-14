"use client";

import { useState } from "react";
import apiClient from "@/services/apiSauce";
import PDFViewerModal from "./PDFViewerModal";

interface UserFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

interface FileItemProps {
  file: UserFile;
  onDelete: () => void;
}

export default function FileItem({ file, onDelete }: FileItemProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handleDownload = async () => {
    try {
      // Use fetch for blob downloads
      const token = localStorage.getItem("ds_access_token");
      const response = await fetch(
        `http://localhost:3003/api/v1/files/${file.id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.originalName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  const handleView = async () => {
    try {
      // Use fetch for blob downloads - apisauce doesn't handle blob well
      const token = localStorage.getItem("ds_access_token");
      const response = await fetch(
        `http://localhost:3003/api/v1/files/${file.id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setPdfUrl(url);
        setIsViewerOpen(true);
      } else {
        console.error("Failed to load PDF:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to load PDF:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${file.originalName}"?`)) {
      return;
    }

    try {
      const response = await apiClient.delete(`/files/${file.id}`);
      if (response.ok) {
        onDelete();
      }
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all group">
        <div className="flex items-center gap-4">
          {/* PDF Icon */}
          <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-red-500 text-2xl">
              picture_as_pdf
            </span>
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {file.originalName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-white/40">
              {formatFileSize(file.size)} • {formatDate(file.createdAt)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleView}
              className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-colors"
              title="View PDF"
            >
              <span className="material-symbols-outlined text-sm">
                visibility
              </span>
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              title="Download"
            >
              <span className="material-symbols-outlined text-sm">
                download
              </span>
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
              title="Delete"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={isViewerOpen}
        onClose={() => {
          setIsViewerOpen(false);
          if (pdfUrl) {
            window.URL.revokeObjectURL(pdfUrl);
            setPdfUrl("");
          }
        }}
        fileUrl={pdfUrl}
        fileName={file.originalName}
      />
    </>
  );
}
