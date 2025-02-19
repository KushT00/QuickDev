/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { Brain, ChevronRightSquare, Database, Menu, MoveRight, Sidebar, Terminal, X } from "lucide-react"; // Icons for open/close
import { cn } from "@/lib/utils";

interface SidebarProps {
  collections: Array<{ id: string; title: string }>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNewClick: () => void;
}

export const KBSidebar = ({ collections, selectedId, onSelect, onNewClick }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-2 left-6 z-40 p-1   text-primary  md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Brain className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 glass-morphism p-4 flex flex-col border-r transition-transform z-50 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:flex md:translate-x-0 md:w-64"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Knowledge Bases</h2>
          <button className="md:hidden text-white" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1">
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => {
                onSelect(collection.id);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2 rounded-lg text-sm transition-colors",
                selectedId === collection.id
                  ? "bg-primary/10 text-white font-medium"
                  : "hover:bg-accent text-foreground"
              )}
            >
              {collection.title}
            </button>
          ))}
        </div>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
