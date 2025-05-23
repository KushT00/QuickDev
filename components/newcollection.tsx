import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface NewCollectionDialogProps {
  onCreateCollection: (title: string, description: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewCollectionDialog = ({ onCreateCollection, open, onOpenChange }: NewCollectionDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateCollection(title, description || ""); // Allow empty description
    setTitle("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          New Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter collection title"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description (Optional)
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter collection description"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Collection</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};