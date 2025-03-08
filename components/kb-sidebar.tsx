import { useState, useEffect } from "react";
import { Brain, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext"; // Ensure this provides user & supabase

interface Collection {
  id: string;
  title: string;
}

interface SidebarProps {
  collections: Collection[]; // Add this line
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNewClick: () => void;
}

export const KBSidebar = ({ selectedId, onSelect, onNewClick }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collections, setCollections] = useState<Array<{ id: string; title: string }>>([]);
  const router = useRouter();
  const { user, supabase } = useUser();

  const fetchCollections = async () => {
    if (!user?.id) return;

    const path = `${user.id}/KnowledgeBase/`;

    const { data, error } = await supabase.storage.from("bucket").list(path, { limit: 100 });

    if (error) {
      console.error("Error fetching collections:", error);
    } else {
      const folders = data
        .filter((item) => item.name)
        .map((item) => ({
          id: item.name,
          title: item.name,
        }));

      setCollections(folders);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [user?.id]); // Initial fetch when user logs in

  const handleCollectionClick = (collectionId: string) => {
    router.push(`?collection=${collectionId}`, undefined);
    onSelect(collectionId);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="fixed top-2 left-6 z-40 p-1 text-primary md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Brain className="w-6 h-6" />
      </button>

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
          {collections.length > 0 ? (
            collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => handleCollectionClick(collection.id)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-lg text-sm transition-colors",
                  selectedId === collection.id
                    ? "bg-primary/10 text-white font-medium"
                    : "hover:bg-accent text-foreground"
                )}
              >
                {collection.title}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-400">No collections found.</p>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={() => onNewClick(fetchCollections)} // Pass fetchCollections
            className="w-full bg-primary/20 hover:bg-primary/30 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
          >
            + New Collection
          </button>
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};
