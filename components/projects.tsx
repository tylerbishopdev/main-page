import { StickyCard_003 } from "@/components/ui/skiper-ui/skiper34";
import {
    ScrollVelocityContainer,
    ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"

const projects = [
    { imgUrl: "/imageone.png", href: "https://videos.nottyler.org" },
    // Add more project objects here
];

const Projects = () => {
    return (
        <>
            <section className="relative flex w-screen flex-col items-center py-[10vh]  bg-gradient-to-b from-background via-accent/10 to-background">
                <ScrollVelocityContainer className="text-4xl font-bold md:text-7xl">
                    <ScrollVelocityRow baseVelocity={20} direction={1}>
                        <h1 className="text-9xl pt-4 py-4 font-ndot uppercase *:tracking-tighter text-foreground">  <span className="text-primary">// warning //  </span> creative genius.</h1>
                    </ScrollVelocityRow>
                    <ScrollVelocityRow baseVelocity={20} direction={-1}>
                        <p className="text-3xl md:w-1/2 w-3/4 mx-auto text-center font-mono uppercase tracking-tighter text-foreground">You're welcome. Projects may change without warning. Do not try to understand the my brilliant artistic vision. Feel free to appreciate the intelligent composition of my work without restraint.</p>
                    </ScrollVelocityRow>
                </ScrollVelocityContainer>

            </section>
            <section className="relative flex w-screen flex-col items-center gap-[10vh] py-[10vh]">
                {projects.map((project, idx) => (
                    <StickyCard_003 key={idx} imgUrl={project.imgUrl} href={project.href} />
                ))}
            </section>
        </>
    );
};

export default Projects;