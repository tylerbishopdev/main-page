"use client";

import { useEffect } from "react";

import NotMusik from "@/components/site/not-musik";
import SiteFooter from "@/components/site/site-footer";
import SiteNav from "@/components/site/site-nav";

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/4BhWvEo85DhqdhG8An3x3n";

const featuredEmbeds = [
  {
    num: "01",
    title: "The Original",
    src: "https://open.spotify.com/embed/track/2ZaOwri9prBbdoldMqEPSv?utm_source=generator&theme=0",
  },
  {
    num: "02",
    title: "Ridin Dirty",
    src: "https://open.spotify.com/embed/track/5Gu0PDLN4YJeW3jGF2vIzB?utm_source=generator&theme=0",
  },
];

export default function MusicPage() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal, .reveal-stagger");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden scanlines">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="font-mono text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6 reveal">
            not Tyler presents
          </p>

          <h1 className="pixel-heading font-ndot text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground leading-none mb-6 reveal">
            THE <span className="text-primary animate-pulse">MUSIC</span>
          </h1>

          <p className="font-mono text-primary text-lg sm:text-xl md:text-2xl tracking-wide mb-4 reveal">
            &ldquo;You could listen to something worse&rdquo; - fans
          </p>

          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed reveal">
            Not souless hip-hop music from not Tyler. Unoriginal and artifisoul.
          </p>

          <div className="mt-16 reveal">
            <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent mx-auto" />
          </div>
        </div>
      </section>

      {/* Streaming Links */}
      <section className="border-y border-border bg-card/50 reveal">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <a
              href="https://open.spotify.com/artist/4BhWvEo85DhqdhG8An3x3n"
              target="_blank"
              rel="noopener noreferrer"
              className="stream-link flex items-center gap-2 px-4 py-2 border border-foreground/25 rounded-full text-foreground font-mono text-sm tracking-wide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Spotify
            </a>

            <a
              href="https://music.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="stream-link flex items-center gap-2 px-4 py-2 border border-foreground/25 rounded-full text-foreground font-mono text-sm tracking-wide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0019.7.25a10.1 10.1 0 00-1.838-.122C17.162.09 16.463.07 15.762.052c-1.04-.027-2.082-.027-3.123-.027-1.042 0-2.084 0-3.125.028-.7.017-1.4.037-2.1.075A10.1 10.1 0 005.576.25 5.021 5.021 0 003.7.875C2.58 1.607 1.836 2.607 1.52 3.917a9.232 9.232 0 00-.24 2.19c-.04.7-.06 1.4-.076 2.1-.028 1.042-.028 2.083-.028 3.125s0 2.084.028 3.125c.017.7.037 1.4.075 2.1.063.738.18 1.467.24 2.19.318 1.31 1.063 2.31 2.182 3.043a5.022 5.022 0 001.875.625c.624.068 1.25.108 1.838.122.7.038 1.4.058 2.1.075 1.042.028 2.083.028 3.125.028s2.083 0 3.125-.028c.7-.017 1.4-.037 2.1-.075a10.1 10.1 0 001.838-.122 5.021 5.021 0 001.875-.625c1.12-.733 1.864-1.733 2.18-3.043.063-.723.18-1.452.24-2.19.04-.7.06-1.4.076-2.1.028-1.042.028-2.083.028-3.125s0-2.084-.028-3.125a70.478 70.478 0 00-.075-2.1zM17.16 17.395c0 .528-.063.98-.18 1.345a2.137 2.137 0 01-.533.878 1.585 1.585 0 01-.764.42c-.282.065-.577.062-.87.02a2.635 2.635 0 01-.773-.257 1.727 1.727 0 01-.597-.487 1.953 1.953 0 01-.357-.706c-.1-.367-.14-.816-.057-1.255.1-.537.35-.987.702-1.3.362-.32.783-.487 1.206-.513.368-.023.748.05 1.06.248.264.167.384.37.384.37V9.582l.015-.06s-.005-.01-.005-.016l.007-.013L13.987 10.2v9.27c0 .527-.063.978-.18 1.344a2.137 2.137 0 01-.533.877 1.585 1.585 0 01-.764.42c-.282.066-.577.062-.87.02a2.635 2.635 0 01-.773-.256 1.727 1.727 0 01-.597-.487 1.952 1.952 0 01-.357-.706c-.1-.367-.14-.816-.057-1.256.1-.536.35-.986.702-1.3.362-.32.783-.486 1.206-.512.368-.023.748.05 1.06.248.264.168.384.37.384.37V8.066a.755.755 0 01.552-.726l4.204-1.2a.274.274 0 01.345.265V17.395z" />
              </svg>
              Apple Music
            </a>

            <a
              href="https://music.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="stream-link flex items-center gap-2 px-4 py-2 border border-foreground/25 rounded-full text-foreground font-mono text-sm tracking-wide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
              </svg>
              YouTube Music
            </a>

            <a
              href="https://www.youtube.com/@notTylerMusic"
              target="_blank"
              rel="noopener noreferrer"
              className="stream-link flex items-center gap-2 px-4 py-2 border border-foreground/25 rounded-full text-foreground font-mono text-sm tracking-wide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube Channel
            </a>
          </div>
        </div>
      </section>

      {/* Featured Tracks — Spotify Embeds */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="reveal">
          <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-3">Now Playing</p>
          <h2 className="pixel-heading font-ndot text-3xl sm:text-4xl md:text-5xl text-foreground mb-12">FEATURED TRACKS</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredEmbeds.map((embed) => (
            <div key={embed.num} className="reveal">
              <p className="font-mono text-sm text-muted-foreground mb-3 tracking-wide">
                {embed.num} — {embed.title}
              </p>
              <div className="rounded-xl overflow-hidden bg-card border border-border">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src={embed.src}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* notMusik interactive archive (replaces the old plain discography list) */}
      <NotMusik showHeading={false} />

      {/* Email Capture */}
      <section className="bg-card/60 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-xl mx-auto text-center reveal">
            <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-3">Stay Connected</p>
            <h2 className="pixel-heading font-ndot text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">GET NEW MUSIC FIRST</h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
              Join the list for exclusive releases, behind-the-scenes, and early access.
            </p>

            <form action="#" method="POST" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 bg-background border border-input rounded-lg text-foreground font-mono text-sm placeholder:text-muted-foreground/80 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
              />
              <button
                type="submit"
                className="btn-accent px-7 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-wide rounded-lg uppercase whitespace-nowrap"
              >
                Join List
              </button>
            </form>

            <p className="text-muted-foreground/80 text-xs font-mono mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
