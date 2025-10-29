"use client";

import dynamic from "next/dynamic";

const Skiper14 = dynamic(() => import("./skiper14").then((mod) => mod.Skiper14), {
    ssr: false,
});

export default function Skiper14Client() {
    return <Skiper14 />;
}
