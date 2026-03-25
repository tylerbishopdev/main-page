
import Footer from "@/components/footer";

import MyWorks from "@/components/my-works";

import Skiper7Component from "@/components/ui/skiper-7";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <header className="w-full absolute pt-3 lg:pt-3 font-mono z-10 mx-auto bg-none">
        <div className="flex justify-center items-center max-w-7xl mx-auto">
          <Link href="/" className="text-lg">
            <Image src="/logo12.png" alt="NotTyler" width={145} height={145} className="opacity-60" />
          </Link>
        </div>
      </header>
      <Skiper7Component />



      <MyWorks />

      {/* Music Releases */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-3">Now Streaming</p>
            <h2 className="text-4xl sm:text-6xl font-mono uppercase text-foreground mb-4 tracking-wider">Music</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Soul, R&amp;B, and hip-hop. Raw sounds, real talk, no filter.
            </p>
          </div>

          <div className="mb-12">
            {[
              { num: "01", title: "The Original", plays: "124,746" },
              { num: "02", title: "Ridin Dirty", plays: "95,095" },
              { num: "03", title: "We Get Down", plays: "2,391" },
              { num: "04", title: "Grindin'", plays: "1,211" },
            ].map((track) => (
              <a
                key={track.num}
                href="https://open.spotify.com/artist/4BhWvEo85DhqdhG8An3x3n"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-4 px-4 border-t border-foreground/10 hover:bg-primary/5 transition-colors"
              >
                <span className="font-mono text-xs text-muted-foreground w-6 text-right">{track.num}</span>
                <div className="w-10 h-10 rounded-md bg-primary/15 flex items-center justify-center shrink-0 border border-primary/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-semibold group-hover:text-primary transition-colors truncate">{track.title}</p>
                  <p className="text-muted-foreground text-xs font-mono">Single</p>
                </div>
                <p className="text-primary font-mono text-sm font-medium">{track.plays}</p>
              </a>
            ))}
            <div className="border-t border-foreground/10" />
          </div>

          <div className="text-center">
            <Link
              href="/music"
              className="inline-block px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-wide rounded-lg uppercase hover:bg-primary/90 transition-colors"
            >
              View Full Catalog →
            </Link>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}