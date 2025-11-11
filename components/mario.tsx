"use client";

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

const MarioVideoPlayer = ({ className }: { className?: string }) => {
    const playerRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    useEffect(() => {
        // The configuration script depends on a target element in the DOM.
        // We use useEffect and useRef to ensure the element is mounted before the script logic runs.
        if (playerRef.current && !initialized.current) {
            initialized.current = true;
            // Ensure the global array for the player exists on the window object.
            (window as any).openVideoPlayers = (window as any).openVideoPlayers || [];

            // Push the configuration for this specific player instance.
            // Instead of `document.currentScript`, we provide a direct reference
            // to the div where the player should be embedded.
            (window as any).openVideoPlayers.push({
                float: false,
                autoplay: false,
                allowPlaylistAds: false,
                target: playerRef.current,
                videoID: "QKRNJjg6PBu"
            });
        }
    }, []); // The empty dependency array ensures this effect runs only once after the component mounts.

    return (
        <>
            {/* This div is the target container for the video player. */}
            <div ref={playerRef} className={className}></div>

            {/* 
        The next/script component handles loading the external player script.
        - `strategy="afterInteractive"` delays loading until the page is interactive.
        - `async` and `data-cfasync` are passed through to the final <script> tag.
      */}
            <Script
                async
                data-cfasync="false"
                src="https://open.video/video.js"
                strategy="afterInteractive"
            />
        </>
    );
};

export default MarioVideoPlayer;