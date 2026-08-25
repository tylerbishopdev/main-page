import Advocate from "@/components/site/advocate";
import Exhibits from "@/components/site/exhibits";
import GalleryStrip from "@/components/site/gallery-strip";
import Hero from "@/components/site/hero";
import Madness from "@/components/site/madness";
import MusicCatalog from "@/components/site/music-catalog";
import NotMusik from "@/components/site/not-musik";
import SiteFooter from "@/components/site/site-footer";
import SiteNav from "@/components/site/site-nav";
import WarningMarquee from "@/components/site/warning-marquee";

export default function Page() {
  return (
    <div>
      <SiteNav />
      <main>
        <Hero />
        <WarningMarquee />
        <Advocate />
        <Exhibits />
        <Madness />
        <GalleryStrip />
        <MusicCatalog />
        <NotMusik />
      </main>
      <SiteFooter />
    </div>
  );
}
