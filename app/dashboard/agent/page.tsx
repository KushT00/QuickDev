/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import { Bot, X, Wand2, ChevronDown, ChevronUp, Book, FileQuestion, MessageCircle, Moon, PlusCircle, Settings, Sun, Users } from 'lucide-react';
import Sidebar, { SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Logo, LogoIcon } from '@/components/ui/logo';
import { useUser } from '@/context/userContext';
import { cn } from '@/lib/utils';

function BotConfigDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [botName, setBotName] = useState('');
  const [identity, setIdentity] = useState('');

  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-light dark:glass-morphism w-full max-w-md p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gradient">Bot Details</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-secondary rounded-lg p-4">
              <Bot className="h-12 w-12 text-primary" />
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Change</button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="w-full p-2 rounded-md bg-background border-input border focus:ring-2 focus:ring-ring"
              placeholder="happy-chough"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Identity</label>
              <button className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline">
                <Wand2 className="h-4 w-4 mr-1" />
                Generate
              </button>
            </div>
            <textarea
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              className="w-full p-2 rounded-md bg-background border-input border focus:ring-2 focus:ring-ring min-h-[100px]"
              placeholder="Explain briefly who your bot is and what it does. These instructions will be included in all prompts."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

function AgentStructureAccordion() {
  const [isOpen, setIsOpen] = useState(true);
  const suggestions = [
    'Specify the role or purpose',
    'Specify the intended audience',
    'Specify style of communication',
    'Specify if agent is for business or personal purposes',
    'Start with the Agent\'s identity'
  ];

  return (
    <div className="glass-light dark:neo-blur rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5"
      >
        <div className="flex items-center space-x-2">
          <Wand2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold">Agent Structure</h2>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2 py-1 rounded text-sm">
            5 Suggestions
          </span>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>
      
      {isOpen && (
        <div className="p-6 pt-0">
          <p className="text-muted-foreground mb-4">
            AI-based analysis and suggestions to improve your agent
          </p>
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-center space-x-2 text-destructive">
                <X className="h-4 w-4" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function BotConfiguration() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex-1 p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start space-x-6 mb-8">
          <button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-secondary rounded-lg p-6 hover:bg-secondary/80 transition-colors"
          >
            <Bot className="h-16 w-16 text-primary" />
          </button>
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gradient">happy-chough</h1>
            <p className="text-muted-foreground">Not provided</p>
          </div>
        </div>

        <div className="space-y-8">
          <AgentStructureAccordion />

          <div className="glass-light dark:neo-blur rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Instructions</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>- You are a customer support assistant for P&T Canada, a phone & telecommunication company in Canada.</p>
              <p>- Authenticate the user before providing assistance</p>
              <p>- To troubleshoot if the user experiences issues, always query the knowledge base to answer queries, never make stuff up.</p>
            </div>
          </div>

          <div className="glass-light dark:neo-blur rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Knowledge bases</h2>
              <div className="flex items-center space-x-4">
                <button className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded">
                  New
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-secondary peer-focus:ring-4 peer-focus:ring-ring rounded-full peer dark:bg-muted peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Website', 'Document', 'Table', 'Web Search', 'Rich Text', 'Upload from API'].map((type) => (
                <button 
                  key={type}
                  className="px-3 py-1 text-sm rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BotConfigDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}


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
                                label: user.name || "Guest", // Dynamically set the username
                                href: "#",
                                icon: (
                                    <img
                                        src={user.avatarUrl || "https://github.com/shadcn.png"}
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
            <BotConfiguration/>
        </div>
    );
}