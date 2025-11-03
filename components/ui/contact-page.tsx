
"use client";
import { Skiper44 } from "@/components/ui/skiper-ui/skiper44";

import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";



const navLinks = [
    { name: "CHANNEL", href: "https://videos.nottyler.org" },
    { name: "PROJECTS", href: "/projects" },
    { name: "CONTACT", href: "/contact" },
];



const ContactPage = () => {
    return (
        <main>

            <header className="w-full p-4 text-muted font-mono z-10 mx-auto">
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

            <Skiper44 />
        </main>

    );
};

export default ContactPage;