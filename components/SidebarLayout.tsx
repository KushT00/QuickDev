/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { useUser } from "@/context/userContext";
import { cn } from "@/lib/utils";
import { Users, Bot, PlusCircle, FileQuestion, MessageCircle, Settings } from "lucide-react";
import { useState } from "react";
import { Logo, LogoIcon } from "./ui/logo";
import { SidebarLink } from "./ui/sidebar";

interface SidebarProps {
  children: React.ReactNode; // Accepts a child component
}

export default function SidebarLayout({ children }: SidebarProps) {
    const { user } = useUser(); // Destructure userName from the context
    const [open, setOpen] = useState(false);

    const links = [
        { label: "Hire Developers", href: "/dashboard/getDev", icon: <Users className="h-5 w-5 flex-shrink-0" /> },
        { label: "Hire Agents", href: "/dashboard/getAgents", icon: <Bot className="h-5 w-5 flex-shrink-0" /> },
        { label: "Create Agent", href: "/dashboard/createAgent", icon: <PlusCircle className="h-5 w-5 flex-shrink-0" /> },
        { label: "Request", href: "/dashboard/postRequest", icon: <FileQuestion className="h-5 w-5 flex-shrink-0" /> },
        { label: "Chats", href: "/dashboard/chats", icon: <MessageCircle className="h-5 w-5 flex-shrink-0" /> },
        { label: "Settings", href: "/dashboard/settings", icon: <Settings className="h-5 w-5 flex-shrink-0" /> }
    ];

    return (
        <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden")}>
            {/* Sidebar */}
            <div className="w-64 min-w-[16rem] bg-white dark:bg-neutral-900 p-4 border-r border-neutral-300 dark:border-neutral-700">
                <div className="flex flex-col h-full">
                    {open ? <Logo /> : <LogoIcon />}
                    <div className="mt-8 flex flex-col gap-2">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
                        ))}
                    </div>
                    <div className="mt-auto">
                        <SidebarLink
                            link={{
                                label: user.name || "Guest",
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
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-4">
                {children} {/* Dynamic Page Content */}
            </div>
        </div>
    );
}
