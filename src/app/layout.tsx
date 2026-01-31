import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import { AppLayout } from "@/components/ui/templates/app-layout";

const montserrat = Montserrat({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "ReviewAI — Review Analysis",
    template: "%s | ReviewAI",
  },
  description:
    "AI-powered customer review analysis tool for e-commerce support teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
