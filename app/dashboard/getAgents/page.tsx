/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState } from "react";

import {

    IconBrandTabler,

    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { MorphingDialog, MorphingDialogTrigger, MorphingDialogImage, MorphingDialogTitle, MorphingDialogSubtitle, MorphingDialogContainer, MorphingDialogContent, MorphingDialogDescription } from "@/components/ui/morphing-dialog";
import { PlusIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "../../../context/userContext";
import { Logo, LogoIcon } from "./logo";


export default function SidebarDemo() {
    const { userName } = useUser(); // Destructure userName from the context

    const links = [
        {
            label: "Hire a Dev",
            href: "getDev",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Hire Agents",
            href: "getAgents",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                " flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: userName || "Guest",
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
            <GetAgent />
        </div>
    );
}



function GlowButton({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
    return (
        <button
            onClick={onClick}
            className={`bg-[#121212] no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block ${className}`}
        >
            <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(142,68,173,0.6)_0%,rgba(142,68,173,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-0 rounded-full bg-[#0A0A0A] py-0.5 px-4 ring-1 ring-white/10">
                {children}
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#E74C3C]/0 via-[#E74C3C]/90 to-[#E74C3C]/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
    );
}
// Dummy dashboard component with content
const GetAgent = () => {
    return (
        <div className="min-h-screen rounded-md bg-background animate-gradient overflow-y-auto ">
            {/* Hero Section */}
        

            <div className="px-6 pb-10 md:px-10">
                {/* Search and Filter Section */}
                <div className="max-w-7xl mt-10 mx-auto mb-10">
                    <div className="glass-morphism p-6 rounded-2xl">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm text-primary font-medium">
                                    Search Agents
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        type="text"
                                        placeholder="Search by name or capability..."
                                        className="pl-10 bg-background/50 border-white/10 focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="secondary" className="neo-blur">
                                    Filter
                                </Button>
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Agents Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Nova",
                                price: "₹500/hour",
                                description: "Intelligent solutions tailored for automating tasks and enhancing workflows.",
                                image: "https://i.pinimg.com/736x/f3/2a/34/f32a346dc58cb14055bd565282508f5f.jpg",
                                details:
                                    "Nova is an advanced AI designed for seamless task automation. It specializes in streamlining workflows, improving efficiency, and solving complex problems for businesses of all sizes.",
                                pipeline: [
                                    "Analyze tasks and workflows.",
                                    "Implement automation for repetitive tasks.",
                                    "Monitor and optimize for efficiency.",
                                ],
                            },
                            {
                                name: "Lumen",
                                price: "₹600/hour",
                                description: "Engage your audience with conversational brilliance powered by cutting-edge AI.",
                                image: "https://i.pinimg.com/736x/0c/c6/1f/0cc61fd02a72d63df73c9317485e4f54.jpg",
                                details:
                                    "Lumen is a conversational AI designed to drive meaningful customer engagement. From customer service to real-time assistance, Lumen elevates every interaction.",
                                pipeline: [
                                    "Understand customer queries using natural language processing (NLP).",
                                    "Provide instant, context-aware responses.",
                                    "Gather feedback for continuous improvement.",
                                ],
                            },
                            {
                                name: "Aether",
                                price: "₹700/hour",
                                description: "Master social media management with AI-driven insights and performance analytics.",
                                image: "https://i.pinimg.com/736x/db/a5/95/dba5951162d4296c865d7bf173a2b72c.jpg",
                                details:
                                    "Aether empowers businesses to manage their social media presence with precision. AI analytics and optimization ensure maximum engagement and results.",
                                pipeline: [
                                    "Collect data from social media platforms.",
                                    "Analyze performance and trends using AI.",
                                    "Suggest and implement strategies for growth.",
                                ],
                            },

                            {
                                name: "Fomo",
                                price: "₹450/hour",
                                description: "Integrates FOMO messages into your webpage to engage users effectively.",
                                image: "https://i.pinimg.com/736x/94/f6/a7/94f6a7340486fadafd284159b7bd746a.jpg",
                                details:
                                    "Fomo displays real-time notifications on your webpage to create urgency and boost conversions. Perfect for businesses looking to engage users as they surf their websites.",
                                pipeline: [
                                    "Integrate the Fomo widget into your website.",
                                    "Monitor user activity on the page.",
                                    "Display tailored FOMO messages in real-time.",
                                ],
                            },
                            {
                                name: "Push Notification Bot",
                                price: "₹500/hour",
                                description: "Send personalized push notifications to users based on their activity.",
                                image: "https://i.pinimg.com/736x/39/0a/78/390a78c8a4bda0ce8a92ce03943aa29b.jpg",
                                details:
                                    "Push Notification Bot tracks user behavior and triggers personalized notifications, similar to how Zomato or Zepto engage their users. A perfect tool for boosting user retention.",
                                pipeline: [
                                    "Collect user activity and behavior data.",
                                    "Segment users based on preferences.",
                                    "Trigger and send tailored notifications.",
                                ],
                            },
                            {
                                name: "Feedback Collector",
                                price: "₹400/hour",
                                description: "An AI agent to collect feedback and suggest actionable solutions.",
                                image: "https://i.pinimg.com/736x/0f/85/22/0f85228f6aab846855e461167063c18a.jpg",
                                details:
                                    "Feedback Collector listens to customer inputs 24/7. It analyzes sentiment, raises alerts on critical issues, and provides actionable insights to improve customer satisfaction.",
                                pipeline: [
                                    "Collect customer feedback from multiple channels.",
                                    "Analyze sentiment and prioritize issues.",
                                    "Suggest solutions and escalate critical cases.",
                                ],
                            },
                            {
                                name: "Query Chatbot",
                                price: "₹600/hour",
                                description: "Create a custom chatbot for your website to handle FAQs and queries.",
                                image: "https://i.pinimg.com/736x/89/04/63/890463930722176aa8b37fe7377b9102.jpg",
                                details:
                                    "Query Chatbot is a learning AI that can be trained on company policies, FAQs, product catalogs, and more. It provides instant responses to user queries and comes with integration-ready code for your website.",
                                pipeline: [
                                    "Train the chatbot with company data and FAQs.",
                                    "Generate integration-ready chatbot code.",
                                    "Enable real-time query handling on your website.",
                                ],
                            },
                        ].map((agent, index) => (
                            <MorphingDialog
                                key={index}
                                transition={{
                                    type: "spring",
                                    bounce: 0.2,
                                    duration: 0.6,
                                }}
                            >
                                <MorphingDialogTrigger className="flex flex-col overflow-hidden rounded-xl border border-primary transform transition-transform hover:scale-105">

                                    <MorphingDialogImage
                                        src={agent.image}
                                        alt={agent.name}
                                        className="h-32 w-full object-cover"
                                    />
                                    <div className="flex flex-grow flex-col p-4">
                                        <div>
                                            <MorphingDialogTitle className="text-gradient font-semibold">
                                                {agent.name}
                                            </MorphingDialogTitle>
                                            <div className="text-xs text-primary/70 mb-2">{agent.price}</div>
                                            <MorphingDialogSubtitle className="text-sm text-muted-foreground line-clamp-2">
                                                {agent.description}
                                            </MorphingDialogSubtitle>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button
                                                type="button"
                                                className="neo-blur p-2 rounded-lg hover:bg-primary/20 transition-colors"
                                                aria-label="Open dialog"
                                            >
                                                <PlusIcon size={14} className="text-primary" />
                                            </button>
                                        </div>
                                    </div>
                                </MorphingDialogTrigger>

                                <MorphingDialogContainer>
                                    <MorphingDialogContent className="rounded-lg glass-morphism max-w-lg mx-4">
                                        <div className="flex flex-col gap-4 p-6">
                                            {/* Image positioned on top left */}
                                            <div className="flex items-center gap-4">
                                                <MorphingDialogImage
                                                    src={agent.image}
                                                    alt={agent.name}
                                                    className="w-24 h-24 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <MorphingDialogTitle className="text-2xl text-gradient font-bold">
                                                        {agent.name}
                                                    </MorphingDialogTitle>
                                                    <div className="text-sm text-primary/70 mt-1">{agent.price}</div>
                                                </div>
                                            </div>

                                            <MorphingDialogSubtitle className="text-muted-foreground">
                                                {agent.description}
                                            </MorphingDialogSubtitle>

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
                                                    <h4 className="text-sm font-medium text-primary mb-2">Overview</h4>
                                                    <p className="text-sm text-muted-foreground">{agent.details}</p>
                                                </div>
                                                <div className="neo-blur p-4 rounded-xl">
                                                    <h4 className="text-sm font-medium text-primary mb-2">Pipeline</h4>
                                                    <ul className="space-y-2">
                                                        {agent.pipeline.map((step, index) => (
                                                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                                                {step}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="flex justify-end">
                                                    <GlowButton>Get Started</GlowButton>
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
