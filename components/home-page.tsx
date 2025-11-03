"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import Image from "next/image";
import Link from "next/link";
import { LimelightNav, type NavItem } from "@/components/ui/shadcn-io/limelight-nav";
import { Video, FolderGit2, Contact } from "lucide-react";
import { useRouter } from "next/navigation";


const navLinks = [
    { name: "CHANNEL", href: "https://videos.nottyler.org", icon: <Video /> },
    { name: "PROJECTS", href: "/projects", icon: <FolderGit2 /> },
    { name: "CONTACT", href: "/contact", icon: <Contact /> },
];

export default function HomePage() {
    const router = useRouter();
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

    const navItems: NavItem[] = navLinks.map(link => ({
        id: link.name,
        icon: link.icon,
        label: link.name,
        onClick: () => {
            if (link.href.startsWith("http")) {
                window.open(link.href, "_blank");
            } else {
                router.push(link.href);
            }
        }
    }));

    return (
        <div className="bg-background w-full h-screen mx-auto flex flex-col" onMouseMove={handleMouseMove}>
            <header className="w-full pt-4 lg:pt-2 text-white font-mono z-10 mx-auto">
                <div className="flex justify-center items-center max-w-7xl mx-auto">
                    <Link href="/" className="text-lg">
                        <Image src="/logos2.png" alt="NotTyler" width={105} height={105} />
                    </Link>
                </div>
            </header>

            <main className="grow flex items-center justify-center relative  px-6  ">
                <div className="w-full h-full " style={{
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
                        className="w-[120%] h-[110%] -translate-x-1/2 -translate-y-1/2 mx-auto shadow-2xl shadow-primary/10"
                        style={{
                            backgroundImage: backgroundImage,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            x: xTransform,
                            y: yTransform,
                            left: '50%',
                            top: '50%',
                            position: 'relative',
                            borderRadius: '100px',
                            boxShadow: '30px 30px 30px 30px rgba(750, 49, 40, 1)',
                        }}
                    />

                </div>

            </main>

            <footer className="fixed bottom-5 left-1/2 -translate-x-1/2 z-20">
                <LimelightNav items={navItems} />
            </footer>
        </div>
    );
}

