/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Account, Client } from "appwrite";
import { UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const client = new Client().setProject("6782434a002cdaea3420");
  const account = new Account(client);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const result = await account.get();
        setUserName(result.name);
      } catch (error) {
        console.error("Error fetching account data:", error);
        router.push("/login"); // Redirect to login if not logged in
      }
    };

    fetchAccount();
  }, []); // `account` is stable, no need to include in dependencies

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-800 shadow-md">
        {/* Tabs (Navbar) */}
        <Tabs defaultValue="hire-agent" className="flex items-center space-x-4">
          <TabsList className="flex space-x-4">
            <TabsTrigger
              value="hire-agent"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              Hire an Agent
            </TabsTrigger>
            <TabsTrigger
              value="hire-developer"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              Hire a Developer
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Profile and Become Developer Button */}
        <div className="flex items-center space-x-4">
          {/* Tooltip for Profile */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <UserCircle2 size={36} className="text-gray-300 cursor-pointer hover:text-gray-100 transition" />
              </TooltipTrigger>
              <TooltipContent className="bg-gray-700 text-white text-sm rounded-md shadow-lg p-2">
                {userName ? <span>Logged in as {userName}</span> : <span>Not Logged In</span>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Become Developer Button */}
          <button
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:from-teal-400 hover:to-blue-500 transition"
            onClick={() => router.push("/become-developer")}
          >
            Become Developer
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Tabs Content */}
        <Tabs defaultValue="hire-agent" className="max-w-4xl mx-auto">
          <TabsContent value="hire-agent">
            <h2 className="text-lg font-semibold mb-2">Automate Your Tasks</h2>
            <p>Hire an AI agent to handle repetitive tasks efficiently and cost-effectively.</p>
          </TabsContent>

          <TabsContent value="hire-developer">
            <h2 className="text-lg font-semibold mb-2">Get Expert Developers</h2>
            <p>Find experienced developers for your projects and hire them on an hourly basis.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
