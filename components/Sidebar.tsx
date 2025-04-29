// components/MotionSidebar.tsx
"use client";

import { motion } from "motion/react";
import { usePathname, redirect } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  History,
  BarChart2,
} from "lucide-react"; // Icons for sidebar items

interface SidebarItem {
  value: string;
  label: string;
  href: string;
  icon: ReactNode;
}

export function Sidebar() {
  const pathname = usePathname();

  // Redirect /dashboard to /dashboard/create
  if (pathname === "/dashboard") {
    redirect("/dashboard/create");
  }

  // Define sidebar items with icons
  const items: SidebarItem[] = [
    {
      value: "create",
      label: "Create Content",
      href: "/dashboard/create",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      value: "history",
      label: "Post History",
      href: "/dashboard/history",
      icon: <History className="h-5 w-5" />,
    },
    {
      value: "analytics",
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      value: "profile",
      label: "Profile",
      href: "/dashboard/profile",
      icon: <BarChart2 className="h-5 w-5" />,
    },
  ];

  // Determine the active item based on the current pathname
  const activeItem =
    items.find((item) => pathname === item.href)?.value || items[0].value;

  return (
    <div className="flex min-h-screen">
      <motion.aside
        className="w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 shadow-sm"
        initial={{ x: -64 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl font-bold text-neutral-900 dark:text-white">
              TweetCraft
            </span>
          </div>
          <nav className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.value}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeItem === item.value
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"
                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </motion.aside>
    </div>
  );
}