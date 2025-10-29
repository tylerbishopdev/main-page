import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full p-2 text-white font-ndot z-10">
            <div className="flex items-center justify-between max-w-7xl mx-auto text-[10px] text-foreground/30">
                <p>COPYRIGHT NOT TYLER .ORG ALL RIGHTS RESERVED</p>
                <Link href="https://videos.nottyler.org" target="https://videos.nottyler.org">
                    <Image src="/ovlogo.png" alt="OV Logo" width={154} height={154} className="opacity-50 pb-2" />
                </Link>
            </div>
        </footer>
    );
}