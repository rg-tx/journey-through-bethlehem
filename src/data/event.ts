export const event = {
  name: "Journey Through Bethlehem",
  shortName: "Journey through Bethlehem",
  presentedBy: "Faith & Fellowship Foundation",
  year: 2026,
  annual: "3rd annual",
  datesLabel: "December 3–6, 2026",
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
  // Midnight Nov 1 in Chicago is still CDT (UTC-05:00); DST ends later that morning.
  ticketsOpenIso: "2026-11-01T00:00:00-05:00",
  // First showtime is 6:00 PM CST Dec 3; the last walk leaves 9:00 PM CST Dec 6.
  eventStartIso: "2026-12-03T18:00:00-06:00",
  eventEndIso: "2026-12-06T22:00:00-06:00",
  accommodations:
    "American Sign Language is offered at Friday’s 7:00 p.m. showtime and at every Saturday and Sunday showtime. Spanish translation is offered every night. Choose the accommodation you need when you reserve.",
  showtimes: [
    {
      date: "Thursday, December 3",
      weekday: "Thursday",
      times: ["6:00", "7:00", "8:00", "9:00"],
    },
    {
      date: "Friday, December 4",
      weekday: "Friday",
      times: ["6:00", "7:00", "8:00", "9:00"],
    },
    {
      date: "Saturday, December 5",
      weekday: "Saturday",
      times: ["5:00", "6:00", "7:00", "8:00", "9:00"],
    },
    {
      date: "Sunday, December 6",
      weekday: "Sunday",
      times: ["5:00", "6:00", "7:00", "8:00", "9:00"],
    },
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

// One sentence each — spoken like a guide, not a caption.
export const walkStations = [
  {
    title: "The marketplace",
    line: "Barter with bakers and artisans in the lantern-lit stalls of old Bethlehem.",
    src: "/images/photos/marketplace.jpg",
    src720: "/images/photos/marketplace-720.jpg",
    alt: "A volunteer at a marketplace stall with baskets of bread.",
  },
  {
    title: "The choir",
    line: "You’ll hear the carols before you see the singers.",
    src: "/images/photos/choir.jpg",
    src720: "/images/photos/choir-720.jpg",
    alt: "Women and girls in white and gold robes singing at the nativity.",
  },
  {
    title: "The road",
    line: "Travelers and their camel share the road to the census.",
    src: "/images/photos/camel.jpg",
    src720: "/images/photos/camel-720.jpg",
    alt: "A camel in period trappings on the road to the nativity.",
  },
  {
    title: "The shepherds",
    line: "In the fields, shepherds point to a star that wasn’t there yesterday.",
    src: "/images/photos/shepherds.jpg",
    src720: "/images/photos/shepherds-720.jpg",
    alt: "Volunteers in biblical dress in front of a night-sky star backdrop.",
  },
] as const;

// The last station breaks the pattern: the painting, and the only CTA.
export const walkFinale = {
  title: "The stable",
  line: "Every road through Bethlehem ends here.",
  src: "/images/brand/nativity-scene-2.webp",
  src768: "/images/brand/nativity-scene-2-768.webp",
  alt: "A painterly nativity of Mary, Joseph, and the child at the stable.",
} as const;

export const involveCards = [
  {
    title: "Volunteer",
    src: "/images/photos/manger-scene.jpg",
    src720: "/images/photos/manger-scene-720.jpg",
    alt: "Cast and a Roman soldier on horseback at the live nativity.",
    body: "Play a villager, sing a carol, or help behind the scenes. No experience needed — pick a night and a role on the sign-up form.",
    href: volunteerAdultUrl,
    action: "Sign up to volunteer",
  },
  {
    title: "Youth",
    src: "/images/photos/nativity-126.jpg",
    src720: "/images/photos/nativity-126-720.jpg",
    alt: "Youth in biblical costumes during the nativity performance.",
    body: "Young people carry much of Bethlehem — shepherds, angels, musicians. Youth have their own sign-up.",
    href: volunteerYouthUrl,
    action: "Youth sign-up",
  },
  {
    title: "Give goods",
    src: "/images/photos/artisans.jpg",
    src720: "/images/photos/artisans-720.jpg",
    alt: "Volunteers in period clothing inside a decorated marketplace room.",
    body: "Bring diapers, food, or toys for neighbors in need — drop them off at the nativity, or shop the Amazon lists from home.",
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
    body: "Villagers, shepherds, wise men, Roman guards — costumes are provided, and no acting experience is needed.",
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
    body: "Set-up, tear-down, costumes, and the hundred quiet jobs that make the town run.",
  },
] as const;

// Answers below state only what the site can stand behind today. Where a
// detail isn't published yet, the answer says so and points to email —
// see docs/CONTENT-TODO.md for the facts organizers should confirm.
export const faq = [
  {
    q: "What is Journey Through Bethlehem?",
    a: "A free, outdoor live nativity — you walk through a recreated Bethlehem at night, past the marketplace, the choir, travelers and their animals, ending at the stable. It’s presented by Faith & Fellowship Foundation and put on entirely by volunteers from local churches and the community.",
  },
  {
    q: "Does it really cost nothing?",
    a: "Admission is free. Reserving a showtime just tells us when to welcome you at the gate, so the walk never gets crowded. We never take payment for tickets.",
  },
  {
    q: "Is it outdoors? What if it’s cold?",
    a: "Yes — Bethlehem is outdoors and December evenings in Texas can be chilly, so dress warmly. If weather forces a change to a showtime, we’ll post it here and reach reservation holders through Ticket Tailor.",
  },
  {
    q: "Is the walk stroller and wheelchair friendly?",
    a: "The route is a walking path, and we want every family to make it to the stable. If anyone in your group uses a wheelchair or stroller, or you have a mobility question, email us and we’ll make sure you’re taken care of.",
  },
  {
    q: "Are there real animals?",
    a: "Yes — live animals, including a camel, share the road through Bethlehem.",
  },
  {
    q: "What ages is it for?",
    a: "All of them. The walk is gentle, the story is familiar, and children are very welcome — many of the villagers you’ll meet are kids themselves.",
  },
  {
    q: "Where do I park?",
    a: "Bethlehem sits at 2509 Trophy Club Drive. Parking directions will be posted here before opening night; if you’re planning a large group, email us and we’ll help.",
  },
  {
    q: "What if my night is full?",
    a: "Showtimes are capped so the walk stays unhurried, and popular nights do fill. If your first choice is gone, try an earlier showtime the same evening — or another night; the town is the same warm place all four nights.",
  },
] as const;

export const inKindDrives = [
  {
    title: "Diapers & wipes",
    org: "Catholic Charities Fort Worth",
    orgHref: "https://catholiccharitiesfortworth.org/",
    amazon: "https://www.amazon.com/hz/wishlist/ls/31IP27JT1C1K3?ref_=wl_share",
    amazonLabel: "Diapers & Wipes Amazon List",
    body: "Help families in need by donating diapers and wipes. Please bring new, unopened packages of diapers (all sizes welcome) and baby wipes. Your thoughtful donation ensures that babies and young children in our community have the essentials they need to stay clean, healthy, and comfortable this holiday season.",
  },
  {
    title: "Food drive",
    org: "Roanoke Food Pantry",
    orgHref: "https://www.facebook.com/RoanokeFoodPantry/",
    amazon: "https://www.amazon.com/hz/wishlist/ls/2CKJHLD8QC1OY?ref_=wl_share",
    amazonLabel: "Food Drive Amazon List",
    body: "Donate any non-perishable food items for families in need this Christmas. Possibilities include canned meat, canned soup, canned fruits or vegetables, canned milk, peanut butter, jelly, boxed pasta, pasta sauce, dried beans, rice, cake mix, pancake mix, syrup, instant potatoes, box jello, ramen noodles, and more.",
  },
  {
    title: "Toy drive",
    org: "GRACE",
    orgHref: "https://www.gracegrapevine.org/",
    amazon: "https://www.amazon.com/hz/wishlist/ls/2J8IT28MGSE9M?ref_=wl_share",
    amazonLabel: "Toy Drive Amazon List",
    body: "Donate a toy for a child who would otherwise not receive one. Please bring new, unwrapped toys appropriate for ages 5–15. Examples include board games, soccer balls, footballs, kickballs, arts and crafts sets, Play-Doh kits, markers and crayon sets, action figures, Hot Wheels sets, Legos, Barbies, and baby dolls.",
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
