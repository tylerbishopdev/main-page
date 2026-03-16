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
        company: "notAuth",
        year: "notauth.com",
        title: "Train Your Own AI Image People Cloner With Your Images",
        position: "notauth.com",
        imgSrc: "/logo.png",
        projectLink: "notauthex.png",
        buttonText: "Try It",
        answer:
            "Train AI to generate hyper-realistic images based on people or styles from images you upload. Save trained models and then create clones of people, styles, or animals. Only using the best models. Requires my personal invite code, so if you don't have it and don't know me... don't ask.",
    },
    {
        company: "TextLayer",
        year: "Turn audio files or Open Video links into karoake videos",
        title: "Turn Music Into Karoake Videos w/ Lyrics",
        position: "TextLayer®",
        imgSrc: "/textlayer1.png",
        projectLink: "https://textlayer.app",
        buttonText: "Get Discovered",
        answer:
            "Have an audio file, or open.video link to a song that needs a karoake video with lyrics synchronized? TextLayer understands the lyrics and can make the video in seconds. Just paste a url or upload the audio file and it creates a video you can download.",
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
        company: "Am I Hydrated?",
        year: "AmIHydrated.com",
        title: "Take Pic, AI Decidess",
        position: "Take a pic of your tongue, AI Decides if you are hydrated",
        imgSrc: "/hydrationss.png",
        projectLink: "https://www.amihydrated.com/",
        buttonText: "Lemme Try It",
        answer:
            "A simple app I made so that you can take a picture of your tongue using your phone's camera to let AI help you determine if you are hydrated or not. Takes about 6 seconds and AI will tell you how hydrated, how confident it is in it' analysis, and why it thinks you are hydrated or not. Not a doctor, duh.",
    },
    {
        company: "Macrodata Refinement",
        year: "Lumen Industries",
        title: "Bin em' to win em'",
        position: "Perform Your Duties As An In'y",
        imgSrc: "/macrodata.png",
        projectLink: "https://0ffc1al.com",
        buttonText: "Play Now",
        answer:
            "See if you can perform the regular benign and unmysterious work as quickly as others on your floor.",
    },
    {
        company: "Mario Cart® The Movie ",
        year: "I direct and star in this future summer blockbuster",
        title: "Trailer for Future Blockbuster ",
        position: "Mario Cart® The Movie",
        imgSrc: "/mariomovie.png",
        projectLink: "/mario-cart",
        buttonText: "Watch Now",
        answer:
            "A live action trailer for Mario Cart. A movie that could totally be made. Get at me Hollywood, Ninendo, whoever. Give me 8-10 hours and it's ready to go.",
    }, {
        company: "Sound Frequency Generator",
        year: "Generate waves by freq. type, enveope, and more",
        title: "So THEY can't read your thoughts, or whateve",
        position: "Soundwaving.com",
        imgSrc: "/soundwave.png",
        projectLink: "https://www.soundwaving.com/",
        buttonText: "Try It Out",
        answer:
            "A tool that generates sound frequencies with deep customizable options. I don't care why and neither does the app, so enjot the most flexible generator there is available for free.",
    },
    {
        company: "Clawd Cut Pro",
        year: "clawdcutpro.com",
        title: "No more stupid video editors crashing laptops",
        position: "Directly Edit YouTube / Open.Video's or Create New Ones",
        imgSrc: "/clawdcutpro.png",
        projectLink: "https://clawdcutpro.com",
        buttonText: "Try It Out",
        answer:
            "A tool that allows you to directly edit YouTube / Open.Video's or create new ones directly in a browser by providing the links or connecting your channel. Create highlights, add captions, make edits, all using prompts without ever needing to download or make any edits. Its magic.",
    },
    {
        company: "OJFlix",
        year: "OjFlix.com",
        title: "Put OJ In Any Movie Trailer",
        position: "What if he did it?",
        imgSrc: "/ojflix.png",
        projectLink: "https://ojflix.com",
        buttonText: "Try OJFlix",
        answer:
            "An app that only a visionary genius could see coming and one that cannot be replicated in ingenuity and pure creative intelligence. Put OJ in any movie. Generate storyboard, movie poster and 30-45 sec. trailer.",
    },
    {
        company: "MuseVault",
        year: "Mac App",
        title: "A Lyrics and Suno Prompt Notepad for the AI Era",
        position: "MuseVault® Mac App",
        imgSrc: "/musevaultimage.png",
        projectLink: "https://github.com/tylerbishopdev/MuseVault.git",
        buttonText: "View on GitHub",
        answer:
            "Auto counts bars and analyzes musical structure to ensure good song-writing. Tags lyrics and measures syllable and word counts per bar automagically. Notes include types for Suno prompts titling and providing auto-descriptions and tags for quick reference.",
    },
    {
        company: "MMA Manager Simulator",
        year: "artofhype.com",
        title: "Do a Good Job at the Worst Job",
        position: "The Ultimate MMA Manager Simulator",
        imgSrc: "/mmamanager.png",
        projectLink: "https://artofhype.com",
        buttonText: "Play Now",
        answer:
            "Simulate the experience of being a figurative punching bag for fighters, promotors, and the seedy under-belly of fighting by playing the ultimate MMA manager simulator. Includes a game builder mode where you can add venues, experiences, and make the game richer and more robust on your own. Limitless possibilities.",
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
