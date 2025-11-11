import Dashboard from "@/components/dashbaord";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "NotTyler | Wut?",
    description: "Wut? Data or weird stuff that is super smart or maybe just interesting to me, but probably genius to you.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function NotPage() {
    return (
        <div>
            <Dashboard />
        </div>
    );
}