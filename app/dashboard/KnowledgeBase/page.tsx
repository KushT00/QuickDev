"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Book, Bot, FileQuestion,  MessageCircle, Moon, PlusCircle,  Settings, Sun, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "../../../context/userContext";
import { Logo, LogoIcon } from "../../../components/ui/logo";
import { FilesList } from "@/components/FilesList";
import { UploadSection } from "@/components/uploadsection";
import { NewCollectionDialog } from "@/components/newcollection";
import { useToast } from "@/hooks/use-toast";
import { KBSidebar } from "@/components/kb-sidebar";


export default function SidebarDemo() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const { userName } = useUser(); // Destructure userName from the context
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.className = newTheme;
    };
    const links = [

        {
            label: "Hire Developers",
            href: "getDev",
            icon: <Users className="h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Hire Agents",
            href: "getAgents",
            icon: <Bot className="h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Create Agent",
            href: "createAgent",
            icon: <PlusCircle className="h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Request",
            href: "postRequest",  // New page where users can post their needs
            icon: <FileQuestion className="h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Chats",
            href: "chats",  // New page where users can post their needs
            icon: <MessageCircle className="h-5 w-5 flex-shrink-0" />,
        },
        {
          label: "Knowledge Base",  
          href: "knowledgeBase",
          icon: <Book className="h-5 w-5 flex-shrink-0 " />,
      },
        {
            label: "Settings",
            href: "settings",
            icon: <Settings className="h-5 w-5 flex-shrink-0" />,
        }
    ];

    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="flex items-center justify-between ">
                            {open ? <Logo /> : <LogoIcon />}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="ml-auto"
                            >
                                {theme === 'light' ? (
                                    <Moon className="h-5 w-5" />
                                ) : (
                                    <Sun className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                        
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: userName || "Guest", // Dynamically set the username
                                href: "#",
                                icon: (
                                    <img
                                        src="https://online.fliphtml5.com/umxbb/xesz/files/large/8e2963e4c1a7b9603cea6c7fcd95bada.jpg?1684900865"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <KnowledgeBase/>
        </div>
    );
}



interface Collection {
  id: string;
  title: string;
  description: string;
  stats: {
    pdfs: number;
    tables: number;
    texts: number;
    urls: number;
  };
}

interface UploadedFile {
  id: string;
  name: string;
  type: "pdf" | "table" | "text" | "url";
  createdAt: Date;
}


const KnowledgeBase = () => {
  const { toast } = useToast();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isNewCollectionOpen, setIsNewCollectionOpen] = useState(false);

  const handleCreateCollection = (title: string, description: string) => {
    const newCollection: Collection = {
      id: Math.random().toString(36).substring(7),
      title,
      description,
      stats: {
        pdfs: 0,
        tables: 0,
        texts: 0,
        urls: 0,
      },
    };
    setCollections((prev) => [...prev, newCollection]);
    toast({
      title: "Collection created",
      description: `Successfully created collection "${title}"`,
    });
  };

  const handleFileUpload = (file: File, type: "pdf" | "table" | "text") => {
    if (!selectedCollection) {
      toast({
        title: "No collection selected",
        description: "Please select a collection first",
        variant: "destructive",
      });
      return;
    }

    const newFile: UploadedFile = {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type,
      createdAt: new Date(),
    };

    setFiles((prev) => [...prev, newFile]);
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.id === selectedCollection.id) {
          return {
            ...collection,
            stats: {
              ...collection.stats,
              [type + "s"]: collection.stats[type + "s" as keyof typeof collection.stats] + 1,
            },
          };
        }
        return collection;
      })
    );

    toast({
      title: "File uploaded",
      description: `Successfully uploaded ${file.name}`,
    });
  };

  const handleUrlAdd = (url: string) => {
    if (!selectedCollection) {
      toast({
        title: "No collection selected",
        description: "Please select a collection first",
        variant: "destructive",
      });
      return;
    }

    const newFile: UploadedFile = {
      id: Math.random().toString(36).substring(7),
      name: url,
      type: "url",
      createdAt: new Date(),
    };

    setFiles((prev) => [...prev, newFile]);
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.id === selectedCollection.id) {
          return {
            ...collection,
            stats: {
              ...collection.stats,
              urls: collection.stats.urls + 1,
            },
          };
        }
        return collection;
      })
    );

    toast({
      title: "URL added",
      description: `Successfully added URL to collection`,
    });
  };

  const handleDeleteFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (!file || !selectedCollection) return;

    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.id === selectedCollection.id) {
          return {
            ...collection,
            stats: {
              ...collection.stats,
              [`${file.type}s`]: collection.stats[`${file.type}s` as keyof typeof collection.stats] - 1,
            },
          };
        }
        return collection;
      })
    );

    toast({
      title: "File deleted",
      description: `Successfully deleted ${file.name}`,
    });
  };

  return (
    <div className="flex w-full min-h-screen">
      <KBSidebar
        collections={collections}
        selectedId={selectedCollection?.id ?? null}
        onSelect={(id) => setSelectedCollection(collections.find((c) => c.id === id) ?? null)}
        onNewClick={() => setIsNewCollectionOpen(true)}
      />
      
      <div className="flex-1 p-8 bg-background text-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {selectedCollection?.title ?? "Knowledge Base"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {selectedCollection?.description ?? "Select or create a knowledge base to get started"}
              </p>
            </div>
            <NewCollectionDialog
              onCreateCollection={handleCreateCollection}
              open={isNewCollectionOpen}
              onOpenChange={setIsNewCollectionOpen}
            />
          </div>

          {selectedCollection ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-card p-6 rounded-lg border border-border mb-6">
                  <h2 className="text-lg font-semibold mb-4">Uploaded Files</h2>
                  <FilesList
                    files={files.filter((f) => true)} // Add filtering logic here if needed
                    onDelete={handleDeleteFile}
                  />
                </div>
              </div>
              <div>
                <UploadSection
                  onUpload={handleFileUpload}
                  onUrlAdd={handleUrlAdd}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12 glass-light rounded-lg border border-border">
              <h3 className="text-lg font-medium text-foreground mb-2">
                No collection selected
              </h3>
              <p className="text-muted-foreground">
                Select a collection from the sidebar or create a new one to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};