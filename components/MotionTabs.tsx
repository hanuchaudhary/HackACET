"use client";

import { motion } from "motion/react";
import { useRouter, usePathname, redirect } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";

interface MotionTabsProps {
  children: ReactNode;
}

export function MotionTabs({ children }: MotionTabsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const tabs = [
    { value: "create", label: "Create Content", href: "/dashboard/create" },
    { value: "history", label: "Post History", href: "/dashboard/history" },
    { value: "analytics", label: "Analytics", href: "/dashboard/analytics" },
  ];

  // Redirect /dashboard to /dashboard/create
  if (pathname === "/dashboard") {
    redirect("/dashboard/create");
  }

  // Determine the active tab based on the current pathname
  const activeTab =
    tabs.find((tab) => pathname === tab.href)?.value || tabs[0].value;

  return (
    <div>
      {/* Tabs List */}
      <div className="grid w-full grid-cols-3 mb-6">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={tab.href}
            className={`relative flex items-center justify-center py-2 text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
            {activeTab === tab.value && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500"
                layoutId="underline"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </div>

      {/* Tabs Content with Animation */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {children}
      </motion.div>
    </div>
  );
}
