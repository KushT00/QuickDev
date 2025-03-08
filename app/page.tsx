/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
// app/page.tsx
'use client';

import React from 'react';
import {
  Bot, Code, Brain, Users, Star, Shield, Zap, CheckCircle,
  Clock, Globe, Search, CreditCard, Rocket, PlayCircle,
  MessageSquare, Mail, BarChart, Activity, Bell, Settings,
  UserCircle, ChevronRight, ArrowRight, CircleDotDashedIcon
} from 'lucide-react';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/navigation';

// Types
interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface AIAgent {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface Developer {
  name: string;
  role: string;
  experience: string;
  rating: number;
  projects: number;
  image: string;
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
}

interface NavItem {
  label: string;
  href: string;
}

// Component
export default function Home() {
  const router = useRouter(); // Initialize router
  const { user } = useUser(); // Destructure userName from the context
  
  
  const handleClick = () => {
    if (!user) {
      router.replace('/login'); // Redirect to sign-in page if userName is empty
    } else {
      router.replace('/dashboard/getAgents'); // Redirect to dashboard if userName exists
    }
  };
  // Navigation items
  const navItems: NavItem[] = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Documentation', href: '#documentation' },
    { label: 'Agents', href: '#agents' }
  ];

  // Stats data
  const stats: StatCard[] = [
    { label: "Active AI Agents", value: "24", change: "+12%", icon: <Bot className="w-5 h-5" /> },
    { label: "Tasks Completed", value: "1,284", change: "+8%", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Response Time", value: "1.2s", change: "-15%", icon: <Clock className="w-5 h-5" /> },
    { label: "Success Rate", value: "99.9%", change: "+2%", icon: <Star className="w-5 h-5" /> }
  ];

  // Features data
  const features: Feature[] = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Browse AI Agents & Developers",
      description: "Explore AI-powered assistants and top-tier freelance developers."
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Choose Your Hiring Model",
      description: "Pay hourly or subscribe for continuous AI agent support."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Boost Your Efficiency",
      description: "Let AI or experts handle your tasks while you focus on growth."
    }
  ];

  // AI Agents data
  const aiAgents: AIAgent[] = [
    {
      name: "CustomerCare AI",
      price: "$299/mo",
      description: "24/7 customer support with natural language understanding",
      features: ["Multi-language Support", "Custom Training", "Analytics Dashboard"]
    },
    {
      name: "SalesGenius AI",
      price: "$399/mo",
      description: "Automate lead qualification and follow-ups",
      features: ["CRM Integration", "Email Automation", "Performance Tracking"]
    },
    {
      name: "DataMaster AI",
      price: "$499/mo",
      description: "Transform raw data into actionable insights",
      features: ["Real-time Processing", "Custom Reports", "API Access"]
    },
    {
      name: "ContentCreator AI",
      price: "$349/mo",
      description: "Generate engaging content across platforms",
      features: ["SEO Optimization", "Multi-format Content", "Brand Voice Training"]
    },
    {
      name: "ProjectManager AI",
      price: "$449/mo",
      description: "Streamline project workflows and team coordination",
      features: ["Task Automation", "Resource Allocation", "Progress Tracking"]
    },
    {
      name: "FinanceWizard AI",
      price: "$599/mo",
      description: "Automate financial analysis and reporting",
      features: ["Real-time Monitoring", "Predictive Analytics", "Compliance Checks"]
    }
  ];

  // Developers data
  const developers: Developer[] = [
    {
      name: "Sarah Chen",
      role: "AI Architecture Expert",
      experience: "8 years",
      rating: 4.9,
      projects: 142,
      image: "https://github.com/shadcn.png"
    },
    {
      name: "Michael Rodriguez",
      role: "ML Engineer",
      experience: "6 years",
      rating: 4.8,
      projects: 98,
      image: "https://github.com/shadcn.png"
    },
    {
      name: "Emily Watson",
      role: "NLP Specialist",
      experience: "7 years",
      rating: 5.0,
      projects: 167,
      image: "https://github.com/shadcn.png"
    }
  ];

  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      name: "Alex Thompson",
      role: "CTO at TechFlow",
      image: "https://github.com/shadcn.png",
      quote: "The AI agents have automated our customer support, reducing response time by 80% while maintaining high satisfaction rates."
    },
    {
      name: "Maria Garcia",
      role: "CEO at DataDrive",
      image: "https://github.com/shadcn.png",
      quote: "Hiring developers through AIHub has been a game-changer. The quality of talent and the speed of deployment exceeded our expectations."
    },
    {
      name: "John Mitchell",
      role: "Founder at CloudScale",
      image: "https://github.com/shadcn.png",
      quote: "We've seen a 200% increase in productivity since implementing AI agents alongside our development team."
    }
  ];

  // Performance data for chart
  const performanceData = [40, 70, 45, 90, 65, 85, 95];

  // Reusable button component
  const Button: React.FC<{
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
    onClick?: () => void;
  }> = ({ children, variant = 'primary', className = '', onClick }) => {
    const baseStyles = "px-6 py-2.5 rounded-lg transition-all duration-200 font-medium";
    const variants = {
      primary: "glass-morphism text-white hover:bg-black/60",
      secondary: "neo-blur hover:bg-black/50"
    };

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl animate-pulse delay-2000" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_115%)] opacity-[0.18]" />
      </div>


      {/* Navigation */}
      <nav className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Brain className="w-8 h-8 text-blue-400 group-hover:rotate-12 transition-transform" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                AIHub
              </span>
            </div>
            <div className="backdrop-blur-md neo-blur rounded-lg px-8 py-3 border border-white/5 hidden md:block">
              <div className="flex items-center gap-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="relative hover:text-blue-400 transition-colors group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 text-white group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
            <Button onClick={handleClick}>
              {user ? "Dashboard" : "Get Started"}
            </Button>

          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 text-blue-400 animate-fade-in">
              <span className="flex items-center gap-2">
                <CircleDotDashedIcon />
                The Future is Here
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text animate-gradient">
              Revolutionize Your Workflow with AI Agents & Top Developers
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Find and hire the best AI agents or human developers to automate tasks, boost productivity, and scale your business effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="group inline-flex items-center gap-2">
                <span>Hire AI Agent</span>
                <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button
                variant="secondary"
                className="group inline-flex items-center gap-2"
              >
                <span>Hire Developer</span>
                <Users className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </section>

          {/* Dashboard Section with Background Effects */}
          <section className="relative mb-32">
            {/* Glowing Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-1 left-1/3 w-[500px] h-[350px] bg-purple-500 opacity-30 blur-3xl rounded-full" />
              <div className="absolute top-1/2 left-1/2 w-[600px] h-[350px] bg-blue-400 opacity-20 blur-2xl rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Dashboard Container */}
            <div className="relative z-10 neo-blur rounded-2xl border border-white/5 p-8 shadow-2xl transform hover:scale-[1.01] transition-transform">
              <div className="grid grid-cols-12 gap-6">

                {/* Sidebar */}
                <div className="col-span-2 border-r border-white/5 pr-4">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-white">
                      <Activity className="w-5 h-5" />
                      <span className="font-medium">Dashboard</span>
                    </div>
                    {[
                      { icon: <Users className="w-5 h-5" />, label: "Team" },
                      { icon: <BarChart className="w-5 h-5" />, label: "Analytics" },
                      { icon: <MessageSquare className="w-5 h-5" />, label: "Chat" },
                      { icon: <Settings className="w-5 h-5" />, label: "Settings" }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content */}
                <div className="col-span-10 pl-4">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-semibold">AI Performance Dashboard</h3>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCircle className="w-8 h-8 text-gray-400" />
                        <span className="text-sm">John Doe</span>
                      </div>
                    </div>
                  </div>

                  {/* Charts Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="neo-blur rounded-lg p-4 border border-white/5">
                      <h4 className="text-sm font-medium mb-4">Performance Overview</h4>
                      <div className="h-48 flex items-end justify-between gap-2">
                        {performanceData.map((height, index) => (
                          <div key={index} className="w-full bg-white/5 rounded-t-sm">
                            <div
                              className="bg-white w-full rounded-t-sm transition-all duration-1000"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="neo-blur rounded-lg p-4 border border-white/5">
                      <h4 className="text-sm font-medium mb-4">Task Distribution</h4>
                      <div className="h-48 grid grid-cols-2 gap-4">
                        <div className="neo-blur rounded-lg p-4 flex flex-col justify-between hover:bg-white/5 transition-colors">
                          <span className="text-sm text-gray-400">Completed</span>
                          <span className="text-2xl font-bold">1,234</span>
                          <span className="text-sm text-green-400">+12.5%</span>
                        </div>
                        <div className="neo-blur rounded-lg p-4 flex flex-col justify-between hover:bg-white/5 transition-colors">
                          <span className="text-sm text-gray-400">In Progress</span>
                          <span className="text-2xl font-bold">567</span>
                          <span className="text-sm text-yellow-400">+5.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>




          {/* Features Section */}
          <section className="mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gradient">
              Empower your business in 3 simple steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="glass-morphism rounded-xl p-8 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="neo-blur p-4 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Agents Showcase */}
          <section className="mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Premium AI Agents Tailored for Your Business
            </h2>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              Choose from a variety of AI agents specialized in automation, analytics, customer service, and more.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiAgents.map((agent, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md neo-blur rounded-xl border border-white/5 p-6 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 rounded-lg w-fit mb-4">
                    <Bot className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                  <p className="text-gray-400 mb-4">{agent.description}</p>
                  <div className="text-2xl font-bold text-blue-400 mb-4">{agent.price}</div>
                  <ul className="space-y-2 mb-6">
                    {agent.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="secondary" className="w-full">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Developers Showcase */}
          <section className="mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Hire Top-Tier AI Developers for Your Projects
            </h2>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              Connect with experienced developers who specialize in AI, automation, and software development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {developers.map((dev, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md neo-blur rounded-xl border border-white/5 p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img src={dev.image} alt={dev.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h3 className="font-semibold text-lg">{dev.name}</h3>
                      <p className="text-gray-400">{dev.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-400">
                      <span>Experience</span>
                      <span>{dev.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{dev.rating}</span>
                      </div>
                      <span className="text-gray-400">{dev.projects} Projects</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full">
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Success Stories
            </h2>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              Real stories from companies that scaled their operations with our platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md neo-blur rounded-xl border border-white/5 p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">&rdquo;{testimonial.quote}&quot;</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-32 text-center">
            <div className="backdrop-blur-md neo-blur rounded-2xl border border-white/5 p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Start with AI agents or expert developers today and see the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="group inline-flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="secondary"
                  className="group inline-flex items-center gap-2"
                >
                  Schedule Demo
                  <PlayCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/5 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-8 h-8 text-blue-400" />
                  <span className="text-xl font-bold">AIHub</span>
                </div>
                <p className="text-gray-400">
                  Revolutionizing business operations with AI and expert developers.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">FAQs</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="font-semibold mb-4">Stay Updated</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="neo-blur border border-white/5 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 flex-grow"
                  />
                  <button className="bg-blue-500 hover:text-white p-2 rounded-lg transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} AIHub. All rights reserved.
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
