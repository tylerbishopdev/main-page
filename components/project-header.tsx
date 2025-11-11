import {
    ScrollVelocityContainer,
    ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

export default function ProjectHeader() {
    return (
        <section className="relative flex w-screen flex-col items-center py-[10vh]  bg-linear-to-b from-background/0 via-accent/20 to-background/0">
            <ScrollVelocityContainer className="text-4xl font-bold md:text-7xl">
                <ScrollVelocityRow baseVelocity={20} direction={1}>
                    <h1 className="text-9xl pt-4 py-4 font-ndot uppercase *:tracking-tighter text-foreground">
                        {" "}
                        <span className="text-primary">WARNING! </span>
                        creative genius...
                    </h1>
                </ScrollVelocityRow>
                <ScrollVelocityRow baseVelocity={20} direction={-1}>
                    <p className="text-3xl md:w-1/2 w-3/4 mx-auto text-center font-mono uppercase tracking-tighter text-foreground">
                        You&apos;re welcome. Projects may change without warning. Do not
                        try to understand the my brilliant artistic vision. Feel free to
                        appreciate the intelligent composition of my work without
                        restraint.
                    </p>
                </ScrollVelocityRow>
            </ScrollVelocityContainer>
        </section>
    );
}

