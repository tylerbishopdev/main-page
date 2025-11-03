import { RetroDisplay } from "@/components/ui/retro-display";
import { DataVisualizations } from "@/components/data-visualizations";

export default function LayeredTextAdd() {
    return (
        <div className="min-h-screen px-4 bg-linear-to-b from-background to-primary flex mt-20 flex-col items-center justify-center z-20">
            <div className="relative mt-12 text-center items-center justify-center  w-full h-full">   <RetroDisplay /></div>
            <div className="relative mt-12  items-center justify-center w-full h-full">   <DataVisualizations /></div>

        </div>
    )
}
