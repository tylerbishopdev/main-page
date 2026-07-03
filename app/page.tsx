import Exhibits from "@/components/site/exhibits";
import GalleryStrip from "@/components/site/gallery-strip";
import Hero from "@/components/site/hero";
import Madness from "@/components/site/madness";
import Preloader from "@/components/site/preloader";
import SiteFooter from "@/components/site/site-footer";
import SiteNav from "@/components/site/site-nav";
import WarningMarquee from "@/components/site/warning-marquee";

export default function Page() {
  return (
    <div>
      <Preloader />
      <SiteNav />
      <main>
        <Hero />
        <WarningMarquee />
        <Exhibits />
        <Madness />
        <GalleryStrip />
      </main>
      <SiteFooter />
    </div>
  );
}
