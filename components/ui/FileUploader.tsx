import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

interface FileUploaderProps {
  onUpload: (files: FileList) => void;
}

export const FileUploader = ({ onUpload }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const dataTransfer = new DataTransfer();
      acceptedFiles.forEach((file) => dataTransfer.items.add(file));
      onUpload(dataTransfer.files);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'application/json': ['.json'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-8 transition-colors duration-200 cursor-pointer",
        isDragActive
          ? "border-primary/50 bg-primary/5"
          : "border-neutral-200 hover:border-primary/30 dark:border-neutral-800"
      )}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <PlusIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {isDragActive ? "Drop files here" : "Drag and drop files here"}
        </p>
        <p className="text-xs text-muted-foreground">
          Supported formats: TXT, CSV, JSON
        </p>
      </div>
    </div>
  );
};