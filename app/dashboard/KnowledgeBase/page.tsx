/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Book, Bot, FileQuestion, MessageCircle, Moon, PlusCircle, Settings, Sun, Users } from "lucide-react";
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
  const { user } = useUser(); // Destructure userName from the context
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
      href: "KnowledgeBase",
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
                label: user.name || "Guest", // Dynamically set the username
                href: "#",
                icon: (
                  <img
                    src={user.avatarUrl || "https://github.com/shadcn.png"}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                    referrerPolicy="no-referrer"
                  />

                ),
              }}
            />

          </div>
        </SidebarBody>
      </Sidebar>
      <KnowledgeBase />
    </div>
  );
}



interface Collection {
  id: string;
  title: string;

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
  const { user, supabase } = useUser();

  // Fetch existing collections when component mounts or user changes
  useEffect(() => {
    if (user?.id) {
      fetchCollections();
    }
  }, [user?.id]);

  // Fetch collections from Supabase storage
  const fetchCollections = async () => {
    if (!user?.id) return;

    try {
      // List all objects in the user's KB folder
      const { data, error } = await supabase.storage
        .from("bucket") // Replace with your actual bucket name
        .list(`${user.id}/KnowledgeBase`);

      if (error) throw error;

      // Filter to get only directory names (folders)
      const collectionFolders = data?.filter(item => item?.name && typeof item.name === "string") || [];

      // Convert to Collection objects
      const collectionsList: Collection[] = collectionFolders.map(folder => {
        const folderName = folder.name.replace('/', '');
        return {
          id: folderName,
          title: folderName,
          description: "",
          stats: { pdfs: 0, tables: 0, texts: 0, urls: 0 }
        };
      });

      setCollections(collectionsList);

      toast({
        title: "Collections Loaded",
        description: `Found ${collectionsList.length} collections`,
      });
    } catch (error) {
      console.error("Error fetching collections:", error);
      toast({
        title: "Error Loading Collections",
        description: "Could not load your collections",
        variant: "destructive",
      });
    }
  };

  const handleCreateCollection = async (title: string, description: string) => {
    if (!user?.id) {
      toast({
        title: "Authentication Error",
        description: "User is not logged in",
        variant: "destructive",
      });
      return;
    }

    try {
      const folderPath = `${user.id}/KnowledgeBase/${title}/dummy.txt`;

      // Supabase does not support folders explicitly, so we create a dummy file
      const { error } = await supabase.storage
        .from("bucket") // Replace with your actual bucket name
        .upload(folderPath, new Blob([""]), { contentType: "text/plain" });

      if (error) throw error;

      // Now, update the state to store collection details
      const newCollection: Collection = {
        id: title,
        title,

        stats: { pdfs: 0, tables: 0, texts: 0, urls: 0 }
      };

      setCollections((prev) => [...prev, newCollection]);
      setSelectedCollection(newCollection); // Automatically select the new collection

      toast({
        title: "Collection Created",
        description: `Folder '${title}' created successfully`,
      });
    } catch (error) {
      toast({
        title: "Collection Creation Failed",
        description: "Could not create folder in storage",
        variant: "destructive",
      });
      console.error("Error creating folder:", error);
    }
  };

  const handleFileUpload = async (file: File, type: "pdf" | "table" | "text") => {
    if (!selectedCollection) {
      toast({
        title: "No collection selected",
        description: "Please select a collection first",
        variant: "destructive",
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "Authentication Error",
        description: "User is not logged in",
        variant: "destructive",
      });
      return;
    }

    try {
      // Store file inside the selected collection folder
      const filePath = `${user.id}/KnowledgeBase/${selectedCollection.title}/${file.name}`;

      // Upload file to Supabase storage bucket
      const { data, error } = await supabase.storage
        .from("bucket") // Replace with your actual bucket name
        .upload(filePath, file);

      if (error) throw error;

      const newFile: UploadedFile = {
        id: data.path, // File path in storage
        name: file.name,
        type,
        createdAt: new Date(),
      };

      setFiles((prev) => [...prev, newFile]);

      // Update collection stats
      setCollections((prev) =>
        prev.map((collection) => {
          if (collection.id === selectedCollection.id) {
            const statsKey = `${type}s` as keyof typeof collection.stats;
            return {
              ...collection,
              stats: {
                ...collection.stats,
                [statsKey]: (collection.stats?.[statsKey] || 0) + 1,
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
    } catch (error) {
      toast({
        title: "File upload failed",
        description: `Failed to upload ${file.name}`,
        variant: "destructive",
      });
      console.error("Error uploading file:", error);
    }
  };

  // When a collection is selected, fetch its files
  const handleCollectionSelect = async (id: string) => {
    const collection = collections.find(c => c.id === id);
    
    if (!collection || !user?.id) return;
  
    setSelectedCollection(collection);
  
    try {
      // List all files in the selected collection
      const { data, error } = await supabase.storage
        .from("bucket")
        .list(`${user.id}/KnowledgeBase/${collection.title}`);
  
      if (error) throw error;
  
      // Filter out the dummy.txt file and convert to UploadedFile objects
      const filesList: UploadedFile[] = data
        ?.filter(item => item.name !== 'dummy.txt')
        .map(file => {
          // Determine file type based on extension
          let fileType: "pdf" | "table" | "text" | "url" = "text";
          if (file.name.endsWith('.pdf')) fileType = "pdf";
          else if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) fileType = "table";
  
          return {
            id: `${user.id}/KnowledgeBase/${collection.title}/${file.name}`,
            name: file.name,
            type: fileType,
            createdAt: new Date(file.created_at || Date.now()),
          };
        }) || [];
  
      setFiles(filesList);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast({
        title: "Error Loading Files",
        description: "Could not load files for this collection",
        variant: "destructive",
      });
    }
  };
  // Add these functions to your KnowledgeBase component

  const handleDeleteFile = async (fileId: string) => {
    if (!user?.id || !selectedCollection) {
      toast({
        title: "Error",
        description: "User not logged in or no collection selected",
        variant: "destructive",
      });
      return;
    }

    try {
      // Remove the file from Supabase storage
      const { error } = await supabase.storage
        .from("bucket") // Replace with your actual bucket name
        .remove([fileId]);

      if (error) throw error;

      // Find the file to get its type for updating stats
      const file = files.find(f => f.id === fileId);
      if (!file) return;

      // Update the files state
      setFiles(prev => prev.filter(f => f.id !== fileId));

      // Update collection stats
      if (file.type !== "url") {
        setCollections(prev =>
          prev.map(collection => {
            if (collection.id === selectedCollection.id) {
              const statsKey = `${file.type}s` as keyof typeof collection.stats;
              return {
                ...collection,
                stats: {
                  ...collection.stats,
                  [statsKey]: Math.max((collection.stats?.[statsKey] || 0) - 1, 0),
                },
              };
            }
            return collection;
          })
        );
      }

      toast({
        title: "File deleted",
        description: `Successfully deleted ${file.name}`,
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      toast({
        title: "Error Deleting File",
        description: "Could not delete the file",
        variant: "destructive",
      });
    }
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

    if (!user?.id) {
      toast({
        title: "Authentication Error",
        description: "User is not logged in",
        variant: "destructive",
      });
      return;
    }

    try {
      // For URLs, we'll store them as metadata in a small text file
      const urlFileName = `url_${Date.now()}.txt`;
      const filePath = `${user.id}/KnowledgeBase/${selectedCollection.title}/${urlFileName}`;

      // Create a text file with the URL as content
      supabase.storage
        .from("bucket") // Replace with your actual bucket name
        .upload(filePath, new Blob([url]), { contentType: "text/plain" });

      // Add the URL to the files state
      const newFile: UploadedFile = {
        id: filePath,
        name: url,
        type: "url",
        createdAt: new Date(),
      };

      setFiles(prev => [...prev, newFile]);

      // Update collection stats
      setCollections(prev =>
        prev.map(collection => {
          if (collection.id === selectedCollection.id) {
            return {
              ...collection,
              stats: {
                ...collection.stats,
                urls: (collection.stats?.urls || 0) + 1,
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
    } catch (error) {
      console.error("Error adding URL:", error);
      toast({
        title: "Error Adding URL",
        description: "Could not add the URL",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <KBSidebar
        collections={collections}
        selectedId={selectedCollection?.id ?? null}
        onSelect={(id) => {
          // console.log("Sidebar clicked:", id);
          handleCollectionSelect(id);
        }}
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
                {"Select or create a knowledge base to get started"}
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
                    files={files}
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
