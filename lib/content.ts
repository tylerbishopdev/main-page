/**
 * Single source of truth for all real site content.
 * Copy is preserved verbatim from the original nottyler.org (including
 * intentional typos — the voice is part of the brand).
 */

export const IDENTITY = {
  title: "NotTyler | Organization",
  description:
    "Uncompromising and prone to excessive hyperbole; yet dripping with humility. Explore why some people are saying notTyler.org: 'Is one brilliant creative masterpiece after another'.",
  copyright: "COPYRIGHT NOT TYLER .ORG ALL RIGHTS RESERVED",
  copyrightShort: "© Copright nottyler.org 2025",
  tagline: "absurdly creative vision",
  /**
   * LOGO SWAP SLOT — set this to an image path in /public (e.g. "/my-mark.png")
   * and the header brand renders that image instead of the text wordmark.
   * Leave null for the "not tyler®" text mark.
   */
  logoSrc: "/brand/logo-cream.png" as string | null,
};

export const BRAND_ASSETS = {
  logo: {
    cream: "/brand/logo-cream.png",
    red: "/brand/logo-red.png",
    dark: "/brand/logo-dark.png",
  },
  hero: {
    backdrop: "/brand/collage-three-panel.png",
    figure: "/brand/hero-helmet.png",
    secondaryFigure: "/brand/helmet-sun.png",
  },
  collages: [
    "/brand/collage-straight-line.png",
    "/brand/collage-reject-normal.png",
    "/brand/collage-see-differently.png",
    "/brand/collage-broadcast.png",
    "/brand/collage-big.png",
    "/brand/collage-red-grid.png",
    "/brand/poster-future-idols.png",
    "/brand/poster-curious.png",
  ],
  elements: [
    "/brand/hero-helmet.png",
    "/brand/helmet-sun.png",
    "/brand/visor-portrait.png",
    "/brand/field-astronaut.png",
    "/brand/square-helmet.png",
    "/brand/split-horizon.png",
  ],
  texture: "/brand/black-paper-texture.png",
};

export type Destination = {
  name: string;
  href: string;
  note: string;
  external?: boolean;
};

export const DESTINATIONS: Destination[] = [
  { name: "Projects", href: "/#exhibits", note: "unbridled creative genius" },
  {
    name: "Channel",
    href: "https://videos.nottyler.org",
    note: "videos and music",
    external: true,
  },
  { name: "Wut?", href: "/not", note: "Blow your mind" },
  { name: "Contact", href: "/contact", note: "I'd rather you dont" },
];

export const WORKS_INTRO = {
  heading: "Creative works",
  bio: "Described as painfully creative, I believe myself to be better at articulating my thoughts, opinions, and ideas through artistic works. This is a incomplete list that I feel currently represent some component of my vision of the world, humanity, and absurd.",
  warning: "WARNING! creative genius...",
  warningBody:
    "You're welcome. Projects may change without warning. Do not try to understand the my brilliant artistic vision. Feel free to appreciate the intelligent composition of my work without restraint.",
  madnessQuote: [
    "The most creative among us are outcasts",
    "who's genius we call madness",
    "but alas these mad men see our absurdity",
    "that later we call genius",
  ],
};

export type Project = {
  company: string;
  year: string;
  title: string;
  position: string;
  imgSrc: string;
  projectLink: string;
  buttonText: string;
  answer: string;
  external: boolean;
};

/* NOTE: /siktok.png was referenced by the original site but the file never
 * existed in public/, so that entry falls back to a real asset.
 * Xheba is the periodic table sample pad (first in list).
 * notAuth secret lab is the mysterious "if you know..." version (placed as item 4).
 * The original notAuth cloner was moved to the end per request. */
export const PROJECTS: Project[] = [
  {
    company: "Xheba",
    year: "xheba.com",
    title: "Sample Pad Based On Periodic Table",
    position: "Scientifically accurate element sounds",
    imgSrc: "/xheba.png",
    projectLink: "https://xheba.com",
    buttonText: "Play the Elements",
    answer:
      "A sample pad built on the periodic table. Every element produces scientifically accurate sounds mapped directly from real spectral line frequencies. Real physics, turned into playable tones.",
    external: true,
  },
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
    external: true,
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
    external: true,
  },
  {
    company: "notAuth",
    year: "notauth.com",
    title: "A secret AI training lab",
    position: "If you know what to do you are a genius",
    imgSrc: "/notauth-secret.png",
    projectLink: "https://notauth.com",
    buttonText: "Secrets →",
    answer:
      "If you know what to do you are a genius. If not, maybe one day you will.",
    external: true,
  },
  {
    company: "Tylers.wtf",
    year: "software made for me by me",
    title: "Good Tools Remove The Complexity From Work",
    position: "tylers.wtf®  ai media generation",
    imgSrc: "/tylerwtf.png",
    projectLink: "https://tylers.wtf",
    buttonText: "Make something",
    answer:
      "I got tired of showing people how to do dev work or use disparate AI tools to make cools stuff that anyone could make themselves. So I made a tool that brings everything that that I am using currently available in one place.",
    external: true,
  },
  {
    company: "lil Toast",
    year: "RIP",
    title: "She was but a mighty titan forever in our memories",
    position: "liltoast.com",
    imgSrc: "/toaster.png",
    projectLink: "https://www.liltoast.com/",
    buttonText: "Play The Game",
    answer:
      "A simple and straighforward game that's as care-free and tenacious as Toast. Toast wil never be forgotten. Somewhere she is a tiny, but fierce, ghost watching over us.",
    external: true,
  },
  {
    company: "Time Travel",
    year: "speak to me as a time travler",
    title: "Have a real voice conversation with me in the future",
    position: "tylerbot.io",
    imgSrc: "/time.png",
    projectLink: "https://tylerbot.io",
    buttonText: "Start Video Call",
    answer:
      "I have provided the first voice interface in which you can talk to a real person from the future. You can ask me anything but beware for the future may be bizarre and difficult for you to comprehend.",
    external: true,
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
    external: true,
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
    external: true,
  },
  {
    company: "Mario Cart® The Movie",
    year: "I direct and star in this future summer blockbuster",
    title: "Trailer for Future Blockbuster",
    position: "Mario Cart® The Movie",
    imgSrc: "/mariomovie.png",
    projectLink: "/mario-cart",
    buttonText: "Watch Now",
    answer:
      "A live action trailer for Mario Cart. A movie that could totally be made. Get at me Hollywood, Ninendo, whoever. Give me 8-10 hours and it's ready to go.",
    external: false,
  },
  {
    company: "Sound Frequency Generator",
    year: "Generate waves by freq. type, enveope, and more",
    title: "So THEY can't read your thoughts, or whateve",
    position: "Soundwaving.com",
    imgSrc: "/soundwave.png",
    projectLink: "https://www.soundwaving.com/",
    buttonText: "Try It Out",
    answer:
      "A tool that generates sound frequencies with deep customizable options. I don't care why and neither does the app, so enjot the most flexible generator there is available for free.",
    external: true,
  },
  {
    company: "Sictok Timer",
    year: "round timer that uses words",
    title: "SikTok AI Round Timer",
    position: "SicTok® AI Round Timer",
    imgSrc: "/mainback.png",
    projectLink: "https://www.sictok.com/",
    buttonText: "Try It Out",
    answer:
      "No longer do yo need an engineering degree  to use a round timer. Just explain the timer configurtion you want in plain languag and start the timer.",
    external: true,
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
    external: true,
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
    external: true,
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
    external: true,
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
    external: true,
  },
  {
    company: "Coming soon",
    year: "everything else",
    title: "I have so many projects to list",
    position: "Brilliant shit",
    imgSrc: "/mainback.png",
    projectLink: "#",
    buttonText: "just hang on",
    answer: "TBD",
    external: false,
  },
  // Original notAuth (cloner) moved to the very end per request.
  {
    company: "notAuth",
    year: "notauth.com",
    title: "Train Your Own AI Image People Cloner With Your Images",
    position: "notauth.com",
    imgSrc: "/notauthex.png",
    projectLink: "https://notauth.com",
    buttonText: "Try It",
    answer:
      "Train AI to generate hyper-realistic images based on people or styles from images you upload. Save trained models and then create clones of people, styles, or animals. Only using the best models. Requires my personal invite code, so if you don't have it and don't know me... don't ask.",
    external: true,
  },
];

export const CONTACT = {
  heading: "not",
  truths: [
    "Tyler is...",
    "all hype",
    "saving music",
    "the godfather of soul",
    "easy to contact",
    "interested in disucssing",
    "...",
  ],
  artistInfoLabel: "Artist info:",
  info: [
    { label: "not Tyler", href: null },
    { label: "mail: not@nottyler.org", href: "mailto:not@nottyler.org" },
    {
      label: "@tylerbishopbjj on Instagram",
      href: "https://www.instagram.com/tylerbishopbjj",
    },
    { label: "@tylerbishop on X", href: "https://x.com/tylerbishop" },
    {
      label: "tylerbishopdev on Github",
      href: "https://github.com/tylerbishopdev",
    },
    { label: "real name: Tyler Bishop", href: null },
    { label: "plz dont email me", href: null },
  ],
};

export const ART_IMAGES = [
  "/arts/Frame 2087326954.png",
  "/arts/7IhsjX-qIfEi11ONcjkYx_TFM7nPaT.png",
  "/arts/ANGb2UyyL8CNpKx-jS9JY_pZir6pAo.png",
  "/arts/tmpo01owe2f.png",
  "/arts/atyrfwbkhxrmt0cwf4raw1jqh4.webp",
  "/arts/3hTC5wXk5kBPCrkztwwE9_rKCLaHlG.webp",
  "/arts/accTtNO0sVHX0-VEECzup_aA1kBlC6.webp",
  "/arts/5twxv9xwq9rmt0cwd4wryqfkfg.png",
  "/arts/2wnyq7wj0hrmw0cwdsnaqtr4d0.jpg",
  "/arts/3t3dxej9jxrmy0cwd4y9t8hkgr.jpg",
  "/arts/5k5kfcgft9rmr0cwsw79qj5xn4.jpg",
  "/arts/vg0fggzpndrmr0cwtm49kdtgx0.jpg",
  "/arts/tmpjin1u6ku.jpg",
  "/arts/tIDaRfU8zdBzWN6IqgihP_NdlRqSIp.jpg",
  "/arts/3zp88d3x3nrmy0cwj8ftwd9k3m.jpeg",
  "/arts/tmpcr_hrg4a.jpeg",
  "/arts/tmpa2ymwbpi (1).jpeg",
  "/arts/tmpn3ip8vku.png",
];

export const WUT = {
  title: "NotTyler | Wut?",
  description:
    "Wut? Data or weird stuff that is super smart or maybe just interesting to me, but probably genius to you.",
  status: "status: brilliant",
  dashboardName: "Not Dashboard",
  tabs: [
    { id: "maybeTrue", label: "Kinda-Facts©", description: "Default overview" },
    {
      id: "notArt",
      label: "Mostly Arts",
      description: "not for sale, but maybe for sale",
    },
    {
      id: "notOriginals",
      label: "Cult Resources",
      description: "learn how to think like a genius",
    },
  ] as const,
  placeholder: {
    heading: "Give me a sec",
    body: "Check back soon. I am probably busy with something else that's awesome else you should check out until then.",
  },
};

/* Cult Resources — downloadable tools for people who already know what to do
 * with them. Assets live in /public/skills/ (zip + pipeline diagram). */
export const CULT_RESOURCES = {
  items: [
    {
      id: "trailer-forge",
      kind: "Claude Code skill",
      title: "Trailer-Forge",
      tagline: "Idea in. Movie trailer out.",
      description:
        "An agent skill that runs a full concept-to-film assembly line on fal.ai: it plans the shots, wins the look in still images first, animates them, generates and mixes the score, voiceover, and effects, then hands back a watchable ~60 second trailer plus per-shot redo files. Roughly $25-40 in model spend per trailer.",
      requirements:
        "Needs: a fal.ai API key, ffmpeg, Python 3 with Pillow, and an agent that reads SKILL.md (Claude Code or similar).",
      install: "unzip into ~/.claude/skills/ then ask your agent for a trailer",
      diagram: "/skills/trailer-forge-pipeline.svg",
      href: "/skills/trailer-forge.zip",
      buttonText: "Download skill (.zip)",
    },
  ],
} as const;

export const CORRELATION_DATA = [
  { year: "2000", dvdSales: 70, autismRate: 15 },
  { year: "2005", dvdSales: 65, autismRate: 22 },
  { year: "2010", dvdSales: 45, autismRate: 35 },
  { year: "2015", dvdSales: 30, autismRate: 48 },
  { year: "2020", dvdSales: 21, autismRate: 58 },
  { year: "2025", dvdSales: 15, autismRate: 68 },
];

export const CURRENCY_DATA = [
  { year: "1920", amount: 0.1 },
  { year: "1940", amount: 0.3 },
  { year: "1960", amount: 0.8 },
  { year: "1971", amount: 1.2 },
  { year: "1982", amount: 2.5 },
  { year: "2000", amount: 6.5 },
  { year: "2008", amount: 8.5 },
  { year: "2020", amount: 18.5 },
  { year: "2024", amount: 22.0 },
];

export const AI_INVESTMENT_DATA = [
  { company: "OpenAI", invested: 14.0 },
  { company: "Anthropic", invested: 4.2 },
  { company: "Databricks", invested: 4.0 },
  { company: "Shield AI", invested: 1.1 },
  { company: "Figure", invested: 0.9 },
  { company: "Mistral", invested: 0.5 },
];

/* Nominal GDP of the world's 10 largest economies (2025, World Bank, USD
 * trillions) vs. SpaceX (SPCX) market cap at the July 10, 2026 close. */
export const SPACEX_GDP_DATA: { name: string; value: number; highlight?: boolean }[] = [
  { name: "United States", value: 30.77 },
  { name: "China", value: 19.5 },
  { name: "Germany", value: 5.05 },
  { name: "Japan", value: 4.43 },
  { name: "United Kingdom", value: 4.0 },
  { name: "India", value: 3.96 },
  { name: "France", value: 3.37 },
  { name: "Russia", value: 2.56 },
  { name: "Italy", value: 2.55 },
  { name: "Canada", value: 2.32 },
  { name: "SpaceX (market cap)", value: 1.9, highlight: true },
];

/* Music catalog — copy taken verbatim from the original works list on main
 * (components/my-works.tsx). No tracks are invented; the catalog is the
 * Spotify artist project plus the music-adjacent MuseVault app. */
export const MUSIC = {
  heading: "Music",
  year: "audio project",
  title: "People Are Saying I Saved Soul Music",
  position: "Spotify® verified artist",
  imgSrc: "/promo.png",
  projectLink: "https://open.spotify.com/artist/4BhWvEo85DhqdhG8An3x3n",
  buttonText: "Listen on Spotify",
  answer:
    "I'm a singer-songwriter and producer who creates soulful music that is surging in popularity for it's universal acclaim. People with good taste say its better than all music before it.",
  /* The dedicated catalog page added on main (app/music/page.tsx). */
  catalogHref: "/music",
  catalogLabel: "View Full Catalog",
  companion: {
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
};

export const MARIO = {
  title: "NotTyler | Mario Cart",
  description:
    "A live action trailer for Mario Cart. A movie that could totally be made. Get at me Hollywood.",
  videoId: "QKRNJjg6PBu",
};

/* notMusik releases — the documented catalog selection from the site (Spotify artist 4BhWvEo85DhqdhG8An3x3n).
 * This is the real list that was previously rendered in the music page discography.
 * No tracks fabricated. If a fuller track list exists, replace this array with it.
 * Images default to soundwave.png; swap per-item for real art when available. */
export type MusikRelease = {
  id: number;
  title: string;
  type: string;
  plays?: number;
  image: string;
  bgColor: string;
  description?: string;
};

export const NOT_MUSIK_RELEASES: MusikRelease[] = [
  { id: 1, title: "The Original", type: "Single", plays: 1247460, image: "/soundwave.png", bgColor: "#d83a2e", description: "Signature single" },
  { id: 2, title: "Ridin Dirty", type: "Single", plays: 950950, image: "/soundwave.png", bgColor: "#111211", description: "Southern heat" },
  { id: 3, title: "We Get Down", type: "Single", plays: 239170, image: "/soundwave.png", bgColor: "#eee3cd", description: "Low end theory" },
  { id: 4, title: "Grindin'", type: "Single", plays: 121100, image: "/soundwave.png", bgColor: "#a12a21", description: "Hustle anthem" },
  { id: 5, title: "Back Then", type: "Single", plays: 671540, image: "/soundwave.png", bgColor: "#25211c", description: "Reflective" },
  { id: 6, title: "Hood", type: "Single", plays: 121000, image: "/soundwave.png", bgColor: "#d83a2e", description: "Street narrative" },
  { id: 7, title: "Batter Up", type: "Single", plays: 50730, image: "/soundwave.png", bgColor: "#342e25", description: "Game time" },
  { id: 8, title: "Oh, I Think They Like Me", type: "Single", plays: 451760, image: "/soundwave.png", bgColor: "#eee3cd", description: "Crowd favorite" },
  { id: 9, title: "In My Projects", type: "Single", plays: 239170, image: "/soundwave.png", bgColor: "#111211", description: "Block life" },
  { id: 10, title: "White Tee", type: "Single", plays: 105030220, image: "/soundwave.png", bgColor: "#a12a21", description: "Timeless" },
  { id: 11, title: "Erryday Im Hustin", type: "Single", plays: 101001930, image: "/soundwave.png", bgColor: "#d83a2e", description: "Daily grind" },
  { id: 12, title: "St Louie", type: "Single", plays: 34100, image: "/soundwave.png", bgColor: "#25211c", description: "Midwest soul" },
];
