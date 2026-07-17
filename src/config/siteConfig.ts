// Site-wide configuration
// Update this file to change contact info, business details, etc. across the entire site

export const siteConfig = {
  // Business Information
  business: {
    name: "Brit's Brothers Gym",
    tagline: "Where Champions Are Made",
    foundedYear: 1994,
  },

  // Contact Information
  contact: {
    phone: {
      main: "(864) 553-3821",
      mainRaw: "1-864-553-3821",
    },
    email: "britsbrothersgym@gmail.com",
    address: {
      street: "301 Airport Rd, Suite K",
      building: '"The Junction"',
      city: "Greenville",
      state: "SC",
      zip: "29601",
      full: "301 Airport Rd, Suite K, Greenville, SC 29601",
    },
  },

  // Business Hours
  hours: {
    personalTraining: {
      mondayThursday: "6am - 8pm",
      friday: "6am - 7pm",
      saturday: "8am - 12pm",
      sunday: "Closed",
    },
    openGym: {
      description: "Unrestricted Access",
      schedule: "Sunday - Saturday",
      hours: "5am - 12am",
    },
  },

  // Social Media & External Links
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
  },

  // Map & Directions
  maps: {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.9999999999995!2d-82.355276!3d34.8454664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbf4718581adc0d17!2sBrit's%20Brothers%20Gym!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus",
    directionsUrl: "https://www.google.com/maps/place/Brit's+Brothers+Gym/@34.8454664,-82.355276,15z/data=!4m5!3m4!1s0x0:0xbf4718581adc0d17!8m2!3d34.8454664!4d-82.355276",
  },

  // Payment Links
  payments: {
    membership: {
      openGym: "https://websales.webfdm.com/websales/sign/britsbrothersgym/b136",
      ptAddOn: "https://websales.webfdm.com/websales/sign/britsbrothersgym/b136",
    },
    dayPass: "https://app.moonclerk.com/pay/1wx71ob86e56",
    personalTraining: {
      singleSession: "https://app.moonclerk.com/pay/2jge8a1mwx9k",
      onePerWeek: "https://app.moonclerk.com/pay/72rdik6itc67",
      twoPerWeek: "https://app.moonclerk.com/pay/3vvvywkne9pc",
      unlimited: "https://app.moonclerk.com/pay/b7wfk023l",
      sixWeekChallenge: "https://app.moonclerk.com/pay/3avt9i7laad5",
      sixWeekPaymentPlan: "https://app.moonclerk.com/pay/190ig8ay7e44",
    },
    studentProgram: "https://app.moonclerk.com/pay/jgowzl1n5jy",
  },

  // SEO & Meta (for Phase 5)
  seo: {
    title: "Brit's Brothers Gym - Personal Training in Greenville, SC",
    description: "Greenville's premier personal training gym. Expert trainers, state-of-the-art equipment, and proven results since 1994.",
    keywords: "personal training, gym, fitness, Greenville SC, powerlifting, strength training",
    /** No trailing slash. Used for canonical/OG in prerendered HTML; override with VITE_SITE_ORIGIN on Vercel if needed. */
    publicSiteUrl: "https://www.britsbrothersgym.com",
    /** Served from /public — must exist at build time (no 404). */
    defaultOgImage: "/images/og-home.jpg",
  },
} as const;

/** Street + city/state/ZIP for NAP blocks (Contact, Footer, Location). */
export function formatAddressLines(includeBuilding = false): string[] {
  const { street, building, city, state, zip } = siteConfig.contact.address;
  const lines = [street];
  if (includeBuilding && building) {
    lines.push(building);
  }
  lines.push(`${city}, ${state} ${zip}`);
  return lines;
}

/** Public origin for absolute canonical, og:url, and JSON-LD (avoids 127.0.0.1 during prerender). */
export function getPublicSiteOrigin(): string {
  const env = import.meta.env.VITE_SITE_ORIGIN;
  if (typeof env === "string" && env.trim().length > 0) {
    return env.trim().replace(/\/$/, "");
  }
  const u = siteConfig.seo.publicSiteUrl;
  if (typeof u === "string" && u.trim().length > 0) {
    return u.trim().replace(/\/$/, "");
  }
  return "";
}
