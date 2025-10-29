"use client";

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link";

interface NavLink {
    name: string;
    href: string;
}

interface MenuProps {
    navLinks: NavLink[];
}

const Menu: React.FC<MenuProps> = ({ navLinks }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(menuRef, () => {
        if (isOpen) {
            setIsOpen(false);
        }
    });

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-lg font-mono text-white uppercase"
            >
                {isOpen ? "Close" : "Menu"}
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-56 origin-top-right rounded-md bg-black/80 shadow-lg ring-1 ring-white/10 backdrop-blur-sm"
                >
                    <ul className="flex flex-col p-2">
                        {navLinks.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="block px-4 py-2 text-lg font-mono uppercase text-white hover:bg-white/10 rounded-md">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul >
                </motion.div>
            )}
        </div>
    );
};

export default Menu;
