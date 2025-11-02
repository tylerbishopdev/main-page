"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import { ChevronDown } from "lucide-react";



const navLinks = [
    { name: "CHANNEL", href: "https://videos.nottyler.org" },
    { name: "PROJECTS", href: "/projects" },
    { name: "CONTACT", href: "/contact" },
];

export default function HomePage() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xTransform = useTransform(x, [-1, 1], ["-5%", "5%"]);
    const yTransform = useTransform(y, [-1, 1], ["-5%", "5%"]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX, clientY, currentTarget } = event;
        const { width, height } = currentTarget.getBoundingClientRect();
        const xPercent = (clientX / width - 0.5) * 2;
        const yPercent = (clientY / height - 0.5) * 2;
        x.set(xPercent);
        y.set(yPercent);
    };

    const isMediumScreen = useMediaQuery('(max-width: 768px)');

    const backgroundImage = isMediumScreen ? "url(/mobileback.png)" : "url(/mainback.png)";
    const maskImage = isMediumScreen ? "url(/mobilevector.png)" : "url(/mainclip.png)";

    return (
        <div className="bg-background w-full h-screen mx-auto flex flex-col" onMouseMove={handleMouseMove}>
            <header className="w-full pt-4 lg:pt-2  text-white font-mono z-10 mx-auto">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="flex-1 flex justify-start">
                        <Link href="/" className="text-lg">
                            <Image src="/logos2.png" alt="NotTyler" width={105} height={105} />
                        </Link>
                    </div>
                    <div className="hidden md:flex flex-1 justify-end items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link href={link.href} key={link.name} className="text-sm text-foreground hover:text-primary">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex-1 flex justify-end md:hidden">
                        <Menu navLinks={navLinks} />
                    </div>
                </div>
            </header>

            <main className="grow flex items-center justify-center relative pb-6  px-6 ">
                <div className="w-full h-full" style={{
                    maskImage: "url(/mainclip.png)",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskImage: maskImage,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                }}>
                    <motion.div
                        className="w-[120%] h-[110%] -translate-x-1/2 -translate-y-1/2 mx-auto"
                        style={{
                            backgroundImage: backgroundImage,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            x: xTransform,
                            y: yTransform,
                            left: '50%',
                            top: '50%',
                            position: 'relative'
                        }}
                    />

                </div>

            </main>
            <p className="relative items-center mx-auto text-center justify-center font-mono text-xs"> (scroll) <ChevronDown className="w-4 mx-auto text-center h-4" /> </p>

        </div>
    );
}

