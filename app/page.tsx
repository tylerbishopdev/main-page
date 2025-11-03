
import Footer from "@/components/footer";

import MyWorks from "@/components/my-works";

import Skiper7Component from "@/components/ui/skiper-7";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <header className="w-full absolute pt-3 lg:pt-3 font-mono z-10 mx-auto bg-none">
        <div className="flex justify-center items-center max-w-7xl mx-auto">
          <Link href="/" className="text-lg">
            <Image src="/logo12.png" alt="NotTyler" width={145} height={145} className="opacity-60" />
          </Link>
        </div>
      </header>
      <Skiper7Component />



      <MyWorks />
      <Footer />

    </div>
  );
}