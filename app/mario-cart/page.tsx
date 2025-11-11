import MarioCart from "@/components/mario";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "NotTyler | Mario Cart",
    description: "A live action trailer for Mario Cart. A movie that could totally be made. Get at me Hollywood.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function MarioCartPage() {
    return (
        <div className="bg-linear-to-r from-background via-primary to-background w-full h-screen mx-auto " >
            <header className="w-full pt-4 lg:pt-2  font-mono z-10 mx-auto">
                <div className="flex justify-center items-center max-w-7xl mx-auto">
                    <Link href="/" className="text-lg">
                        <Image src="/logos2.png" alt="NotTyler" width={155} height={155} />
                    </Link>
                    <Link href="/" className="text-xl bg-background/20 hover:bg-secondary/10 border border-accent/50 px-10 mx-3 hover:text-secondary">Go Back</Link>
                </div>
            </header>
            <main className="flex justify-center items-center mx-auto py-10">   <MarioCart className="w-full max-w-4xl aspect-video mx-auto" /></main>

        </div>
    );
}