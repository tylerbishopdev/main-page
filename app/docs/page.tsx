import type { Metadata } from "next";

import Exhibits from "@/components/site/exhibits";
import SiteFooter from "@/components/site/site-footer";
import SiteNav from "@/components/site/site-nav";
import { DOCS, DOCS_INTRO } from "@/lib/content";

export const metadata: Metadata = {
  title: DOCS_INTRO.title,
  description: DOCS_INTRO.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function DocsPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteNav />
      <main className="flex-1">
        <Exhibits
          projects={DOCS}
          heading={DOCS_INTRO.heading}
          bio={DOCS_INTRO.bio}
          countNoun="docs"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
