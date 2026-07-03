import type { Metadata } from "next";

import NotDashboard from "@/components/site/not-dashboard";
import SiteFooter from "@/components/site/site-footer";
import SiteNav from "@/components/site/site-nav";
import { WUT } from "@/lib/content";

export const metadata: Metadata = {
  title: WUT.title,
  description: WUT.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function NotPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteNav />
      <NotDashboard />
      <SiteFooter />
    </div>
  );
}
