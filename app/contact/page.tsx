import type { Metadata } from "next";

import ContactScroll from "@/components/site/contact-scroll";
import SiteFooter from "@/components/site/site-footer";
import SiteNav from "@/components/site/site-nav";

export const metadata: Metadata = {
  title: "NotTyler | Contact",
  description: "Contact not Tyler. I'd rather you dont.",
};

export default function ContactPage() {
  return (
    <div>
      <SiteNav />
      <main>
        <ContactScroll />
      </main>
      <SiteFooter />
    </div>
  );
}
