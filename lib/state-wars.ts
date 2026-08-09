/**
 * UNCIVIL WAR® — content for the state-on-state pay-per-view.
 * All 50 combatants, their classified intel, signature specials,
 * breaking-news events, and the commentary desk.
 */

export type StateFighter = {
  abbr: string;
  name: string;
  /** placard epithet under the fighter name */
  epithet: string;
  hp: number;
  atk: number;
  def: number;
  /** 1–10, drives crit chance. Florida is the ceiling. */
  chaos: number;
  special: { name: string; flavor: string };
  intel: string;
};

export const STATES: StateFighter[] = [
  { abbr: "AL", name: "Alabama", epithet: "The Crimson Menace", hp: 102, atk: 11, def: 7, chaos: 6, special: { name: "ROLL TIDE TSUNAMI", flavor: "A crimson wave of 300-pound linemen floods the battlefield." }, intel: "Has beaten everyone at football. Will remind you." },
  { abbr: "AK", name: "Alaska", epithet: "The Frozen Colossus", hp: 118, atk: 9, def: 9, chaos: 5, special: { name: "POLAR VORTEX DELIVERY", flavor: "Winter is exported directly to your doorstep. No returns." }, intel: "Twice the size of Texas. Mentions it twice as often." },
  { abbr: "AZ", name: "Arizona", epithet: "The Dry Heat", hp: 96, atk: 10, def: 6, chaos: 6, special: { name: "DRY HEAT DEATH RAY", flavor: "It's 118 degrees, but don't worry — it's a dry heat." }, intel: "Does not observe daylight saving time. Or mercy." },
  { abbr: "AR", name: "Arkansas", epithet: "The Rollback", hp: 94, atk: 9, def: 8, chaos: 5, special: { name: "SUPPLY CHAIN CRUSH", flavor: "Every Walmart truck in America converges on your position." }, intel: "Home of Walmart. The prices roll back. So will you." },
  { abbr: "CA", name: "California", epithet: "The Golden Ego", hp: 128, atk: 12, def: 5, chaos: 7, special: { name: "THE BIG ONE", flavor: "The earthquake has been scheduled. You are the epicenter." }, intel: "World's 4th largest economy. Can't keep the lights on." },
  { abbr: "CO", name: "Colorado", epithet: "The High Ground", hp: 98, atk: 10, def: 7, chaos: 6, special: { name: "ALTITUDE ADJUSTMENT", flavor: "The air is now 40% thinner. Your lungs file a complaint." }, intel: "Everything is uphill from you. Everything." },
  { abbr: "CT", name: "Connecticut", epithet: "The Quiet Money", hp: 90, atk: 10, def: 7, chaos: 4, special: { name: "HEDGE FUND AUDIT", flavor: "Your assets are liquidated. Your feelings are shorted." }, intel: "Technically New England. Emotionally a yacht." },
  { abbr: "DE", name: "Delaware", epithet: "The Fine Print", hp: 84, atk: 9, def: 10, chaos: 4, special: { name: "SHELL CORP SUMMON", flavor: "You are now incorporated in Delaware and owe it everything." }, intel: "1M residents. 2M registered corporations. Do the math." },
  { abbr: "FL", name: "Florida", epithet: "The Unsupervised", hp: 110, atk: 11, def: 4, chaos: 10, special: { name: "FLORIDA MAN RAMPAGE", flavor: "A shirtless man on a stolen airboat answers the call of chaos." }, intel: "The only state with a police blotter instead of a constitution." },
  { abbr: "GA", name: "Georgia", epithet: "The Layover", hp: 106, atk: 10, def: 7, chaos: 6, special: { name: "ETERNAL ATL LAYOVER", flavor: "You are rerouted through Atlanta. You will connect forever." }, intel: "All roads lead through Hartsfield-Jackson. All of them." },
  { abbr: "HI", name: "Hawaii", epithet: "The Hostile Paradise", hp: 92, atk: 9, def: 8, chaos: 5, special: { name: "VOLCANIC CHECKOUT", flavor: "Pele reviews your stay: one star. The lava agrees." }, intel: "Paradise. Will absolutely fight you in paradise." },
  { abbr: "ID", name: "Idaho", epithet: "The Classified Spud", hp: 90, atk: 10, def: 7, chaos: 5, special: { name: "BALLISTIC SPUD STRIKE", flavor: "Weapons-grade russets rain from a cloudless sky." }, intel: "The potatoes are famous. The rest is classified." },
  { abbr: "IL", name: "Illinois", epithet: "The Deep Dish", hp: 112, atk: 11, def: 6, chaos: 6, special: { name: "DEEP DISH AIRDROP", flavor: "A 40-pound casserole labeled 'pizza' is dropped from altitude." }, intel: "Will fight you over what counts as pizza. Starts it, actually." },
  { abbr: "IN", name: "Indiana", epithet: "The Left Turn", hp: 96, atk: 10, def: 7, chaos: 5, special: { name: "500 LEFT TURNS", flavor: "Thirty-three cars circle you at 230mph. Menacingly." }, intel: "Has one race and unlimited confidence." },
  { abbr: "IA", name: "Iowa", epithet: "The Listening Corn", hp: 92, atk: 9, def: 8, chaos: 5, special: { name: "CORN MAZE ENTRAPMENT", flavor: "You enter the maze. The maze does not have an exit." }, intel: "Knee-high by the Fourth of July. The corn is watching." },
  { abbr: "KS", name: "Kansas", epithet: "The Peer-Reviewed Pancake", hp: 90, atk: 10, def: 7, chaos: 6, special: { name: "TWISTER TOSS", flavor: "You're not in Kansas anymore. You are 400 feet above it." }, intel: "Flatter than a pancake. This is peer-reviewed science." },
  { abbr: "KY", name: "Kentucky", epithet: "The Barrel-Aged", hp: 96, atk: 11, def: 6, chaos: 6, special: { name: "BOURBON MOLOTOV", flavor: "Aged 12 years in oak. Airborne for 2 seconds." }, intel: "More bourbon barrels than people. Correct priorities." },
  { abbr: "LA", name: "Louisiana", epithet: "The Good Times", hp: 98, atk: 11, def: 5, chaos: 8, special: { name: "MARDI GRAS STAMPEDE", flavor: "Ten thousand parade floats. Zero brakes. Beads at Mach 2." }, intel: "Laissez les bons temps rouler. Directly over you." },
  { abbr: "ME", name: "Maine", epithet: "The Polite Danger", hp: 88, atk: 9, def: 9, chaos: 4, special: { name: "LOBSTER PINCER MOVEMENT", flavor: "A literal pincer movement. The lobsters studied tactics." }, intel: "Quietly dangerous. Like the ocean. Or a moose." },
  { abbr: "MD", name: "Maryland", epithet: "The Seasoned Veteran", hp: 92, atk: 10, def: 7, chaos: 5, special: { name: "OLD BAY BLACKOUT", flavor: "A seasoning storm at 60mph. Delicious. Blinding." }, intel: "Puts Old Bay on everything. Including this war." },
  { abbr: "MA", name: "Massachusetts", epithet: "The Original Menace", hp: 104, atk: 12, def: 6, chaos: 6, special: { name: "WICKED SMAAHT BOMB", flavor: "Condescension detonates at Harvard-Yard scale." }, intel: "Invented America. Hasn't let it go since." },
  { abbr: "MI", name: "Michigan", epithet: "The Hand That Slaps", hp: 106, atk: 10, def: 7, chaos: 6, special: { name: "LAKE EFFECT SLAM", flavor: "Four Great Lakes arrive at once. None of them are calm." }, intel: "Will show you where it lives on its hand. Then attack." },
  { abbr: "MN", name: "Minnesota", epithet: "The Apology", hp: 100, atk: 9, def: 9, chaos: 4, special: { name: "OPE, SORRY", flavor: "Apologizes sincerely while removing your entire flank." }, intel: "10,000 lakes of pure passive aggression." },
  { abbr: "MS", name: "Mississippi", epithet: "The Unspellable", hp: 90, atk: 9, def: 8, chaos: 5, special: { name: "SPELLING HEX", flavor: "M-I-S-S-I-S-S-I-P-P-I. You are stunned by the letters." }, intel: "The river does the fighting. The state takes the credit." },
  { abbr: "MO", name: "Missouri", epithet: "The Skeptic", hp: 96, atk: 10, def: 7, chaos: 6, special: { name: "SHOW-ME SUPLEX", flavor: "Demands evidence. Provides pavement." }, intel: "Won't believe anything until it has suplexed it." },
  { abbr: "MT", name: "Montana", epithet: "The Big Sky", hp: 94, atk: 10, def: 8, chaos: 4, special: { name: "BIG SKY DROP", flavor: "The sky itself falls on you. It is a very big sky." }, intel: "More cows than people. The cows vote." },
  { abbr: "NE", name: "Nebraska", epithet: "The Gentle Roller", hp: 92, atk: 9, def: 8, chaos: 4, special: { name: "FULL HUSK", flavor: "You are husked like sweet corn before a cookout." }, intel: "It's not flat, it's 'gently rolling.' It is flat." },
  { abbr: "NV", name: "Nevada", epithet: "The House", hp: 94, atk: 11, def: 5, chaos: 9, special: { name: "HOUSE ALWAYS WINS", flavor: "Your HP is placed on red. The wheel was never fair." }, intel: "What happens here stays here. Including you." },
  { abbr: "NH", name: "New Hampshire", epithet: "The License Plate Threat", hp: 88, atk: 12, def: 5, chaos: 7, special: { name: "LIVE FREE OR DIE CHARGE", flavor: "No seatbelts, no helmets, no brakes, no survivors." }, intel: "The license plates were a warning." },
  { abbr: "NJ", name: "New Jersey", epithet: "The Exit", hp: 100, atk: 11, def: 6, chaos: 7, special: { name: "TOLL AVALANCHE", flavor: "E-ZPass DECLINED. The fees compound hourly. With interest." }, intel: "What exit? The last one you'll ever take." },
  { abbr: "NM", name: "New Mexico", epithet: "The Declassified", hp: 90, atk: 10, def: 7, chaos: 7, special: { name: "ROSWELL AIRSTRIKE", flavor: "Recently declassified. Immediately weaponized." }, intel: "Not new. Not Mexico. Entirely extraterrestrial." },
  { abbr: "NY", name: "New York", epithet: "The Walking Here", hp: 124, atk: 13, def: 5, chaos: 7, special: { name: "RAT KING SUMMON", flavor: "The pizza rats have unionized. Their demand is you." }, intel: "Walks here. Is walking here right now." },
  { abbr: "NC", name: "North Carolina", epithet: "The Pit Crew", hp: 100, atk: 10, def: 7, chaos: 5, special: { name: "PIT ROAD MANEUVER", flavor: "Four fresh tires. Twelve seconds. One casualty: you." }, intel: "First in flight. First to bring it up." },
  { abbr: "ND", name: "North Dakota", epithet: "The Unbothered", hp: 88, atk: 8, def: 11, chaos: 3, special: { name: "BLIZZARD OF INDIFFERENCE", flavor: "It is -40 degrees and nobody there has noticed." }, intel: "Visited by literally dozens of people." },
  { abbr: "OH", name: "Ohio", epithet: "The Inevitable", hp: 104, atk: 11, def: 6, chaos: 9, special: { name: "BECOME OHIO", flavor: "It's happening. You feel yourself... becoming Ohio." }, intel: "Cannot be explained. Only survived." },
  { abbr: "OK", name: "Oklahoma", epithet: "The Early Bird", hp: 94, atk: 10, def: 6, chaos: 6, special: { name: "SOONER STAMPEDE", flavor: "Claims your territory 12 minutes before it's legal." }, intel: "The wind comes sweeping down the plain. Armed." },
  { abbr: "OR", name: "Oregon", epithet: "The Small Batch", hp: 94, atk: 10, def: 7, chaos: 6, special: { name: "ARTISANAL DRONE STRIKE", flavor: "Locally sourced. Small batch. Hand-thrown ordnance." }, intel: "Keeps it weird. Weaponizes it weirder." },
  { abbr: "PA", name: "Pennsylvania", epithet: "The Greased Pole", hp: 108, atk: 11, def: 6, chaos: 7, special: { name: "PHILLY FAN FRENZY", flavor: "They greased the poles. The fans climbed them anyway." }, intel: "Threw batteries at Santa. Santa had it coming." },
  { abbr: "RI", name: "Rhode Island", epithet: "The Concentrated Rage", hp: 80, atk: 13, def: 5, chaos: 7, special: { name: "NAPOLEON COMPLEX", flavor: "The smallest state delivers the largest recorded rage." }, intel: "1,214 square miles of pure spite." },
  { abbr: "SC", name: "South Carolina", epithet: "The Sweet Tooth", hp: 92, atk: 10, def: 6, chaos: 6, special: { name: "SWEET TEA OVERDOSE", flavor: "One glass. Nine thousand grams of sugar. Your heart quits." }, intel: "Started this once before. Feeling nostalgic." },
  { abbr: "SD", name: "South Dakota", epithet: "The Four Foreheads", hp: 90, atk: 10, def: 8, chaos: 5, special: { name: "RUSHMORE HEADBUTT", flavor: "Four presidents. One granite forehead. Your problem." }, intel: "The heads are watching. The heads are always watching." },
  { abbr: "TN", name: "Tennessee", epithet: "The Medically Inadvisable", hp: 98, atk: 11, def: 6, chaos: 6, special: { name: "HOT CHICKEN NAPALM", flavor: "Nashville hot. Medically inadvisable. Militarily decisive." }, intel: "The chicken is a weapons program." },
  { abbr: "TX", name: "Texas", epithet: "The Bigger One", hp: 130, atk: 13, def: 6, chaos: 6, special: { name: "EVERYTHING'S BIGGER", flavor: "Texas simply produces a larger attack than yours. It's bigger." }, intel: "Was its own country. Never emotionally stopped." },
  { abbr: "UT", name: "Utah", epithet: "The Downline", hp: 92, atk: 9, def: 8, chaos: 5, special: { name: "MLM RECRUITMENT", flavor: "You're not defeated — you're a business owner now, boss." }, intel: "Would love to add you to its downline." },
  { abbr: "VT", name: "Vermont", epithet: "The Aggressively Quaint", hp: 84, atk: 9, def: 9, chaos: 4, special: { name: "GRADE-A QUICKSAND", flavor: "Maple syrup. Dark. Robust. Inescapable." }, intel: "Aggressively quaint. Quaintly aggressive." },
  { abbr: "VA", name: "Virginia", epithet: "The Disappointed", hp: 102, atk: 10, def: 8, chaos: 4, special: { name: "FOUNDING SÉANCE", flavor: "Summons the founders. They are extremely disappointed in you." }, intel: "Is for lovers. Of ghost-based warfare." },
  { abbr: "WA", name: "Washington", epithet: "The Restructure", hp: 102, atk: 11, def: 6, chaos: 5, special: { name: "ORG RESTRUCTURE", flavor: "Your position has been eliminated. Effective immediately." }, intel: "It's not rain, it's 'atmospheric ambience.'" },
  { abbr: "WV", name: "West Virginia", epithet: "The Almost Heaven", hp: 90, atk: 10, def: 8, chaos: 5, special: { name: "COUNTRY ROADS RECKONING", flavor: "The roads take you home. Violently. To the place you belong." }, intel: "Almost heaven. Emphasis on almost." },
  { abbr: "WI", name: "Wisconsin", epithet: "The Squeaky Doom", hp: 100, atk: 10, def: 7, chaos: 6, special: { name: "CURD AVALANCHE", flavor: "A squeaking wall of fried cheese descends the hill." }, intel: "Your body is 60% water. Wisconsin's is 60% cheese." },
  { abbr: "WY", name: "Wyoming", epithet: "The Alleged", hp: 86, atk: 9, def: 12, chaos: 5, special: { name: "DOES NOT EXIST", flavor: "You cannot counterattack a state that isn't real." }, intel: "Population 580,000. Allegedly. Never verified." },
];

export const STATE_BY_ABBR: Record<string, StateFighter> = Object.fromEntries(
  STATES.map((s) => [s.abbr, s]),
);

/** Famous grudges. Rival matchups hit 15% harder and the desk loses it. */
export const RIVALRIES: [string, string][] = [
  ["OH", "MI"],
  ["TX", "OK"],
  ["NC", "SC"],
  ["ND", "SD"],
  ["CA", "TX"],
  ["NY", "NJ"],
  ["AL", "GA"],
  ["KY", "TN"],
  ["MO", "KS"],
  ["MN", "WI"],
  ["MA", "NY"],
  ["FL", "GA"],
  ["CO", "TX"],
  ["IL", "IN"],
  ["WA", "OR"],
];

export function areRivals(a: string, b: string): boolean {
  return RIVALRIES.some(
    ([x, y]) => (x === a && y === b) || (x === b && y === a),
  );
}

export type WarEvent = {
  /** {S} is replaced with the affected state's name */
  headline: string;
  hp?: number;
  hype?: number;
};

export const WAR_EVENTS: WarEvent[] = [
  { headline: "GENDER REVEAL PARTY IGNITES {S}'S WESTERN FLANK", hp: -10 },
  { headline: "{S} DISCOVERS OIL UNDER A CRACKER BARREL", hp: 12 },
  { headline: "MERCENARY CANADA GEESE DEFECT TO {S}", hype: 25 },
  { headline: "{S}'S WEATHER APP NOW JUST SAYS 'REVENGE'", hype: 20 },
  { headline: "FEMA ACCIDENTALLY SHIPS {S} 4,000 TRAMPOLINES", hp: 8 },
  { headline: "{S} LOSES AN HOUR ARGUING ABOUT DAYLIGHT SAVING TIME", hype: -15 },
  { headline: "INFLUENCERS OCCUPY {S}'S SUPPLY LINES FOR CONTENT", hp: -8 },
  { headline: "{S} NATIONAL GUARD DISTRACTED BY A REALLY GOOD DOG", hype: -20 },
  { headline: "COSTCO SAMPLES SUSTAIN {S}'S ENTIRE FRONT LINE", hp: 10 },
  { headline: "AN HOA FINES {S}'S INVASION FOR 'UNAPPROVED STRUCTURES'", hp: -6 },
  { headline: "{S} SIGNS A DEFENSE PACT WITH A REGIONAL WAFFLE CHAIN", hp: 9 },
  { headline: "13-YEAR-OLDS ON SCOOTERS SEIZE A {S} SUPPLY DEPOT", hp: -9 },
  { headline: "{S}'S GROUP CHAT LEAKS THE ENTIRE BATTLE PLAN", hype: -18 },
  { headline: "LOCAL CRYPTID SPOTTED DOING PUSH-UPS FOR {S}", hype: 22 },
  { headline: "{S} DECLARES A SNOW DAY IN THE MIDDLE OF THE BATTLE", hp: 7 },
  { headline: "GAS STATION SUSHI RAVAGES {S}'S OFFICER CORPS", hp: -11 },
];

/** Idle ticker filler between breaking news. */
export const TICKER_FILLER: string[] = [
  "CANADA ISSUES STATEMENT: 'WE'RE NOT MAD, JUST DISAPPOINTED'",
  "PPV BUYS SURPASS EVERY PREVIOUS WAR COMBINED",
  "VEGAS ODDS SUSPENDED AFTER OHIO DOES... WHATEVER THAT WAS",
  "NATIONAL GUARD OF NEUTRAL STATES SELLING FORACLOSED FORTS",
  "SMITHSONIAN PRE-ORDERS DEBRIS FROM TONIGHT'S MAIN EVENT",
  "SCHOLARS CONFIRM: THIS IS TECHNICALLY ALLOWED UNDER VIBES",
  "GEOGRAPHY TEACHERS REPORT RECORD ENGAGEMENT",
  "MAP MANUFACTURERS BRACE FOR 'SIGNIFICANT REVISIONS'",
  "THE OTHER 48 STATES ARE WATCHING FROM A DENNY'S",
];

export const MOVE_FLAVOR = {
  invade: [
    "{A} sends the boys.",
    "{A} crosses the border with intent and snacks.",
    "{A} invades via the scenic route. Devastating AND charming.",
    "{A} deploys everything in the garage.",
    "{A} shows up uninvited, like at Thanksgiving.",
  ],
  fortify: [
    "{A} passes emergency legislation. It's mostly vibes.",
    "{A} digs in behind decorative hay bales.",
    "{A} holds a town hall and weaponizes the potluck.",
    "{A} sandbags the border with commemorative merchandise.",
  ],
  viralHit: [
    "{A}'s post goes CATASTROPHICALLY viral. {D} is trending. Negatively.",
    "{A} drops a diss track. Certified platinum. Certified painful.",
    "{A} livestreams the offensive. The algorithm smiles.",
  ],
  viralMid: [
    "{A} posts. Modest engagement. Mostly bots.",
    "{A}'s campaign gets 12 likes. Three are from {D}.",
  ],
  viralFail: [
    "{A} is RATIO'D by its own citizens. Morale implodes.",
    "{A} posts cringe. The damage is self-inflicted and historic.",
  ],
} as const;

export const COMMENTARY = {
  hit: [
    "HANK: That's gonna leave a mark on the census.",
    "COL. BISCUITS: Beautiful footwork for a landmass.",
    "HANK: The framers did NOT plan for this.",
    "COL. BISCUITS: In all my years of state-on-state combat...",
    "HANK: Somewhere, a cartographer just fainted.",
  ],
  crit: [
    "HANK: OH THE HUMANITY! AND THE INFRASTRUCTURE!",
    "COL. BISCUITS: THAT'S A CONSTITUTIONAL CRISIS OF A HIT!",
    "HANK: THE RICHTER SCALE JUST UNIONIZED!",
  ],
  heal: [
    "COL. BISCUITS: Smart. Cowardly, but smart.",
    "HANK: Nothing heals like bureaucracy, folks.",
  ],
  special: [
    "HANK: THEY'RE GOING FOR THE SIGNATURE MOVE!",
    "COL. BISCUITS: I'VE ONLY SEEN THIS IN TRAINING FILMS!",
  ],
  rival: [
    "HANK: FOLKS, THESE TWO SHARE A BORDER AND A GRUDGE.",
    "COL. BISCUITS: This rivalry predates several of my marriages.",
  ],
  ko: [
    "HANK: AND THAT... IS... CARTOGRAPHY!",
    "COL. BISCUITS: Somebody call the map people. All of them.",
  ],
} as const;

export const UNCIVIL_META = {
  title: "NotTyler | Uncivil War®",
  description:
    "Two states enter. One state gets annexed. The premium pay-per-view of state-on-state combat — a $59.99 value, free because you're a patriot.",
};
