"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";
import useSound from "use-sound";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number;
  name: string;
  description: string;
  badge: string;
  bgColor: string;
  image: string;
};

interface TikTikColorListProps {
  projects: Project[];
  className?: string;
  showPreview?: boolean;
  previewSize?: "sm" | "md" | "lg";
  enableSound?: boolean;
  infiniteScroll?: boolean;
  scrollThreshold?: number;
}

const TikTikColorList = ({
  projects,
  className = "",
  showPreview = true,
  previewSize = "lg",
  enableSound = true,
  infiniteScroll = true,
  scrollThreshold = 1000,
}: TikTikColorListProps) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [archiveList, setArchiveList] = useState<Project[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const isLoadingRef = useRef(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [playTick] = useSound("/sfx/tick.wav", { volume: 0.5 });

  // Generate initial archive list
  useEffect(() => {
    if (!infiniteScroll) {
      setArchiveList(projects);
      return;
    }

    const generateArchiveList = (count: number) => {
      const initialSet: Project[] = [];
      for (let i = 0; i < count; i++) {
        projects.forEach((project, j) => {
          initialSet.push({
            ...project,
            id: i * projects.length + j,
          });
        });
      }
      return initialSet;
    };

    setArchiveList(generateArchiveList(10)); // Start with 10 sets
  }, [projects, infiniteScroll]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (!infiniteScroll || isLoadingRef.current) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Load more when user is near the bottom
    if (scrollTop + windowHeight >= documentHeight - scrollThreshold) {
      isLoadingRef.current = true;

      setTimeout(() => {
        setArchiveList((prevList) => {
          const currentLength = prevList.length;
          const newItems: Project[] = [];

          // Add 5 more sets
          for (let i = 0; i < 5; i++) {
            projects.forEach((project, j) => {
              newItems.push({
                ...project,
                id: (currentLength / projects.length + i) * projects.length + j,
              });
            });
          }

          return [...prevList, ...newItems];
        });

        isLoadingRef.current = false;
      }, 500);
    }
  }, [projects, infiniteScroll, scrollThreshold]);

  // Add scroll listener
  useEffect(() => {
    if (!infiniteScroll) return;

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, infiniteScroll]);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    // Clean up previous triggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    itemRefs.current = itemRefs.current.slice(0, archiveList.length);

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      ScrollTrigger.create({
        trigger: item,
        start: "top 70%",
        end: "top 65%",
        markers: false,
        onEnter: () => {
          if (enableSound) playTick();
          const actualIndex = index % projects.length;
          setCurrentProjectIndex(actualIndex);
          setActiveIndex(index);
        },
        onEnterBack: () => {
          if (enableSound) playTick();
          const actualIndex = index % projects.length;
          setCurrentProjectIndex(actualIndex);
          setActiveIndex(index);
        },
      });

      gsap.to(item, {
        repeat: 1,
        yoyo: true,
        ease: "none",
        scrollTrigger: {
          scroller: containerRef.current,
          trigger: item,
          start: "center bottom",
          end: "center top",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [archiveList, projects.length, playTick, enableSound]);

  const currentProject = projects[currentProjectIndex];

  const getPreviewSize = () => {
    switch (previewSize) {
      case "sm":
        return "h-[200px] w-[200px]";
      case "md":
        return "h-[300px] w-[300px]";
      case "lg":
        return "h-[400px] w-[400px]";
      default:
        return "h-[400px] w-[400px]";
    }
  };

  return (
    <motion.div
      className={cn("archive w-screen", className)}
      ref={containerRef}
      style={{ backgroundColor: currentProject?.bgColor, minHeight: "100vh" }}
      animate={{ backgroundColor: currentProject?.bgColor }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative">
        {/* Preview Image */}
        {showPreview && (
          <div className="fixed bottom-10 right-10 z-50 hidden md:block">
            <motion.div
              drag
              className={cn(
                "overflow-hidden rounded-3xl shadow-2xl",
                getPreviewSize(),
              )}
            >
              <Image
                ref={previewRef}
                src={currentProject?.image}
                className="pointer-events-none h-full w-full object-cover"
                alt={currentProject?.name}
              />
            </motion.div>
          </div>
        )}

        <div className="flex flex-col gap-6 whitespace-nowrap">
          {archiveList.map((project, index) => {
            const isActive = index === activeIndex;
            const opacity = isActive ? 1 : 0.2;
            return (
              <div
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="project-item z-5 w-full py-2 transition-opacity duration-300 hover:opacity-100"
                key={`${project.id}-${index}`}
                style={{ opacity }}
              >
                <div className="mx-auto w-full">
                  <div className="flex w-full cursor-pointer items-center justify-between gap-6 px-10 text-black lg:justify-start">
                    <h1 className="font-pp-mori text-4xl tracking-[-0.05em] md:text-7xl">
                      {project.name}
                    </h1>
                    <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                      {project.badge}
                    </span>
                    <p className="hidden text-sm md:block">[01 sep]</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const Skiper24 = () => {
  const baseProjects: Project[] = [
    {
      id: 0,
      name: "Aarzoo",
      description:
        "A collection of timeless design elements that bridge the past and present",
      badge: "Print Design",
      bgColor: "#ff0000",
      image: "/images/x.com/20.jpeg",
    },
    {
      id: 1,
      name: "Lost Horizons",
      description:
        "Exploring the boundaries of conceptual art and digital expression",
      badge: "Concept Art",
      bgColor: "#fff",
      image: "/images/x.com/21.jpeg",
    },
    {
      id: 2,
      name: "Eternal Echoes",
      description: "Typography that speaks volumes through minimalist elegance",
      badge: "Typography",
      bgColor: "#8b5cf6",
      image: "/images/x.com/3.jpeg",
    },
    {
      id: 3,
      name: "Abstract Dimensions",
      description: "Pushing the limits of experimental media and digital art",
      badge: "Experimental Media",
      bgColor: "#E5389B",
      image: "/images/x.com/4.jpeg",
    },
    {
      id: 4,
      name: "Silent Stories",
      description: "Capturing moments that tell stories without words",
      badge: "Photography",
      bgColor: "#06b6d4",
      image: "/images/x.com/5.jpeg",
    },
    {
      id: 5,
      name: "Fading Memories",
      description:
        "Editorial design that preserves the essence of fleeting moments",
      badge: "Editorial Design",
      bgColor: "#10b981",
      image: "/images/x.com/6.jpeg",
    },
    {
      id: 6,
      name: "Weekend",
      description: "Sound design that creates immersive auditory experiences",
      badge: "Sound Design",
      bgColor: "#ADCABA",
      image: "/images/x.com/19.jpeg",
    },
    {
      id: 7,
      name: "Shattered Glass",
      description: "Art installations that challenge perception and reality",
      badge: "Art Installations",
      bgColor: "#fff",
      image: "/images/x.com/28.jpeg",
    },
    {
      id: 8,
      name: "Timeless Essence",
      description: "Brand strategy that creates lasting impressions",
      badge: "Brand Strategy",
      bgColor: "#F02D05",
      image: "/images/x.com/9.jpeg",
    },
    {
      id: 9,
      name: "Parallel Worlds",
      description: "UX/UI design that transports users to new digital realms",
      badge: "UX/UI Design",
      bgColor: "#8b5cf6",
      image: "/images/x.com/10.jpeg",
    },
    {
      id: 10,
      name: "Invisible Threads",
      description:
        "Fashion styling that weaves stories through fabric and form",
      badge: "Fashion Styling",
      bgColor: "#fff",
      image: "/images/x.com/11.jpeg",
    },
    {
      id: 11,
      name: "Beyond the Surface",
      description:
        "Augmented reality experiences that transcend physical boundaries",
      badge: "Augmented Reality",
      bgColor: "#14b8a6",
      image: "/images/x.com/12.jpeg",
    },
  ];

  return <TikTikColorList projects={baseProjects} />;
};

export { Skiper24 };
