"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Home, MessageSquare, User } from "lucide-react";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Profile",
      link: "/dashboard/profile",
      icon: (
        <MessageSquare className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  return <FloatingNav navItems={navItems} />;
}
