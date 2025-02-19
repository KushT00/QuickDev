/* eslint-disable react-hooks/rules-of-hooks */
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "relative h-full px-4 py-4 hidden md:flex md:flex-col w-[300px] flex-shrink-0",
          "bg-white/10 backdrop-blur-lg border border-white/20",
          "dark:bg-neutral-900/50 dark:border-neutral-700/30",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[300px] h-[200px] bg-purple-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-1/4 -left-1/4 w-[250px] h-[250px] bg-blue-400/20 blur-2xl rounded-full" />
        </div>
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      {/* Mobile Header */}
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between",
          "bg-white/10 backdrop-blur-lg border-b border-white/20",
          "dark:bg-neutral-900/50 dark:border-neutral-700/30",
          "w-full relative"
        )}
        {...props}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[200px] h-[100px] bg-purple-500/20 blur-3xl rounded-full" />
          <div className="absolute -top-1/2 left-2/3 w-[150px] h-[150px] bg-blue-400/20 blur-2xl rounded-full" />
        </div>
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
              onClick={() => setOpen(false)}
            />
            
            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className={cn(
                "fixed top-0 left-0 h-full w-[280px] z-[100] md:hidden",
                "bg-white dark:bg-neutral-900",
                "border-r border-neutral-200 dark:border-neutral-800",
                "flex flex-col",
                className
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-semibold">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Update SidebarLink to work better on mobile
export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center gap-3 hover:pl-2 py-2 rounded-md",
        "text-neutral-700 hover:text-neutral-100 dark:text-neutral-300 dark:hover:text-neutral-100",
        "hover:bg-primary/90 dark:hover:bg-transparent",
        "transition-all duration-200",
        className
      )}
      onClick={(e) => {
        // Close sidebar on mobile when link is clicked
        if (window.innerWidth < 768) {
          const context = useContext(SidebarContext);
          context?.setOpen(false);
        }
      }}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate && !open ? "none" : "inline-block",
          opacity: animate && !open ? 0 : 1,
        }}
        className="text-sm whitespace-nowrap"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

export default Sidebar;