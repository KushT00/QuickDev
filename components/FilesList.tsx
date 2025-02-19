import { FileText, Table, File, Link, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";

interface UploadedFile {
  id: string;
  name: string;
  type: "pdf" | "table" | "text" | "url";
  createdAt: Date;
}

interface FilesListProps {
  files: UploadedFile[];
  onDelete?: (id: string) => void;
}

const FileIcon = ({ type }: { type: UploadedFile["type"] }) => {
  const iconClasses = "w-4 h-4"; // Common size for all icons

  switch (type) {
    case "pdf":
      return <FileText className={`${iconClasses} text-red-500`} />;
    case "table":
      return <Table className={`${iconClasses} text-green-500`} />;
    case "text":
      return <File className={`${iconClasses} text-violet-500`} />;
    case "url":
      return <Link className={`${iconClasses} text-blue-500`} />;
  }
};

export const FilesList = ({ files, onDelete }: FilesListProps) => {
  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:border-primary/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <FileIcon type={file.type} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                Added {formatDistanceToNow(file.createdAt)} ago
              </p>
            </div>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(file.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
