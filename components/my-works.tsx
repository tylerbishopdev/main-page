"use client";
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
} from "@/components/ui/accordion";
import { TimelineContent } from "@/components/ui/timeline-animation";
import VerticalCutReveal from "@/components/ui/vertical-cut-reveal";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type ExperienceItem = {
    company: string;
    year: string;
    title: string;
    position: string;
    imgSrc: string;
    projectLink: string;
    buttonText: string;
    answer: string;
};

const experienceData: ExperienceItem[] = [
    {
        company: "Music",
        year: "audio project",
        title: "People Are Saying I Saved Soul Music",
        position: "Spotify® verified artist",
        imgSrc: "/promo.png",
        projectLink: "https://open.spotify.com/artist/4BhWvEo85DhqdhG8An3x3n",
        buttonText: "Listen on Spotify",
        answer:
            "I'm a singer-songwriter and producer who creates soulful music that is surging in popularity for it's universal acclaim. People with good taste say its better than all music before it.",
    },
    {
        company: "Tylers.wtf ",
        year: "software made for me by me",
        title: "Good Tools Remove The Complexity From Work",
        position: "tylers.wtf®  ai media generation",
        imgSrc: "/tylerwtf.png",
        projectLink: "https://tylers.wtf",
        buttonText: "Make something",
        answer:
            "I got tired of showing people how to do dev work or use disparate AI tools to make cools stuff that anyone could make themselves. So I made a tool that brings everything that that I am using currently available in one place.",
    },
    {
        company: "lil Toast",
        year: "RIP ",
        title: "She was but a mighty titan forever in our memories",
        position: "liltoast.com",
        imgSrc: "/toaster.png",
        projectLink: "https://www.liltoast.com/",
        buttonText: "Play The Game",
        answer:
            "A simple and straighforward game that's as care-free and tenacious as Toast. Toast wil never be forgotten. Somewhere she is a tiny, but fierce, ghost watching over us.",
    },
    {
        company: "Time Travel",
        year: "speak to me as a time travler ",
        title: "Have a real voice conversation with me in the future",
        position: "tylerbot.io",
        imgSrc: "/time.png",
        projectLink: "https://tylerbot.io",
        buttonText: "Start Video Call",
        answer:
            " I have provided the first voice interface in which you can talk to a real person from the future. You can ask me anything but beware for the future may be bizarre and difficult for you to comprehend.",
    },
    {
        company: "Macrodata Refinement",
        year: "Lumen Industries",
        title: "Bin em' to win em'",
        position: "Perform Your Duties As An In'y",
        imgSrc: "/macrodata.png",
        projectLink: "0ffc1al.com",
        buttonText: "Play Now",
        answer:
            "See if you can perform the regular benign and unmysterious work as quickly as others on your floor.",
    },
    {
        company: "Sictok Timer",
        year: "round timer that uses words",
        title: "SikTok AI Round Timer",
        position: "SicTok® AI Round Timer",
        imgSrc: "/siktok.png",
        projectLink: "https://www.sictok.com/",
        buttonText: "Try It Out",
        answer:
            "No longer do yo need an engineering degree  to use a round timer. Just explain the timer configurtion you want in plain languag and start the timer.",
    },
    {
        company: "Coming soon",
        year: "everything else",
        title: "I have so many projects to list",
        position: "Brilliant shit",
        imgSrc: "/mainback.png",
        projectLink: "#",
        buttonText: "just hang on",
        answer:
            "TBD",
    },

];

export default function Experience6() {
    const heroRef = useRef<HTMLDivElement>(null);
    const revealVariants = {
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            },
        }),
        hidden: {
            filter: "blur(20px)",
            y: 40,
            opacity: 0,
        },
    };
    return (
        <div id="my-works" className="min-h-screen backdrop-blur-sm px-4 bg-linear-to-b from-background to-primary flex mt-20 flex-col items-center justify-center z-20">
            <div
                className="sm:p-10 p-6 mx-auto bg-primary min-h-screen w-full shadow-sm"
                ref={heroRef}
            >
                <article className="max-w-[90%] md:max-w-7xl mx-auto sm:flex items-end py-10 gap-4 justify-between align-center">
                    <h1 className="md:text-8xl pb-2 text-4xl font-mono tracking-tight uppercase text-black  justify-center align-center py-12">
                        <VerticalCutReveal
                            splitBy="characters"
                            staggerDuration={0.025}
                            staggerFrom="first"
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 21,
                            }}
                        >
                            {`Creative works`}
                        </VerticalCutReveal>
                    </h1>
                    <div className="sm:w-96 space-y-1.5 sm:pt-0 pt-4">
                        <p className="text-justify sm:text-sm text-xs text-background font-mono backdrop-blur-xl p-4">
                            Described as painfully creative, I believe myself to be better at articulating my thoughts, opinions, and ideas through artistic works. This is a incomplete list that I feel currently represent some component of my vision of the world, humanity, and absurd.
                        </p>
                    </div>
                </article>

                <div className="mt-3 lg:w-3/4 mx-auto">
                    <Accordion defaultValue="item-2">
                        {experienceData.map((item, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="mb-0 rounded-none px-2 py-2"
                            >
                                <TimelineContent
                                    key={`timeline-header-${index}`}
                                    animationNum={index}
                                    timelineRef={heroRef}
                                    customVariants={revealVariants}
                                >
                                    <AccordionHeader
                                        customIcon
                                        className="hover:no-underline gap-3 border-t-2 border-background p-2 flex justify-between items-center py-2 relative bg-background/90 hover:bg-bg-muted/90 data-active:bg-background/90 text-background sm:text-base text-xs"
                                    >
                                        <h1 className="lg:text-[50px] text-2xl font-advancedled px-6 text-primary uppercase">
                                            {item.company}
                                        </h1>
                                        <p className="lg:text-xl text-xs tracking-tighter space-x-1 px-2 text-right gap-6  py-6 rounded-[4px] text-muted-foreground pr-4 font-sans">
                                            {item.title}
                                        </p>
                                    </AccordionHeader>
                                </TimelineContent>
                                <TimelineContent
                                    key={`timeline-panel-${index}`}
                                    animationNum={index}
                                    timelineRef={heroRef}
                                    customVariants={revealVariants}
                                >
                                    <AccordionPanel
                                        className="space-y-4 w-full mx-auto bg-primary data-active:bg-primary px-0 rounded-lg"
                                        articleClassName="pt-2 px-0 bg-primary sm:p-10 p-4 rounded-lg"
                                    >
                                        <div className="gap-4 justify-between grid sm:grid-cols-2">
                                            <div className="sm:w-[80%] w-full space-y-10">
                                                <span className="flex flex-col space-y-2">
                                                    <span className="text-sm sm:text-base italic font-normal">
                                                        ({item.year})
                                                    </span>
                                                    <span className="sm:text-xl uppercase font-medium">
                                                        {item.position}
                                                    </span>
                                                </span>
                                                <p className="text-sm sm:text-base">{item.answer}</p>
                                                <div className="flex gap-2 text-sm">
                                                    <Link
                                                        href={item.projectLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-4 py-2 rounded-md bg-accent text-background border border-accent hover:bg-accent/80 transition-colors"
                                                    >
                                                        {item.buttonText}
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="relative sm:h-96 h-64">
                                                <Image
                                                    src={item.imgSrc}
                                                    alt={item.company}
                                                    fill
                                                    className="object-cover rounded-[10px] opacity-80 border-muted border-2 shadow-2xl shadow-muted/20"
                                                />

                                            </div>
                                        </div>
                                    </AccordionPanel>
                                </TimelineContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
