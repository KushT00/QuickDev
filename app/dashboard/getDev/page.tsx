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
import { ChevronDown, Search, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from "../../../context/userContext";


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
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
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
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Quick Dev
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const developers = [
  {
    id: 1,
    name: "Alice Johnson",
    rating: 4.8,
    skills: ["React", "JavaScript", "Node.js"],
    hourlyRate: 500,
  },
  {
    id: 2,
    name: "Bob Smith",
    rating: 4.5,
    skills: ["Python", "Django", "Machine Learning"],
    hourlyRate: 600,
  },
  {
    id: 3,
    name: "Catherine Brown",
    rating: 4.9,
    skills: ["Java", "Spring Boot", "AWS"],
    hourlyRate: 700,
  },
  {
    id: 4,
    name: "David Wilson",
    rating: 4.7,
    skills: ["Ruby", "Ruby on Rails", "PostgreSQL"],
    hourlyRate: 550,
  },
  {
    id: 5,
    name: "Eva Martinez",
    rating: 4.6,
    skills: ["PHP", "Laravel", "MySQL"],
    hourlyRate: 450,
  },
  {
    id: 6,
    name: "Frank Lee",
    rating: 4.8,
    skills: ["TypeScript", "Next.js", "GraphQL"],
    hourlyRate: 650,
  },
];
const skills = ["React", "Node.js", "Python", "JavaScript", "TypeScript", "Angular", "Vue.js"]



// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search developers..." className="pl-10 w-full" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Skills <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {skills.map((skill) => (
                <DropdownMenuCheckboxItem
                  key={skill}

                >
                  {skill}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="w-full sm:w-auto">Search</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {developers.map((developer) => (
            <Card key={developer.id} className="flex flex-col">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src="https://online.fliphtml5.com/umxbb/xesz/files/large/8e2963e4c1a7b9603cea6c7fcd95bada.jpg?1684900865"
                    alt={developer.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{developer.name}</h2>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{developer.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  {developer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="mr-2 mb-2">
                      {skill}
                    </Badge>
                  ))}
                </div>

              </CardContent>
              <CardFooter className="mt-auto flex justify-between items-center">
                <button className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Hire Now
                  </span>
                </button>
                <p className="text-xs text-gray-400">₹{developer.hourlyRate}/hour</p>

              </CardFooter>

            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
