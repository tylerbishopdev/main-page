"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

/* Generic Open.Video embed (generalized from the original mario.tsx player).
 * The open.video script consumes configs pushed onto window.openVideoPlayers,
 * so the target div must be mounted before the config is pushed. */
const OpenVideoPlayer = ({
  videoId,
  className,
}: {
  videoId: string;
  className?: string;
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (playerRef.current && !initialized.current) {
      initialized.current = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      w.openVideoPlayers = w.openVideoPlayers || [];
      w.openVideoPlayers.push({
        float: false,
        autoplay: false,
        allowPlaylistAds: false,
        target: playerRef.current,
        videoID: videoId,
      });
    }
  }, [videoId]);

  return (
    <>
      <div ref={playerRef} className={className}></div>
      <Script
        async
        data-cfasync="false"
        src="https://open.video/video.js"
        strategy="afterInteractive"
      />
    </>
  );
};

export default OpenVideoPlayer;
