export const event = {
  name: "Journey Through Bethlehem",
  shortName: "Journey through Bethlehem",
  presentedBy: "Faith & Fellowship Foundation",
  year: 2026,
  annual: "3rd annual",
  datesLabel: "December 3–6, 2026",
  datesShort: "December 3–6",
  dateStart: "2026-12-03",
  dateEnd: "2026-12-06",
  venueName: "2509 Trophy Club Drive",
  venueCity: "Trophy Club, Texas 76262",
  venueFull: "2509 Trophy Club Drive, Trophy Club, Texas 76262",
  mapsUrl:
    "https://maps.google.com/?q=2509+Trophy+Club+Drive,+Trophy+Club,+Texas+76262",
  timezone: "America/Chicago",
  email: "team@journeythroughbethlehem.org",
  instagram: "https://www.instagram.com/journeythroughbethlehem/",
  facebook: "https://www.facebook.com/people/Trophy-Club-Nativity/61551373809765/",
  fffUrl: "https://faithfellowshipfoundation.com/",
  ticketsUrl: "https://buytickets.at/trophyclubnativity/2388791",
  ticketsOpenLabel: "November 1, 2026",
  ticketsOpenShort: "November 1",
  // Midnight Nov 1 in Chicago is still CDT (UTC-05:00); DST ends later that morning.
  ticketsOpenIso: "2026-11-01T00:00:00-05:00",
  // First showtime is 6:00 PM CST Dec 3; the last walk leaves 9:00 PM CST Dec 6.
  eventStartIso: "2026-12-03T18:00:00-06:00",
  eventEndIso: "2026-12-06T22:00:00-06:00",
  accommodations:
    "American Sign Language is offered at Friday’s 7:00 p.m. showtime and at every Saturday and Sunday showtime. Spanish translation is offered every night. Choose the accommodation you need when you reserve.",
  /**
   * Each time may carry its own Ticket Tailor occurrence URL so a tap lands on
   * that exact showtime. Until organizers paste those in (Ticket Tailor
   * dashboard -> the date -> Share, or GET /v1/event_series/{id}/events), the
   * chip falls back to the series page.
   */
  showtimes: [
    {
      date: "December 3",
      weekday: "Thursday",
      slots: [{ time: "6:00" }, { time: "7:00" }, { time: "8:00" }, { time: "9:00" }],
    },
    {
      date: "December 4",
      weekday: "Friday",
      slots: [{ time: "6:00" }, { time: "7:00" }, { time: "8:00" }, { time: "9:00" }],
    },
    {
      date: "December 5",
      weekday: "Saturday",
      slots: [{ time: "5:00" }, { time: "6:00" }, { time: "7:00" }, { time: "8:00" }, { time: "9:00" }],
    },
    {
      date: "December 6",
      weekday: "Sunday",
      slots: [{ time: "5:00" }, { time: "6:00" }, { time: "7:00" }, { time: "8:00" }, { time: "9:00" }],
    },
  ] as ReadonlyArray<{
    date: string;
    weekday: string;
    slots: ReadonlyArray<{ time: string; url?: string }>;
  }>,
} as const;

/** The second module: the invitation leaders know from the flyer and the old site. */
export const invite = {
  kicker: "You’re invited",
  title: "Four December nights in Bethlehem.",
  body: [
    "You are invited to the 3rd annual live nativity in Trophy Club. Step into an interactive Bethlehem marketplace: listen to live music, sample the food, toss a dreidel, make a clay lamp, and meet the live manger animals.",
    "The evening culminates in a live musical performance of the nativity story, with actors, animals, the humble stable, and the guiding star. Bring your friends and family for a heartwarming celebration of faith and love.",
  ],
} as const;

export const nav = [
  { href: "/tickets", label: "Tickets" },
  { href: "/get-involved", label: "Get involved" },
  { href: "/donate", label: "Donate" },
] as const;

// TODO(organizers): swap for the canonical www.signupgenius.com share links —
// these m. URLs work but force the mobile UI on desktop. See docs/CONTENT-TODO.md.
export const volunteerAdultUrl =
  "https://m.signupgenius.com/#!/showSignUp/10C0A49A9AE2DA3F9C16-59033479-volunteer";
export const volunteerYouthUrl =
  "https://m.signupgenius.com/#!/showSignUp/10C0A49A9AE2DA3F9C16-59556125-youth";
export const foodDriveUrl =
  "https://m.signupgenius.com/#!/showSignUp/10C0A49A9AE2DA3F9C16-59054454-food";

// Moments from the walk, for the What to expect carousel. Captions, not stations.
export const walkMoments = [
  {
    caption: "The marketplace: bread, crafts, and a dreidel to toss.",
    src: "/images/photos/marketplace.jpg",
    src720: "/images/photos/marketplace-720.jpg",
    alt: "A volunteer at a marketplace stall with baskets of bread.",
  },
  {
    caption: "Carolers you hear before you see.",
    src: "/images/photos/choir.jpg",
    src720: "/images/photos/choir-720.jpg",
    alt: "Women and girls in white and gold robes singing at the nativity.",
  },
  {
    caption: "A real camel on the road to the census.",
    src: "/images/photos/camel.jpg",
    src720: "/images/photos/camel-720.jpg",
    alt: "A camel in period trappings on the road to the nativity.",
  },
  {
    caption: "The whole cast, on opening night.",
    src: "/images/photos/manger-scene.jpg",
    src720: "/images/photos/manger-scene-720.jpg",
    alt: "Cast and a Roman soldier on horseback at the live nativity.",
  },
  {
    caption: "Artisans at work inside the town.",
    src: "/images/photos/artisans.jpg",
    src720: "/images/photos/artisans-720.jpg",
    alt: "Volunteers in period clothing inside a decorated marketplace room.",
  },
  {
    caption: "Mary and Joseph, played by neighbors.",
    src: "/images/photos/nativity-142.jpg",
    src720: "/images/photos/nativity-142-720.jpg",
    alt: "Two actors portraying Mary and Joseph on the stage.",
  },
  {
    caption: "Shepherds under a painted sky.",
    src: "/images/photos/shepherds.jpg",
    src720: "/images/photos/shepherds-720.jpg",
    alt: "Volunteers in biblical dress in front of a night-sky star backdrop.",
  },
  {
    caption: "The gate into Bethlehem.",
    src: "/images/photos/bethlehem-sign.jpg",
    src720: "/images/photos/bethlehem-sign-720.jpg",
    alt: "A wooden Bethlehem sign and lantern at the entrance, with visitors inside.",
  },
] as const;

// The walk ends here: the animated painting of Mary and Joseph on the road.
/** Hero copy: the sky, a headline, no wordmark. The wordmark follows on the painting. */
export const hero = {
  kicker: "The 3rd annual live nativity · Trophy Club, Texas",
  lead: "Celebrate the birth of",
  emphasis: "Christ",
  tail: "at a free community event.",
  voice: "Four December nights. A town rebuilt by neighbors. A star to follow.",
} as const;

export const walkFinale = {
  title: "Every road ends at the stable.",
  line: "Reserve a showtime, come as you are, and take the walk at your own pace.",
  video: "/video/journey.mp4",
  poster: "/images/brand/journey-poster.webp",
} as const;

export const involveCards = [
  {
    eyebrow: "Adults",
    title: "Volunteer",
    src: "/images/photos/manger-scene.jpg",
    src720: "/images/photos/manger-scene-720.jpg",
    alt: "Cast and a Roman soldier on horseback at the live nativity.",
    body: "Play a villager, sing a carol, tend a stall, or help behind the scenes. Costumes are provided and no experience is needed.",
    href: volunteerAdultUrl,
    action: "Sign up to volunteer",
  },
  {
    eyebrow: "Youth",
    title: "Be a shepherd",
    src: "/images/photos/nativity-126.jpg",
    src720: "/images/photos/nativity-126-720.jpg",
    alt: "Youth in biblical costumes during the nativity performance.",
    body: "Shepherds, angels, and musicians are mostly played by young people. Youth have their own sign-up.",
    href: volunteerYouthUrl,
    action: "Youth sign-up",
  },
  {
    eyebrow: "Neighbors in need",
    title: "Give goods",
    src: "/images/photos/bethlehem-sign.jpg",
    src720: "/images/photos/bethlehem-sign-720.jpg",
    alt: "Visitors arriving through the lantern-lit Bethlehem gate.",
    body: "Bring diapers, food, or toys for local families. Drop them at the marketplace, or shop the Amazon lists from home.",
    href: "/get-involved#give-goods",
    action: "See the drives",
  },
] as const;

export const partners = [
  {
    name: "Faith & Fellowship Foundation",
    href: "https://faithfellowshipfoundation.com/",
    logo: "/images/partners/fff.png",
  },
  {
    name: "Town of Trophy Club",
    href: "https://www.trophyclub.org/739/Welcome",
    logo: "/images/partners/trophy-club.png",
  },
  {
    name: "Fellowship United Methodist Church",
    href: "https://fumctc.com/",
    logo: "/images/partners/fellowship-umc.png",
  },
  {
    name: "JustServe",
    href: "https://www.justserve.org/",
    logo: "/images/partners/justserve.png",
  },
  {
    name: "Catholic Charities Fort Worth",
    href: "https://catholiccharitiesfortworth.org/",
    logo: "/images/partners/catholic-charities.png",
  },
  {
    name: "GRACE",
    href: "https://www.gracegrapevine.org/",
    logo: "/images/partners/grace.png",
  },
  {
    name: "Roanoke Food Pantry",
    href: "https://www.facebook.com/RoanokeFoodPantry/",
    logo: "/images/partners/roanoke-food-pantry.png",
  },
  {
    name: "The Church of Jesus Christ of Latter-day Saints, Alliance & Colleyville Texas Stakes",
    href: "https://lds.org",
    logo: "/images/partners/lds-stakes.png",
  },
] as const;

// Volunteer roles are examples of what the sign-up forms offer; the forms
// themselves are the source of truth for open shifts.
export const volunteerRoles = [
  {
    title: "Cast & characters",
    body: "Villagers, shepherds, wise men, Roman guards. Costumes are provided, and no acting experience is needed.",
  },
  {
    title: "Music",
    body: "Carolers and musicians who give Bethlehem its sound, on stage and along the road.",
  },
  {
    title: "Marketplace & hospitality",
    body: "Tend a stall, welcome guests at the gate, and keep the line moving with a warm word.",
  },
  {
    title: "Behind the scenes",
    body: "Set-up, tear-down, costumes, and the quiet jobs that keep the town running.",
  },
] as const;

// Answers below state only what the site can stand behind today. Where a
// detail isn't published yet, the answer says so and points to email —
// see docs/CONTENT-TODO.md for the facts organizers should confirm.
export const faq = [
  {
    q: "What is Journey Through Bethlehem?",
    a: "A free outdoor live nativity. You walk through a recreated Bethlehem at night: a marketplace with food, crafts, and artisans; carolers; travelers and live animals on the road; and, at the end, a live musical telling of the nativity at the stable. It’s presented by Faith & Fellowship Foundation and put on entirely by volunteers from local churches and the community.",
  },
  {
    q: "Does it really cost nothing?",
    a: "Admission is free. Reserving a showtime just tells us when to welcome you at the gate, so the walk never gets crowded. We never take payment for tickets.",
  },
  {
    q: "Is it outdoors? What if it’s cold?",
    a: "Yes, Bethlehem is outdoors, and December evenings in Texas can be chilly. Dress warmly. If weather forces a change to a showtime, we’ll post it here and reach reservation holders through Ticket Tailor.",
  },
  {
    q: "Is the walk stroller and wheelchair friendly?",
    a: "The route is a walking path, and we want every family to make it to the stable. If anyone in your group uses a wheelchair or stroller, or you have a mobility question, email us and we’ll make sure you’re taken care of.",
  },
  {
    q: "Are there real animals?",
    a: "Yes. Live animals, including a camel, share the road through Bethlehem.",
  },
  {
    q: "What ages is it for?",
    a: "All of them. The walk is gentle and children are very welcome. Many of the villagers you’ll meet are kids themselves.",
  },
  {
    q: "Where do I park?",
    a: "Bethlehem sits at 2509 Trophy Club Drive. Parking directions will be posted here before opening night; if you’re planning a large group, email us and we’ll help.",
  },
  {
    q: "What if my night is full?",
    a: "Showtimes are capped so the walk stays unhurried, and popular nights do fill. If your first choice is gone, try an earlier time the same evening or come another night.",
  },
] as const;

export const inKindDrives = [
  {
    title: "Diapers & wipes",
    org: "Catholic Charities Fort Worth",
    orgHref: "https://catholiccharitiesfortworth.org/",
    amazon: "https://www.amazon.com/hz/wishlist/ls/31IP27JT1C1K3?ref_=wl_share",
    amazonLabel: "Shop the diaper list",
    body: "New, unopened packages of diapers in any size, and baby wipes, so babies in our community stay clean, healthy, and comfortable this winter.",
  },
  {
    title: "Food drive",
    org: "Roanoke Food Pantry",
    orgHref: "https://www.facebook.com/RoanokeFoodPantry/",
    amazon: "https://www.amazon.com/hz/wishlist/ls/2CKJHLD8QC1OY?ref_=wl_share",
    amazonLabel: "Shop the food list",
    body: "Non-perishables for families this Christmas: canned meat, soup, fruit and vegetables, peanut butter and jelly, pasta and sauce, rice, dried beans, cake and pancake mix, instant potatoes.",
  },
  {
    title: "Toy drive",
    org: "GRACE",
    orgHref: "https://www.gracegrapevine.org/",
    amazon: "https://www.amazon.com/hz/wishlist/ls/2J8IT28MGSE9M?ref_=wl_share",
    amazonLabel: "Shop the toy list",
    body: "New, unwrapped toys for ages 5–15: board games, balls, art sets, Play-Doh, markers, action figures, Hot Wheels, Legos, dolls.",
  },
] as const;

export type SiteState = "prelaunch" | "open" | "eventWeek" | "past";

/**
 * The site's single clock. Pages render every state; a tiny inline script
 * stamps `data-state` on <html> so the right variant shows without a rebuild.
 * This mirrors that logic for build-time defaults.
 */
export function siteState(now: Date = new Date()): SiteState {
  const t = now.getTime();
  if (t >= Date.parse(event.eventEndIso)) return "past";
  if (t >= Date.parse(event.eventStartIso)) return "eventWeek";
  if (t >= Date.parse(event.ticketsOpenIso)) return "open";
  return "prelaunch";
}

/** Whole nights remaining before the first night; 0 during/after the event. */
export function nightsUntil(now: Date = new Date()): number {
  const ms = Date.parse(event.eventStartIso) - now.getTime();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}
