/**
 * UNCIVIL WAR® — content for the interstate conflict broadcast.
 *
 * Voice rule: the premise is the joke. Every line is written straight —
 * wire copy, incident reports, after-action language. The absurdity is
 * in the content, never the delivery.
 */

export type Doctrine = "FORCE" | "CLIMATE" | "COMMERCE" | "PSYOPS";

export type Personality = "aggressive" | "bulwark" | "opportunist" | "erratic";

export type Archetype =
  | "barrage" // 3 light strikes, each rolls crit; chews through a brace
  | "siege" // heavy strike, attacker takes recoil
  | "sanction" // moderate strike + applies a condition
  | "drain" // strike + recover half the damage dealt
  | "rally" // +1 ATK stage and hype, no damage
  | "sabotage" // light strike + enemy -1 ATK stage
  | "gambit" // 50% heavy / 35% weak / 15% intercepted (enemy gains hype)
  | "pierce"; // ignores brace and defense

export type StatusId =
  | "BURNING"
  | "TOLLED"
  | "DISORIENTED"
  | "SNOWBOUND"
  | "EXPOSED"
  | "BECOMING_OHIO";

export type MoveDef = { name: string; flavor: string };
export type TacticalDef = MoveDef & { archetype: Archetype; status?: StatusId };
export type SpecialDef = MoveDef & { status?: StatusId };

export type StateFighter = {
  abbr: string;
  name: string;
  /** placard epithet, tale-of-the-tape register */
  epithet: string;
  hp: number;
  atk: number;
  def: number;
  /** 1–10. Drives crit rate. Listed in the dossier without comment. */
  chaos: number;
  doctrine: Doctrine;
  personality: Personality;
  primary: MoveDef;
  tactical: TacticalDef;
  special: SpecialDef;
  intel: string;
};

/* ------------------------------------------------------------------ */
/*  The 50 combatants                                                  */
/* ------------------------------------------------------------------ */

export const STATES: StateFighter[] = [
  {
    abbr: "AL", name: "Alabama", epithet: "The Crimson Menace",
    hp: 102, atk: 11, def: 7, chaos: 6, doctrine: "FORCE", personality: "aggressive",
    primary: { name: "IRON BOWL OFFENSIVE", flavor: "A fully padded line advances in formation." },
    tactical: { archetype: "rally", name: "HOMECOMING MUSTER", flavor: "The entire town reports. Attendance is not optional." },
    special: { name: "ROLL TIDE TSUNAMI", flavor: "A crimson wall of linemen advances at regulation speed. Resistance is not regulation." },
    intel: "Has beaten everyone at football. Maintains records.",
  },
  {
    abbr: "AK", name: "Alaska", epithet: "The Frozen Colossus",
    hp: 118, atk: 9, def: 9, chaos: 5, doctrine: "CLIMATE", personality: "opportunist",
    primary: { name: "PIPELINE STRIKE", flavor: "Eight hundred miles of pipeline, repurposed as a blunt instrument." },
    tactical: { archetype: "sanction", status: "SNOWBOUND", name: "EXPORT WINTER", flavor: "Winter is shipped south. Standard freight." },
    special: { name: "POLAR VORTEX DELIVERY", flavor: "A cold front with a manifest. Your name is on it." },
    intel: "Twice the size of Texas. The comparison is filed annually.",
  },
  {
    abbr: "AZ", name: "Arizona", epithet: "The Dry Heat",
    hp: 96, atk: 10, def: 6, chaos: 6, doctrine: "PSYOPS", personality: "opportunist",
    primary: { name: "HEAT ADVISORY", flavor: "The advisory is upgraded to a weapons system." },
    tactical: { archetype: "sanction", status: "BURNING", name: "PAVEMENT PROTOCOL", flavor: "Asphalt at 165 degrees. Contact is discouraged." },
    special: { name: "DRY HEAT DEATH RAY", flavor: "118 degrees. Officials note it is a dry heat. The distinction is not helping." },
    intel: "Does not observe daylight saving time. Observes you.",
  },
  {
    abbr: "AR", name: "Arkansas", epithet: "The Rollback",
    hp: 94, atk: 9, def: 8, chaos: 5, doctrine: "COMMERCE", personality: "opportunist",
    primary: { name: "FREIGHT SURGE", flavor: "Every distribution center ships simultaneously. To you." },
    tactical: { archetype: "drain", name: "ROLLBACK ORDER", flavor: "Your assets are marked down and collected." },
    special: { name: "SUPPLY CHAIN CRUSH", flavor: "All trucks converge. ETA: now. Signature required." },
    intel: "Home of Walmart. Logistics is not a metaphor here.",
  },
  {
    abbr: "CA", name: "California", epithet: "The Golden Ego",
    hp: 128, atk: 12, def: 5, chaos: 7, doctrine: "PSYOPS", personality: "opportunist",
    primary: { name: "MEDIA OFFENSIVE", flavor: "Three streaming platforms greenlight your defeat." },
    tactical: { archetype: "sabotage", name: "PERMIT DENIAL", flavor: "Your offensive fails environmental review." },
    special: { name: "THE BIG ONE", flavor: "The scheduled earthquake arrives on time. You are the epicenter." },
    intel: "World's 4th largest economy. Rolling blackouts unrelated.",
  },
  {
    abbr: "CO", name: "Colorado", epithet: "The High Ground",
    hp: 98, atk: 10, def: 7, chaos: 6, doctrine: "CLIMATE", personality: "opportunist",
    primary: { name: "AVALANCHE RELEASE", flavor: "Controlled release. Direction: yours." },
    tactical: { archetype: "sanction", status: "SNOWBOUND", name: "ALTITUDE ORDER", flavor: "The air is reassigned to higher elevations." },
    special: { name: "ALTITUDE ADJUSTMENT", flavor: "Oxygen levels are revised downward. Your lungs file a formal complaint." },
    intel: "Holds the high ground. All of it.",
  },
  {
    abbr: "CT", name: "Connecticut", epithet: "The Quiet Money",
    hp: 90, atk: 10, def: 7, chaos: 4, doctrine: "COMMERCE", personality: "bulwark",
    primary: { name: "PORTFOLIO STRIKE", flavor: "Your position is shorted with conviction." },
    tactical: { archetype: "sabotage", name: "QUARTERLY REVIEW", flavor: "Your performance is discussed." },
    special: { name: "HEDGE FUND AUDIT", flavor: "Your assets are liquidated. The paperwork is immaculate." },
    intel: "Technically New England. Financially a jurisdiction.",
  },
  {
    abbr: "DE", name: "Delaware", epithet: "The Fine Print",
    hp: 84, atk: 9, def: 10, chaos: 4, doctrine: "COMMERCE", personality: "bulwark",
    primary: { name: "SERVICE OF PROCESS", flavor: "You have been served. Repeatedly. At speed." },
    tactical: { archetype: "pierce", name: "JURISDICTION CLAIM", flavor: "Your defenses are ruled inadmissible." },
    special: { name: "SHELL CORP SUMMON", flavor: "You are now incorporated in Delaware. Liabilities transfer immediately." },
    intel: "One million residents. Two million registered corporations.",
  },
  {
    abbr: "FL", name: "Florida", epithet: "The Unsupervised",
    hp: 110, atk: 11, def: 4, chaos: 10, doctrine: "CLIMATE", personality: "erratic",
    primary: { name: "AIRBOAT CAVALRY", flavor: "Airboats. In formation. Nobody authorized this." },
    tactical: { archetype: "gambit", name: "UNSUPERVISED OPERATION", flavor: "Outcome unknown. Supervision declined." },
    special: { name: "FLORIDA MAN RAMPAGE", flavor: "Subject is shirtless, calm, and in possession of an airboat. Casualties expected." },
    intel: "The incident reports are filed hourly. By volume.",
  },
  {
    abbr: "GA", name: "Georgia", epithet: "The Layover",
    hp: 106, atk: 10, def: 7, chaos: 6, doctrine: "COMMERCE", personality: "opportunist",
    primary: { name: "HUB CLOSURE", flavor: "Every connection through Atlanta is cancelled. Including yours." },
    tactical: { archetype: "drain", name: "LAYOVER LEVY", flavor: "Terminal fees are extracted from the stranded." },
    special: { name: "ETERNAL ATL LAYOVER", flavor: "You are rerouted through Atlanta indefinitely. Gate information to follow." },
    intel: "All routes connect through Hartsfield-Jackson. This one will too.",
  },
  {
    abbr: "HI", name: "Hawaii", epithet: "The Hostile Paradise",
    hp: 92, atk: 9, def: 8, chaos: 5, doctrine: "CLIMATE", personality: "opportunist",
    primary: { name: "LAVA FLOW ADVISORY", flavor: "The flow is slow, certain, and headed your way." },
    tactical: { archetype: "drain", name: "TOURISM RECLAMATION", flavor: "Your visitors, revenue, and morale are repatriated." },
    special: { name: "VOLCANIC CHECKOUT", flavor: "Checkout is enforced by lava. Reviews are closed." },
    intel: "Paradise, with an active volcano and a long memory.",
  },
  {
    abbr: "ID", name: "Idaho", epithet: "The Undisclosed",
    hp: 90, atk: 10, def: 7, chaos: 5, doctrine: "PSYOPS", personality: "opportunist",
    primary: { name: "SUBSURFACE OPERATION", flavor: "Something was planted. Something was harvested. No further comment." },
    tactical: { archetype: "pierce", name: "UNDISCLOSED PAYLOAD", flavor: "Contents classified. Impact is not." },
    special: { name: "BALLISTIC SPUD STRIKE", flavor: "Weapons-grade russets enter low orbit. Reentry is scheduled." },
    intel: "The potatoes are public record. Nothing else is.",
  },
  {
    abbr: "IL", name: "Illinois", epithet: "The Deep Dish",
    hp: 112, atk: 11, def: 6, chaos: 6, doctrine: "COMMERCE", personality: "opportunist",
    primary: { name: "COMMODITIES DUMP", flavor: "The futures market lands on you at spot price." },
    tactical: { archetype: "siege", name: "DEEP DISH ORDNANCE", flavor: "Forty pounds of casserole, delivered from altitude." },
    special: { name: "DEEP DISH AIRDROP", flavor: "The payload is labeled 'pizza.' The label is under review." },
    intel: "Considers the pizza question settled. Enforces the settlement.",
  },
  {
    abbr: "IN", name: "Indiana", epithet: "The Left Turn",
    hp: 96, atk: 10, def: 7, chaos: 5, doctrine: "PSYOPS", personality: "opportunist",
    primary: { name: "PACE LAP", flavor: "Thirty-three cars form up behind you. The menace is procedural." },
    tactical: { archetype: "barrage", name: "500 LAPS", flavor: "Repeated high-speed passes. Left turns only." },
    special: { name: "500 LEFT TURNS", flavor: "The field circles at 230mph. You are the infield." },
    intel: "One race. Unlimited confidence.",
  },
  {
    abbr: "IA", name: "Iowa", epithet: "The Quiet Acreage",
    hp: 92, atk: 9, def: 8, chaos: 5, doctrine: "PSYOPS", personality: "bulwark",
    primary: { name: "HARVEST DIRECTIVE", flavor: "The combines mobilize before dawn. As always." },
    tactical: { archetype: "sanction", status: "DISORIENTED", name: "MAZE PROTOCOL", flavor: "You are escorted into the corn. Exit unlisted." },
    special: { name: "CORN MAZE ENTRAPMENT", flavor: "The maze is entered. The maze is not exited. The corn takes notes." },
    intel: "First to caucus. First to strike.",
  },
  {
    abbr: "KS", name: "Kansas", epithet: "The Confirmed Flatland",
    hp: 90, atk: 10, def: 7, chaos: 6, doctrine: "CLIMATE", personality: "opportunist",
    primary: { name: "PREVAILING WINDS", flavor: "The wind arrives sweeping down the plain. Armed." },
    tactical: { archetype: "gambit", name: "TORNADO WARNING", flavor: "Touchdown probability: 50%. Consequences: total." },
    special: { name: "TWISTER TOSS", flavor: "You are relocated 400 feet vertically. Return is not scheduled." },
    intel: "Measurably flatter than a pancake. Peer-reviewed.",
  },
  {
    abbr: "KY", name: "Kentucky", epithet: "The Barrel-Aged",
    hp: 96, atk: 11, def: 6, chaos: 6, doctrine: "FORCE", personality: "aggressive",
    primary: { name: "CAVALRY CHARGE", flavor: "Thoroughbreds at full gallop. The bourbon travels with them." },
    tactical: { archetype: "sanction", status: "BURNING", name: "BARREL PROOF", flavor: "Cask strength. Open flame. Adjacent to you." },
    special: { name: "BOURBON MOLOTOV", flavor: "Aged twelve years in oak. Airborne for two seconds. Proof: sufficient." },
    intel: "More bourbon barrels than residents. The barrels are organized.",
  },
  {
    abbr: "LA", name: "Louisiana", epithet: "The Good Times",
    hp: 98, atk: 11, def: 5, chaos: 8, doctrine: "CLIMATE", personality: "aggressive",
    primary: { name: "SECOND LINE ADVANCE", flavor: "The parade advances. The parade does not yield." },
    tactical: { archetype: "drain", name: "GUMBO REQUISITION", flavor: "Your reserves are added to the pot." },
    special: { name: "MARDI GRAS STAMPEDE", flavor: "Ten thousand floats. No brakes on file. Beads reach terminal velocity." },
    intel: "Laissez les bons temps rouler. Trajectory: yours.",
  },
  {
    abbr: "ME", name: "Maine", epithet: "The Polite Danger",
    hp: 88, atk: 9, def: 9, chaos: 4, doctrine: "CLIMATE", personality: "bulwark",
    primary: { name: "LOBSTER BOAT PICKET", flavor: "The fleet forms a line. The line tightens." },
    tactical: { archetype: "sanction", status: "SNOWBOUND", name: "NOR'EASTER NOTICE", flavor: "The notice is the storm." },
    special: { name: "LOBSTER PINCER MOVEMENT", flavor: "A textbook pincer movement. The lobsters wrote the textbook." },
    intel: "Quiet, remote, and heavily clawed.",
  },
  {
    abbr: "MD", name: "Maryland", epithet: "The Seasoned Veteran",
    hp: 92, atk: 10, def: 7, chaos: 5, doctrine: "PSYOPS", personality: "opportunist",
    primary: { name: "BLUE CRAB OFFENSIVE", flavor: "The claws are rated for this." },
    tactical: { archetype: "sanction", status: "EXPOSED", name: "SEASONING DEPLOYMENT", flavor: "Visibility drops to zero. Flavor rises to hazardous." },
    special: { name: "OLD BAY BLACKOUT", flavor: "The seasoning storm makes landfall. Delicious. Blinding. Sustained." },
    intel: "Applies Old Bay to everything. This conflict qualifies.",
  },
  {
    abbr: "MA", name: "Massachusetts", epithet: "The Original Menace",
    hp: 104, atk: 12, def: 6, chaos: 6, doctrine: "PSYOPS", personality: "aggressive",
    primary: { name: "REVOLUTIONARY PRECEDENT", flavor: "This has been done before. By them. To an empire." },
    tactical: { archetype: "sabotage", name: "PEER REVIEW", flavor: "Your strategy is graded. Harshly." },
    special: { name: "WICKED SMAAHT BOMB", flavor: "Condescension detonates at academic scale. Survivors are corrected." },
    intel: "Founded the country. Retains editorial rights.",
  },
  {
    abbr: "MI", name: "Michigan", epithet: "The Third Coast",
    hp: 106, atk: 10, def: 7, chaos: 6, doctrine: "CLIMATE", personality: "opportunist",
    primary: { name: "LAKE EFFECT FRONT", flavor: "The lakes contribute. None of them are calm." },
    tactical: { archetype: "rally", name: "ASSEMBLY LINE SHIFT", flavor: "Production doubles. Overtime is mandatory." },
    special: { name: "LAKE EFFECT SLAM", flavor: "All four bordering lakes arrive at once. The fifth sends regards." },
    intel: "Borders four Great Lakes. Considers them assets.",
  },
  {
    abbr: "MN", name: "Minnesota", epithet: "The Apology",
    hp: 100, atk: 9, def: 9, chaos: 4, doctrine: "CLIMATE", personality: "bulwark",
    primary: { name: "SNOW EMERGENCY", flavor: "The plows advance in echelon. Politely." },
    tactical: { archetype: "sanction", status: "SNOWBOUND", name: "WIND CHILL ADVISORY", flavor: "The advisory is sincere. So is the cold." },
    special: { name: "OPE, SORRY", flavor: "The apology is sincere. The flanking maneuver is complete." },
    intel: "10,000 lakes. All of them cold about it.",
  },
  {
    abbr: "MS", name: "Mississippi", epithet: "The Unspellable",
    hp: 90, atk: 9, def: 8, chaos: 5, doctrine: "PSYOPS", personality: "opportunist",
    primary: { name: "RIVER CREST", flavor: "The river handles this personally." },
    tactical: { archetype: "sanction", status: "DISORIENTED", name: "SPELLING REQUIREMENT", flavor: "Eleven letters. Four repeats. Zero mercy." },
    special: { name: "SPELLING HEX", flavor: "M-I-S-S-I-S-S-I-P-P-I. Subjects report letter-based disorientation." },
    intel: "The river does the enforcement. The state does the filing.",
  },
  {
    abbr: "MO", name: "Missouri", epithet: "The Skeptic",
    hp: 96, atk: 10, def: 7, chaos: 6, doctrine: "FORCE", personality: "aggressive",
    primary: { name: "SHOW-ME MANDATE", flavor: "Proof is demanded. Pavement is provided." },
    tactical: { archetype: "pierce", name: "GATEWAY BREACH", flavor: "The arch was a door the whole time." },
    special: { name: "SHOW-ME SUPLEX", flavor: "Evidence is requested. The ground supplies it." },
    intel: "Believes nothing it has not personally suplexed.",
  },
  {
    abbr: "MT", name: "Montana", epithet: "The Big Sky",
    hp: 94, atk: 10, def: 8, chaos: 4, doctrine: "FORCE", personality: "bulwark",
    primary: { name: "OPEN RANGE VOLLEY", flavor: "The herd is deputized." },
    tactical: { archetype: "rally", name: "BIG SKY MUSTER", flavor: "The horizon reports for duty." },
    special: { name: "BIG SKY DROP", flavor: "The sky is released. It is a very big sky." },
    intel: "More cattle than people. The cattle are aligned.",
  },
  {
    abbr: "NE", name: "Nebraska", epithet: "The Gentle Roller",
    hp: 92, atk: 9, def: 8, chaos: 4, doctrine: "CLIMATE", personality: "bulwark",
    primary: { name: "CENTER PIVOT SWEEP", flavor: "Irrigation arms rotate to combat configuration." },
    tactical: { archetype: "drain", name: "HUSK PROCEDURE", flavor: "Standard husking. You are the corn." },
    special: { name: "FULL HUSK", flavor: "Complete husking achieved. Procedure notes: routine." },
    intel: "Officially 'gently rolling.' Officially.",
  },
  {
    abbr: "NV", name: "Nevada", epithet: "The House",
    hp: 94, atk: 11, def: 5, chaos: 9, doctrine: "COMMERCE", personality: "erratic",
    primary: { name: "HOUSE ODDS", flavor: "The odds are printed. The odds are wrong. The house knew." },
    tactical: { archetype: "gambit", name: "ALL IN", flavor: "Everything on red. The wheel is loaded." },
    special: { name: "HOUSE ALWAYS WINS", flavor: "Your HP is wagered without consent. The house collects." },
    intel: "What happens there stays there. Including combatants.",
  },
  {
    abbr: "NH", name: "New Hampshire", epithet: "The Granite Ultimatum",
    hp: 88, atk: 12, def: 5, chaos: 7, doctrine: "FORCE", personality: "aggressive",
    primary: { name: "GRANITE CHARGE", flavor: "No brakes are installed. None were requested." },
    tactical: { archetype: "pierce", name: "LIVE FREE BREACH", flavor: "Restraints are declined on principle." },
    special: { name: "LIVE FREE OR DIE CHARGE", flavor: "The plates were a notice. This is the follow-up." },
    intel: "The license plates were the first warning.",
  },
  {
    abbr: "NJ", name: "New Jersey", epithet: "The Exit",
    hp: 100, atk: 11, def: 6, chaos: 7, doctrine: "COMMERCE", personality: "opportunist",
    primary: { name: "TURNPIKE ENFORCEMENT", flavor: "Lane closures deploy around you. All lanes." },
    tactical: { archetype: "sanction", status: "TOLLED", name: "TOLL SCHEDULE", flavor: "Fees accrue hourly. Interest compounds." },
    special: { name: "TOLL AVALANCHE", flavor: "E-ZPass: DECLINED. The outstanding balance arrives physically." },
    intel: "Knows which exit. Will not say.",
  },
  {
    abbr: "NM", name: "New Mexico", epithet: "The Declassified",
    hp: 90, atk: 10, def: 7, chaos: 7, doctrine: "PSYOPS", personality: "erratic",
    primary: { name: "HIGH DESERT OPERATION", flavor: "Something bright occurs over the desert. No further questions." },
    tactical: { archetype: "gambit", name: "WEATHER BALLOON", flavor: "It is a weather balloon. Probably. Impact pending." },
    special: { name: "ROSWELL AIRSTRIKE", flavor: "The incident is declassified, armed, and inbound." },
    intel: "Not new. Not Mexico. Not fully documented.",
  },
  {
    abbr: "NY", name: "New York", epithet: "The Empire",
    hp: 124, atk: 13, def: 5, chaos: 7, doctrine: "COMMERCE", personality: "opportunist",
    primary: { name: "MARKET CORRECTION", flavor: "You are the correction." },
    tactical: { archetype: "sabotage", name: "RENT ASSESSMENT", flavor: "Your position's rent triples." },
    special: { name: "RAT KING SUMMON", flavor: "The rats have organized. Their demands are specific: you." },
    intel: "Is walking here. Currently.",
  },
  {
    abbr: "NC", name: "North Carolina", epithet: "The Pit Crew",
    hp: 100, atk: 10, def: 7, chaos: 5, doctrine: "COMMERCE", personality: "opportunist",
    primary: { name: "PIT STOP PRECISION", flavor: "Four tires. Twelve seconds. Zero sympathy." },
    tactical: { archetype: "barrage", name: "FLIGHT TEST SERIES", flavor: "First in flight. Repeatedly. At you." },
    special: { name: "PIT ROAD MANEUVER", flavor: "A flawless pit maneuver is executed. You were the wall." },
    intel: "First in flight. Files the paperwork to prove it.",
  },
  {
    abbr: "ND", name: "North Dakota", epithet: "The Unbothered",
    hp: 88, atk: 8, def: 11, chaos: 3, doctrine: "CLIMATE", personality: "bulwark",
    primary: { name: "WHITEOUT ADVANCE", flavor: "Visibility zero. Momentum unaffected." },
    tactical: { archetype: "sanction", status: "SNOWBOUND", name: "-40 STANDARD", flavor: "Standard conditions. For them." },
    special: { name: "BLIZZARD OF INDIFFERENCE", flavor: "It is 40 below. This is not considered news locally." },
    intel: "Confirmed visitors: dozens.",
  },
  {
    abbr: "OH", name: "Ohio", epithet: "The Inevitable",
    hp: 104, atk: 11, def: 6, chaos: 9, doctrine: "PSYOPS", personality: "erratic",
    primary: { name: "INTERSTATE CONVERGENCE", flavor: "All roads lead here. That was the plan." },
    tactical: { archetype: "sanction", status: "DISORIENTED", name: "OHIO PROXIMITY", flavor: "Prolonged exposure to Ohio. Effects documented." },
    special: { name: "BECOME OHIO", status: "BECOMING_OHIO", flavor: "The transformation begins. Officials decline to explain. It is already too late." },
    intel: "Cannot be explained. Only survived.",
  },
  {
    abbr: "OK", name: "Oklahoma", epithet: "The Premature Claim",
    hp: 94, atk: 10, def: 6, chaos: 6, doctrine: "FORCE", personality: "aggressive",
    primary: { name: "LAND RUSH", flavor: "Your territory is claimed twelve minutes early. Precedent cited." },
    tactical: { archetype: "rally", name: "SOONER MUSTER", flavor: "They were ready before the signal. As usual." },
    special: { name: "SOONER STAMPEDE", flavor: "The claim is filed before the law permits. The law adjusts." },
    intel: "The wind comes sweeping down the plain. Armed.",
  },
  {
    abbr: "OR", name: "Oregon", epithet: "The Small Batch",
    hp: 94, atk: 10, def: 7, chaos: 6, doctrine: "PSYOPS", personality: "opportunist",
    primary: { name: "SMALL BATCH SORTIE", flavor: "Hand-thrown. Locally sourced. Fully airborne." },
    tactical: { archetype: "sabotage", name: "ZONING OBJECTION", flavor: "Your offensive is rezoned residential." },
    special: { name: "ARTISANAL DRONE STRIKE", flavor: "The ordnance is single-origin. The strike is curated." },
    intel: "Keeps it weird. Keeps records of the weirdness.",
  },
  {
    abbr: "PA", name: "Pennsylvania", epithet: "The Greased Pole",
    hp: 108, atk: 11, def: 6, chaos: 7, doctrine: "FORCE", personality: "aggressive",
    primary: { name: "KEYSTONE ASSAULT", flavor: "The arch holds. You will not." },
    tactical: { archetype: "barrage", name: "SNOWBALL DISCIPLINE", flavor: "Batteries included. Historically." },
    special: { name: "PHILLY FAN FRENZY", flavor: "The poles were greased per procedure. The fans climbed them anyway." },
    intel: "Threw batteries at Santa. The file remains open.",
  },
  {
    abbr: "RI", name: "Rhode Island", epithet: "The Concentrated Rage",
    hp: 80, atk: 13, def: 5, chaos: 7, doctrine: "PSYOPS", personality: "aggressive",
    primary: { name: "FULL COMMITMENT", flavor: "The smallest state commits 100% of everything." },
    tactical: { archetype: "rally", name: "SPITE RESERVES", flavor: "Spite reserves are tapped. They are deep." },
    special: { name: "NAPOLEON COMPLEX", flavor: "Recorded rage exceeds landmass by a factor of ten." },
    intel: "1,214 square miles. All of them furious.",
  },
  {
    abbr: "SC", name: "South Carolina", epithet: "The Reoffender",
    hp: 92, atk: 10, def: 6, chaos: 6, doctrine: "FORCE", personality: "aggressive",
    primary: { name: "PALMETTO VOLLEY", flavor: "The palmettos were load-bearing. Were." },
    tactical: { archetype: "sanction", status: "BURNING", name: "SWEET TEA RATION", flavor: "Sugar content exceeds munitions grade." },
    special: { name: "SWEET TEA OVERDOSE", flavor: "One glass is administered. Cardiology is notified." },
    intel: "Has done this before. Cites the experience.",
  },
  {
    abbr: "SD", name: "South Dakota", epithet: "The Monument",
    hp: 90, atk: 10, def: 8, chaos: 5, doctrine: "FORCE", personality: "opportunist",
    primary: { name: "MONUMENT WATCH", flavor: "The heads have noticed you." },
    tactical: { archetype: "siege", name: "GRANITE COMMITMENT", flavor: "Granite is committed. The recoil is geological." },
    special: { name: "RUSHMORE HEADBUTT", flavor: "Four presidents. One granite forehead. The incident report writes itself." },
    intel: "The heads are always watching. This is documented.",
  },
  {
    abbr: "TN", name: "Tennessee", epithet: "The Medically Inadvisable",
    hp: 98, atk: 11, def: 6, chaos: 6, doctrine: "FORCE", personality: "aggressive",
    primary: { name: "GRAND OLE VOLLEY", flavor: "Every honky-tonk opens fire in key." },
    tactical: { archetype: "sanction", status: "BURNING", name: "HOT CHICKEN RATION", flavor: "The heat rating is redacted." },
    special: { name: "HOT CHICKEN NAPALM", flavor: "Nashville hot. Medically inadvisable. Militarily decisive." },
    intel: "The chicken is classified as a weapons program.",
  },
  {
    abbr: "TX", name: "Texas", epithet: "The Bigger One",
    hp: 130, atk: 13, def: 6, chaos: 6, doctrine: "FORCE", personality: "aggressive",
    primary: { name: "FULL MOBILIZATION", flavor: "Everything is deployed. Everything is bigger." },
    tactical: { archetype: "siege", name: "LONE STAR SIEGE", flavor: "The siege is oversized. So is the recoil." },
    special: { name: "EVERYTHING'S BIGGER", flavor: "Texas produces a larger attack than yours. This is policy." },
    intel: "Was its own country. Keeps the paperwork current.",
  },
  {
    abbr: "UT", name: "Utah", epithet: "The Downline",
    hp: 92, atk: 9, def: 8, chaos: 5, doctrine: "COMMERCE", personality: "bulwark",
    primary: { name: "DOWNLINE DEPLOYMENT", flavor: "Your defeat is a business opportunity. For them." },
    tactical: { archetype: "drain", name: "RECRUITMENT DRIVE", flavor: "Your resources join the network." },
    special: { name: "MLM RECRUITMENT", flavor: "You are not defeated. You are onboarded. Welcome to the team." },
    intel: "Would like a moment of your time. It is not optional.",
  },
  {
    abbr: "VT", name: "Vermont", epithet: "The Aggressively Quaint",
    hp: 84, atk: 9, def: 9, chaos: 4, doctrine: "CLIMATE", personality: "bulwark",
    primary: { name: "SUGARING SEASON", flavor: "The taps are driven. You are the tree." },
    tactical: { archetype: "sanction", status: "SNOWBOUND", name: "MUD SEASON", flavor: "Mobility is revoked until further notice." },
    special: { name: "GRADE-A QUICKSAND", flavor: "Grade A. Dark. Robust. Immobilizing. The state apologizes for nothing." },
    intel: "Quaint by policy. Armed by tradition.",
  },
  {
    abbr: "VA", name: "Virginia", epithet: "The Disappointed",
    hp: 102, atk: 10, def: 8, chaos: 4, doctrine: "FORCE", personality: "bulwark",
    primary: { name: "CONTINENTAL LINE", flavor: "The oldest regiment forms. The muskets are ceremonial. Mostly." },
    tactical: { archetype: "sabotage", name: "FOUNDERS' CENSURE", flavor: "You are formally condemned in period language." },
    special: { name: "FOUNDING SÉANCE", flavor: "The founders are consulted. They are disappointed. It lands like artillery." },
    intel: "Is for lovers. Of precedent.",
  },
  {
    abbr: "WA", name: "Washington", epithet: "The Restructure",
    hp: 102, atk: 11, def: 6, chaos: 5, doctrine: "COMMERCE", personality: "opportunist",
    primary: { name: "CLOUD COVERAGE", flavor: "Coverage is total. Precipitation is corporate." },
    tactical: { archetype: "sabotage", name: "PERFORMANCE REVIEW", flavor: "Your role is deprecated." },
    special: { name: "ORG RESTRUCTURE", flavor: "Your position is eliminated, effective immediately. A calendar invite follows." },
    intel: "Classifies the rain as ambience. Classifies you as headcount.",
  },
  {
    abbr: "WV", name: "West Virginia", epithet: "The Almost Heaven",
    hp: 90, atk: 10, def: 8, chaos: 5, doctrine: "CLIMATE", personality: "opportunist",
    primary: { name: "MOUNTAIN MOMENTUM", flavor: "The mountains take this personally." },
    tactical: { archetype: "drain", name: "HOLLOW EXTRACTION", flavor: "Resources are extracted. Historically thorough." },
    special: { name: "COUNTRY ROADS RECKONING", flavor: "The roads take you home. The destination is not negotiable." },
    intel: "Almost heaven. The 'almost' is load-bearing.",
  },
  {
    abbr: "WI", name: "Wisconsin", epithet: "The Dairy Bloc",
    hp: 100, atk: 10, def: 7, chaos: 6, doctrine: "COMMERCE", personality: "opportunist",
    primary: { name: "DAIRY EMBARGO", flavor: "The cheese supply halts. Withdrawal begins immediately." },
    tactical: { archetype: "siege", name: "CURD PAYLOAD", flavor: "Fried. Squeaking. Ballistic." },
    special: { name: "CURD AVALANCHE", flavor: "A wall of fried cheese descends. The squeaking is constant." },
    intel: "Controls the cheese reserve. Understands what that means.",
  },
  {
    abbr: "WY", name: "Wyoming", epithet: "The Alleged",
    hp: 86, atk: 9, def: 12, chaos: 5, doctrine: "FORCE", personality: "bulwark",
    primary: { name: "PHANTOM MANEUVER", flavor: "The attack originates from a state that may not exist." },
    tactical: { archetype: "pierce", name: "UNVERIFIED STRIKE", flavor: "Cannot be countered. Cannot be confirmed." },
    special: { name: "DOES NOT EXIST", flavor: "The attacking state cannot be confirmed to exist. The damage can." },
    intel: "Population 580,000. Allegedly. Never independently verified.",
  },
];

export const STATE_BY_ABBR: Record<string, StateFighter> = Object.fromEntries(
  STATES.map((s) => [s.abbr, s]),
);

/* ------------------------------------------------------------------ */
/*  Rivalries — standing grudges on file. +15% ordnance both ways.     */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Field developments — wire copy, applied without comment            */
/* ------------------------------------------------------------------ */

export type WarEvent = {
  /** {S} is replaced with the affected state's name */
  headline: string;
  hp?: number;
  hype?: number;
};

export const WAR_EVENTS: WarEvent[] = [
  { headline: "GENDER REVEAL PARTY IGNITES {S}'S WESTERN FLANK", hp: -10 },
  { headline: "SURVEYORS CONFIRM OIL DEPOSIT BENEATH A {S} CRACKER BARREL", hp: 12 },
  { headline: "CANADA GOOSE UNITS DEFECT TO {S}. HANDLERS UNABLE TO INTERVENE", hype: 25 },
  { headline: "{S} FORECAST REVISED TO 'RETALIATORY'", hype: 20 },
  { headline: "FEMA MISROUTES 4,000 TRAMPOLINES TO {S}. USES IDENTIFIED", hp: 8 },
  { headline: "{S} LOSES ONE HOUR TO A TIME ZONE DISPUTE", hype: -15 },
  { headline: "CONTENT CREATORS OCCUPY {S} SUPPLY LINES. THROUGHPUT DROPS", hp: -8 },
  { headline: "{S} GUARD UNIT REASSIGNED TO PARADE DUTY, EFFECTIVE IMMEDIATELY", hype: -20 },
  { headline: "COSTCO SAMPLE STATIONS SUSTAIN {S} FRONT LINE", hp: 10 },
  { headline: "{S} OFFENSIVE FINED BY HOA FOR UNAPPROVED STRUCTURES", hp: -6 },
  { headline: "{S} RATIFIES DEFENSE PACT WITH A REGIONAL WAFFLE CHAIN", hp: 9 },
  { headline: "MINORS ON SCOOTERS SEIZE {S} FORWARD DEPOT. DEMANDS UNCLEAR", hp: -9 },
  { headline: "{S} BATTLE PLAN LEAKS VIA GROUP CHAT. SCREENSHOTS CIRCULATE", hype: -18 },
  { headline: "LOCAL CRYPTID ENDORSES {S}. SIGHTINGS UP 400%", hype: 22 },
  { headline: "{S} DECLARES A SNOW DAY MID-ENGAGEMENT. READINESS IMPROVES", hp: 7 },
  { headline: "GAS STATION SUSHI INCAPACITATES {S} OFFICER CORPS", hp: -11 },
];

/** Idle wire between developments. */
export const TICKER_FILLER: string[] = [
  "CANADA CLOSES BORDER. CITES 'ALL OF IT'",
  "PPV BUYS EXCEED ALL PRIOR WARS COMBINED",
  "VEGAS SUSPENDS ODDS FOLLOWING THE OHIO INCIDENT",
  "SMITHSONIAN PLACES ADVANCE HOLD ON TONIGHT'S DEBRIS",
  "LEGAL SCHOLARS CONFIRM: TECHNICALLY PERMITTED",
  "GEOGRAPHY TEACHERS REPORT RECORD ENGAGEMENT",
  "MAP MANUFACTURERS ANNOUNCE 'SIGNIFICANT REVISIONS'",
  "NEUTRAL STATES CONVENE EMERGENCY SUMMIT AT A DENNY'S",
  "FCC RULES THE CONFLICT 'CONTENT'",
];

/* ------------------------------------------------------------------ */
/*  The desk — Hank (play-by-play) and Gen. Whitlock, Ret. (analysis)  */
/* ------------------------------------------------------------------ */

export const COMMENTARY = {
  hit: [
    "HANK: That will appear in the census.",
    "WHITLOCK: Sound execution. Textbook, if the textbook were legal.",
    "HANK: The cartography desk confirms: that happened.",
    "WHITLOCK: In thirty years of interstate combat — standard.",
    "HANK: Infrastructure was harmed in the making of that play.",
  ],
  crit: [
    "HANK: OH! A CONSTITUTIONAL CRISIS OF A HIT!",
    "WHITLOCK: Effective. I'll allow it.",
    "HANK: THE RICHTER SCALE HAS BEEN NOTIFIED!",
  ],
  heal: [
    "WHITLOCK: Consolidation. Unglamorous. Correct.",
    "HANK: Nothing restores a state like emergency powers, folks.",
  ],
  status: [
    "WHITLOCK: A condition has been applied. It will run its course.",
    "HANK: That one's going to linger.",
  ],
  special: [
    "HANK: SIGNATURE DOCTRINE INBOUND!",
    "WHITLOCK: I have seen this in training films. The films were classified.",
  ],
  rival: [
    "HANK: These two share a border and a filing cabinet of grievances.",
    "WHITLOCK: This grudge predates my commission.",
  ],
  jammed: [
    "WHITLOCK: Signal jammed. Assume the worst.",
    "HANK: We've lost the intercept, folks. Nobody likes that.",
  ],
  ko: [
    "HANK: AND THAT... IS... CARTOGRAPHY!",
    "WHITLOCK: Notify the map office. All of them.",
  ],
} as const;

export const UNCIVIL_META = {
  title: "NotTyler | Uncivil War®",
  description:
    "Sanctioned interstate combat, live on pay-per-view. Two states enter. One is annexed. The $59.99 broadcast fee is waived for domestic viewers.",
};
