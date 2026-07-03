import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "boxicons/css/boxicons.min.css";

import SmoothScroll from "@/components/site/smooth-scroll";
import CursorDot from "@/components/site/cursor-dot";
import { IDENTITY } from "@/lib/content";

export const metadata: Metadata = {
  title: IDENTITY.title,
  description: IDENTITY.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: IDENTITY.title,
    description: IDENTITY.description,
    url: "https://nottyler.org",
    siteName: "NotTyler",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grain">
        <SmoothScroll>{children}</SmoothScroll>
        <CursorDot />
        <Analytics />
      </body>
    </html>
  );
}
