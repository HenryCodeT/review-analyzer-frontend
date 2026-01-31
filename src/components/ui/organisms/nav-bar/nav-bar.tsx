"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MessageSquareText, History, BarChart3, Send } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Analysis", icon: MessageSquareText },
  { href: "/history", label: "History", icon: History },
  { href: "/metrics", label: "Metrics", icon: BarChart3 },
  { href: "/usages", label: "Usage", icon: Send },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="border-b-2 border-border-secondary bg-bg-primary">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-1 px-4">
        <span className="mr-6 text-lg font-bold text-primary-80">
          ReviewAI
        </span>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-10 text-primary-80"
                  : "text-font-tertiary hover:bg-bg-secondary hover:text-font-primary",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
