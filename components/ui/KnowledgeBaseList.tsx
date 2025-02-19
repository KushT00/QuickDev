import React from "react";
import { formatDistanceToNow } from "date-fns";
import { FileText, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KnowledgeBaseFile {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
}

interface KnowledgeBaseListProps {
  files: KnowledgeBaseFile[];
}

export const KnowledgeBaseList = ({ files }: KnowledgeBaseListProps) => {
  return (
    <div className="space-y-4">
      {files.length === 0 ? (
        <div className="text-center p-8 border border-neutral-200 dark:border-neutral-800 rounded-xl">
          <p className="text-muted-foreground">No files uploaded yet</p>
        </div>
      ) : (
        files.map((file) => (
          <div
            key={file.id}
            className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-primary/20 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">{file.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(file.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};