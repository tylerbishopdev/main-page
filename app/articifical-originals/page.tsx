import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import VinylWaitlist from "@/components/site/vinyl-waitlist";
import { ALBUM, IDENTITY } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://nottyler.org"),
  title: ALBUM.pageTitle,
  description: ALBUM.description,
  alternates: { canonical: `/${ALBUM.slug}` },
  openGraph: {
    title: ALBUM.pageTitle,
    description: ALBUM.description,
    url: `https://nottyler.org/${ALBUM.slug}`,
    siteName: "NotTyler",
    images: [{ url: ALBUM.cover, width: 1024, height: 1024, alt: ALBUM.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: ALBUM.pageTitle,
    description: ALBUM.description,
    images: [ALBUM.cover],
  },
};

function SpotifyGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

/* A standalone release poster: the album jacket, the two places to go next,
 * and the pressing list. Deliberately runs without the site nav — the artist
 * ticket is the way back into nottyler.org. */
export default function ArticificalOriginalsPage() {
  return (
    <main className="ao-page">
      <div className="ao-backdrop" aria-hidden="true" />

      <article className="ao-poster ao-rise">
        <h1 className="sr-only">
          {ALBUM.title} {ALBUM.byline}
        </h1>

        <section className="ao-hero">
          <Image
            src={ALBUM.cover}
            alt={`${ALBUM.title} — album artwork by /not Tyler`}
            fill
            priority
            sizes="(max-width: 680px) 100vw, 640px"
            className="ao-hero-art"
          />
          <Image
            src="/articifical/ufo.png"
            alt=""
            width={108}
            height={78}
            className="ao-ufo"
          />
        </section>

        <section className="ao-band-tickets">
          <Image
            src="/articifical/torn-strip.png"
            alt=""
            width={334}
            height={69}
            priority
            className="ao-torn ao-torn--top"
          />

          <div className="ao-tickets">
            <a
              className="ao-ticket ao-ticket--spotify"
              href={ALBUM.spotifyHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ao-ticket-title">Listen on Spotify</span>
              <span className="ao-ticket-brand">
                <SpotifyGlyph />
                <span>Spotify</span>
              </span>
              <span className="ao-ticket-sub">Stream the album now</span>
            </a>

            <Link className="ao-ticket ao-ticket--artist" href={ALBUM.artistHref}>
              <span className="ao-ticket-title">Visit artist site</span>
              <span className="ao-ticket-portal">
                <Image
                  src="/articifical/icon-palette.png"
                  alt=""
                  width={150}
                  height={180}
                  className="ao-ticket-icon"
                />
                <span className="ao-ticket-sub">
                  /not Tyler - Artist portal
                </span>
                <Image
                  src="/articifical/icon-camera.png"
                  alt=""
                  width={180}
                  height={190}
                  className="ao-ticket-icon ao-ticket-icon--camera"
                />
              </span>
            </Link>
          </div>

          <Image
            src="/articifical/torn-strip.png"
            alt=""
            width={334}
            height={69}
            className="ao-torn ao-torn--bottom"
          />
        </section>

        <section className="ao-band-waitlist">
          <Image
            src="/articifical/vinyl.png"
            alt=""
            width={187}
            height={180}
            className="ao-vinyl"
          />

          <VinylWaitlist />
        </section>
      </article>

      <div className="ao-colophon ao-rise ao-rise--2">
        <Link href="/">nottyler.org</Link>
        <Link href="/music">Full catalog</Link>
        <Link href="/docs">Docs</Link>
        <span>{IDENTITY.copyrightShort}</span>
      </div>
    </main>
  );
}
