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
  ticketsOpenIso: "2026-11-01T00:00:00-06:00",
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

export const volunteerAdultUrl =
  "https://m.signupgenius.com/#!/showSignUp/10C0A49A9AE2DA3F9C16-59033479-volunteer";
export const volunteerYouthUrl =
  "https://m.signupgenius.com/#!/showSignUp/10C0A49A9AE2DA3F9C16-59556125-youth";
export const foodDriveUrl =
  "https://m.signupgenius.com/#!/showSignUp/10C0A49A9AE2DA3F9C16-59054454-food";

export const walkStations = [
  {
    title: "Marketplace",
    src: "/images/photos/marketplace.jpg",
    alt: "A volunteer at a marketplace stall with baskets of bread.",
  },
  {
    title: "Choir",
    src: "/images/photos/choir.jpg",
    alt: "Women and girls in white and gold robes singing at the nativity.",
  },
  {
    title: "The road",
    src: "/images/photos/camel.jpg",
    alt: "A camel in period trappings on the road to the nativity.",
  },
  {
    title: "The stable",
    src: "/images/brand/nativity-scene-2.png",
    alt: "A painterly nativity of Mary, Joseph, and the child at the stable.",
  },
  {
    title: "The star",
    src: "/images/photos/shepherds.jpg",
    alt: "Volunteers in biblical dress in front of a night-sky star backdrop.",
  },
] as const;

export const involveRows = [
  {
    title: "Volunteer",
    src: "/images/photos/manger-scene.jpg",
    alt: "Cast and a Roman soldier on horseback at the live nativity.",
    body: "Join us and help make this year’s live nativity unforgettable with your own talents. Adults sign up through the live form.",
    href: volunteerAdultUrl,
    action: "Sign up to volunteer",
  },
  {
    title: "Youth",
    src: "/images/photos/nativity-126.jpg",
    alt: "Youth in biblical costumes during the nativity performance.",
    body: "Youth sign up through the live form.",
    href: volunteerYouthUrl,
    action: "Youth sign-up",
  },
  {
    title: "Give goods",
    src: "/images/photos/artisans.jpg",
    alt: "Volunteers in period clothing inside a decorated marketplace room.",
    body: "Bring diapers, food, or toys to the nativity, or shop the Amazon lists. The food drive sign-up is live. Stripe gifts for the production are not open yet.",
    href: foodDriveUrl,
    action: "Food drive sign-up",
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

export const volunteerLinks = [
  {
    label: "Volunteer sign-up",
    href: "https://m.signupgenius.com/#!/showSignUp/10C0A49A9AE2DA3F9C16-59033479-volunteer",
  },
  {
    label: "Youth volunteers",
    href: "https://m.signupgenius.com/#!/showSignUp/10C0A49A9AE2DA3F9C16-59556125-youth",
  },
  {
    label: "Donations",
    href: "https://m.signupgenius.com/#!/showSignUp/10C0A49A9AE2DA3F9C16-59054454-food",
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
