/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

import {

    IconBrandTabler,

    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BadgeCheck, Book, Bot, ChevronDown, Clock, FileQuestion, MessageCircle, Moon, PlusCircle, Search, Settings, Star, Sun, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from "../../../context/userContext";
import { MorphingDialog, MorphingDialogContainer, MorphingDialogContent, MorphingDialogDescription, MorphingDialogImage, MorphingDialogSubtitle, MorphingDialogTitle, MorphingDialogTrigger } from "@/components/ui/morphing-dialog";
import { Logo, LogoIcon } from "@/components/ui/logo";


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
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <GetDevelopers />
        </div>
    );
}


const developers = [
    {
        name: "Alex Chen",
        role: "Full Stack Developer",
        rate: "₹800/hour",
        description: "Specialized in React, Node.js, and Cloud Architecture",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        details: "Senior developer with 8+ years of experience building scalable applications. Expert in modern web technologies and best practices.",
        expertise: [
            "React & Next.js Development",
            "Backend Architecture",
            "Cloud Infrastructure (AWS)",
        ],
        languages: ["JavaScript", "TypeScript", "Python", "Go"],
    },
    {
        name: "Sarah Williams",
        role: "UI/UX Developer",
        rate: "₹750/hour",
        description: "Creating beautiful, intuitive user interfaces with modern frameworks",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        details: "Passionate about creating user-centric designs and implementing them with clean, maintainable code.",
        expertise: [
            "Frontend Architecture",
            "Design Systems",
            "Responsive Design",
        ],
        languages: ["JavaScript", "TypeScript", "HTML/CSS", "React"],
    },
    {
        name: "Marcus Johnson",
        role: "Backend Developer",
        rate: "₹850/hour",
        description: "Building robust backend systems and APIs",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        details: "Experienced in designing and implementing scalable backend solutions with a focus on performance and security.",
        expertise: [
            "API Development",
            "Database Design",
            "System Architecture",
        ],
        languages: ["Python", "Java", "SQL", "MongoDB"],
    },
    {
        name: "Emily Zhang",
        role: "Mobile Developer",
        rate: "₹780/hour",
        description: "Crafting native and cross-platform mobile experiences",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
        details: "Specialized in building high-performance mobile applications with a focus on user experience and platform best practices.",
        expertise: [
            "iOS Development",
            "Android Development",
            "React Native",
        ],
        languages: ["Swift", "Kotlin", "JavaScript", "C++"],
    },
    {
        name: "David Kumar",
        role: "DevOps Engineer",
        rate: "₹900/hour",
        description: "Automating deployment and optimizing infrastructure",
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        details: "Expert in implementing CI/CD pipelines and managing cloud infrastructure with a focus on security and scalability.",
        expertise: [
            "Infrastructure as Code",
            "Container Orchestration",
            "Cloud Security",
        ],
        languages: ["Python", "Shell", "YAML", "HCL"],
    },
    {
        name: "Sofia Rodriguez",
        role: "AI/ML Engineer",
        rate: "₹950/hour",
        description: "Implementing cutting-edge AI solutions",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
        details: "Specialized in machine learning and artificial intelligence, with experience in implementing practical AI solutions for businesses.",
        expertise: [
            "Machine Learning",
            "Deep Learning",
            "Natural Language Processing",
        ],
        languages: ["Python", "R", "TensorFlow", "PyTorch"],
    },
];

const skills = ["React", "Node.js", "Python", "JavaScript", "TypeScript", "Angular", "Vue.js"]



// Dummy dashboard component with content
const GetDevelopers = () => {
    return (
        <div className="min-h-screen w-full rounded-md bg-background animate-gradient overflow-y-auto">
            {/* Hero Section */}


            <div className="px-6 pb-10 md:px-10">
                {/* Search and Filter Section */}
                <div className="max-w-7xl mt-10 mx-auto mb-10 shadow rounded-md">
                    <div className=" dark:glass-morphism light:glass-light p-6 rounded-2xl">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm text-primary font-medium">
                                    Search Developers
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        type="text"
                                        placeholder="Search by name, role, or skill..."
                                        className="pl-10 bg-background/50 border-primary focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Filter
                                </Button>
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developers Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {developers.map((developer, index) => (
                            <MorphingDialog
                                key={index}
                                transition={{
                                    type: "spring",
                                    bounce: 0.2,
                                    duration: 0.6,
                                }}
                            >
                                <MorphingDialogTrigger className="flex flex-col overflow-hidden rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm transform transition-all ">
                                    <div className="flex items-start p-4 gap-4">
                                        <MorphingDialogImage
                                            src={developer.image}
                                            alt={developer.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <MorphingDialogTitle className="text-gradient font-semibold flex items-center gap-2">
                                                {developer.name}
                                                <BadgeCheck className="w-4 h-4 text-primary/80" />
                                            </MorphingDialogTitle>
                                            <div className="text-xs text-primary/70">{developer.role}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Star className="w-3 h-3 text-yellow-500" />
                                                <span className="text-xs text-primary/70">4.9 (128 reviews)</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-primary">{developer.rate}</div>
                                            <div className="text-xs text-primary/60">per hour</div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-t border-primary/10">
                                        <MorphingDialogSubtitle className="text-sm text-muted-foreground line-clamp-2">
                                            {developer.description}
                                        </MorphingDialogSubtitle>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {developer.languages.slice(0, 3).map((lang, i) => (
                                                <span key={i} className="px-2 py-1 text-xs rounded-full  border text-primary">
                                                    {lang}
                                                </span>
                                            ))}
                                            {developer.languages.length > 3 && (
                                                <span className="px-2 py-1 text-xs rounded-full border text-primary/80">
                                                    +{developer.languages.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </MorphingDialogTrigger>

                                <MorphingDialogContainer>
                                    <MorphingDialogContent className="rounded-lg glass-morphism max-w-lg mx-4">
                                        <div className="flex flex-col gap-4 p-6">
                                            <div className="flex items-start gap-4">
                                                <MorphingDialogImage
                                                    src={developer.image}
                                                    alt={developer.name}
                                                    className="w-32 h-32 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <MorphingDialogTitle className="text-2xl text-gradient font-bold flex items-center gap-2">
                                                        {developer.name}
                                                        <BadgeCheck className="w-5 h-5 text-primary/80" />
                                                    </MorphingDialogTitle>
                                                    <div className="text-sm text-primary/70 mt-1">{developer.role}</div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Star className="w-4 h-4 text-yellow-500" />
                                                        <span className="text-sm text-primary/70">4.9 (128 reviews)</span>
                                                        <Clock className="w-4 h-4 text-primary/60 ml-2" />
                                                        <span className="text-sm text-primary/70">Usually responds in 1 hour</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <MorphingDialogDescription
                                                disableLayoutAnimation
                                                variants={{
                                                    initial: { opacity: 0, y: 20 },
                                                    animate: { opacity: 1, y: 0 },
                                                    exit: { opacity: 0, y: 20 }
                                                }}
                                                className="space-y-4"
                                            >
                                                <div className="neo-blur p-4 rounded-xl">
                                                    <h4 className="text-sm font-medium text-primary mb-2">About</h4>
                                                    <p className="text-sm text-muted-foreground">{developer.details}</p>
                                                </div>

                                                <div className="neo-blur p-4 rounded-xl">
                                                    <h4 className="text-sm font-medium text-primary mb-2">Expertise</h4>
                                                    <ul className="space-y-2">
                                                        {developer.expertise.map((skill, index) => (
                                                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                                                {skill}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="neo-blur p-4 rounded-xl">
                                                    <h4 className="text-sm font-medium text-primary mb-2">Technologies</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {developer.languages.map((lang, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-2 py-1 text-xs rounded-full neo-blur text-primary"
                                                            >
                                                                {lang}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <div className="text-xl font-bold text-primary">{developer.rate}</div>
                                                        <div className="text-sm text-primary/60">per hour</div>
                                                    </div>
                                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                                        Connect Now
                                                    </Button>
                                                </div>
                                            </MorphingDialogDescription>
                                        </div>
                                    </MorphingDialogContent>
                                </MorphingDialogContainer>
                            </MorphingDialog>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


