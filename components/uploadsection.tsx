import { FileText, Link, Table, File, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
interface UploadSectionProps {
  onUpload: (file: File, type: string) => void;
  onUrlAdd: (url: string) => void;
}
export const UploadSection = ({ onUpload, onUrlAdd }: UploadSectionProps) => {
  const [url, setUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };
  const handleFileUpload = (file: File) => {
    const fileType = file.type;
    if (fileType.includes("pdf")) {
      onUpload(file, "pdf");
    } else if (fileType.includes("text")) {
      onUpload(file, "text");
    } else if (fileType.includes("csv") || fileType.includes("excel")) {
      onUpload(file, "table");
    } else {
      toast({
        title: "Unsupported file type",
        description: "Please upload a PDF, text, or table file.",
        variant: "destructive",
      });
    }
  };
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUrlAdd(url.trim());
      setUrl("");
    }
  };
  return (
    <div className="space-y-6">
      <Card
        className={`p-8 border-2 border-dashed transition-all duration-300 ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-200"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
      >
        <div className="text-center">
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Or click the buttons below to upload
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => document.getElementById("pdf-upload")?.click()}
          >
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => document.getElementById("table-upload")?.click()}
          >
            <Table className="w-4 h-4 mr-2" />
            Table
          </Button>
          <Button
            className="bg-violet-500 hover:bg-violet-600 text-white"
            onClick={() => document.getElementById("text-upload")?.click()}
          >
            <File className="w-4 h-4 mr-2" />
            Text
          </Button>
        </div>
        <input
          type="file"
          id="pdf-upload"
          accept=".pdf"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
        />
        <input
          type="file"
          id="table-upload"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
        />
        <input
          type="file"
          id="text-upload"
          accept=".txt,.doc,.docx"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
        />
      </Card>
      <Card className="p-6">
        <form onSubmit={handleUrlSubmit} className="space-y-4">
          <h3 className="text-lg font-medium mb-2">Add URL</h3>
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
              <Link className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};