"use client";

import * as React from "react";
import { NavBar } from "@/components/ui/organisms/nav-bar";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-secondary">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
