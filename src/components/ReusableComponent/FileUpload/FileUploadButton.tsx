"use client";

interface FileUploadButtonProps {
  onUploadClick: () => void;
}

export default function FileUploadButton({
  onUploadClick,
}: FileUploadButtonProps) {
  return (
    <button
      onClick={onUploadClick}
      className="px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg"
    >
      <span className="material-symbols-outlined text-lg">upload_file</span>
      Upload PDF
    </button>
  );
}
