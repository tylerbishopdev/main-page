import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ProjectHeader from "./project-header";

type Project = {
    title: string;
    description: string;
    imgUrl: string;
    href: string;
};

const projects: Project[] = [
    { title: "Project Title", description: "Project description.", imgUrl: "/imageone.png", href: "https://videos.nottyler.org" },
    // Add more project objects here
];

export default function Projects() {
    return (
        <div className="bg-background">
            <ProjectHeader />
            <section className="relative z-10 w-screen space-y-20 bg-background/0 py-[10vh]">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-10 sm:grid-cols-2">
                    {projects.map((project, index) => (
                        <Card key={index} className="">
                            <CardHeader className="p-6">
                                <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="p-6">
                                <a href={project.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    View Project
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}