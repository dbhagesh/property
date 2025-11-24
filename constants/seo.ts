export const SEO_CONFIG = {
  siteName: "Mahadev Real Estate",
  siteDescription: "Leading property dealer in Haryana specializing in IMT Kharkhoda, Bahadurgarh, Sonipat, and Rohtak. DDJAY plots, industrial land, and agricultural properties.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mahadevrealestate.com",
  defaultImage: "/images/og-image.jpg",
  twitterHandle: "@mahadevrealestate",

  // Default SEO values
  defaultTitle: "Property Dealer in Haryana | IMT Kharkhoda, DDJAY Plots | Mahadev Real Estate",
  titleTemplate: "%s | Mahadev Real Estate",

  // Open Graph defaults
  openGraph: {
    type: "website",
    locale: "en_IN",
    site_name: "Mahadev Real Estate",
  },

  // Contact Information for structured data
  contact: {
    telephone: "+91-9899570270",
    email: "mahadevrealestate99@gmail.com",
  },

  // Business Hours
  businessHours: {
    monday: "9:00 AM - 8:00 PM",
    tuesday: "9:00 AM - 8:00 PM",
    wednesday: "9:00 AM - 8:00 PM",
    thursday: "9:00 AM - 8:00 PM",
    friday: "9:00 AM - 8:00 PM",
    saturday: "9:00 AM - 8:00 PM",
    sunday: "10:00 AM - 6:00 PM",
  },
};

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: "Property Dealer in Haryana | IMT Kharkhoda, DDJAY Plots",
    description: "Mahadev Real Estate - Trusted property dealer in Haryana specializing in IMT Kharkhoda industrial plots, DDJAY residential plots, agricultural land in Sonipat, Bahadurgarh, and Rohtak. 10+ years experience.",
    keywords: ["property dealer haryana", "IMT kharkhoda plots", "ddjay plots", "industrial land haryana", "bahadurgarh property", "sonipat property", "rohtak property"],
  },
  about: {
    title: "About Us - Leading Property Dealer in Haryana",
    description: "Mahadev Real Estate - Trusted property dealer in Haryana with 10+ years experience. Specializing in IMT Kharkhoda, DDJAY plots, industrial and agricultural land.",
    keywords: ["about mahadev real estate", "real estate company haryana", "property consultants kharkhoda"],
  },
  contact: {
    title: "Contact Us - Property Dealer in Haryana",
    description: "Get in touch with Mahadev Real Estate for all your property needs in Haryana. Office in Kharkhoda. Call +91-9899570270 or WhatsApp +91-7876748284.",
    keywords: ["contact property dealer", "mahadev real estate contact", "real estate office kharkhoda"],
  },
};

// Area page SEO template
export const getAreaPageSEO = (areaName: string, city: string = "Haryana") => ({
  title: `${areaName} Property Dealer | Real Estate in ${areaName}, ${city}`,
  description: `Looking for property in ${areaName}, ${city}? Mahadev Real Estate offers best deals on industrial plots, DDJAY residential plots, agricultural land, and commercial properties.`,
  keywords: [
    `${areaName.toLowerCase()} property dealer`,
    `property in ${areaName.toLowerCase()}`,
    `${areaName.toLowerCase()} real estate`,
    `buy property ${areaName.toLowerCase()}`,
    `${areaName.toLowerCase()} ${city.toLowerCase()} property`,
  ],
});

// JSON-LD Schema Templates
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SEO_CONFIG.siteName,
  description: SEO_CONFIG.siteDescription,
  url: SEO_CONFIG.siteUrl,
  logo: `${SEO_CONFIG.siteUrl}/images/logo.png`,
  image: SEO_CONFIG.defaultImage,
  telephone: SEO_CONFIG.contact.telephone,
  email: SEO_CONFIG.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop no. 1 - Manodev School, Pipli Kharkhoda, Delhi Road",
    addressLocality: "Kharkhoda",
    addressRegion: "Haryana",
    postalCode: "131402",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "29.1765",
    longitude: "76.9137",
  },
  openingHoursSpecification: Object.entries(SEO_CONFIG.businessHours).map(([day, hours]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
    opens: hours.split(" - ")[0],
    closes: hours.split(" - ")[1],
  })),
  priceRange: "₹₹₹",
  areaServed: [
    {
      "@type": "City",
      name: "IMT Kharkhoda",
    },
    {
      "@type": "City",
      name: "Bahadurgarh",
    },
    {
      "@type": "City",
      name: "Sonipat",
    },
    {
      "@type": "City",
      name: "Rohtak",
    },
  ],
});

export const getLocalBusinessSchema = (area: string) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: `Mahadev Real Estate ${area}`,
  description: `Property dealer specializing in ${area} real estate - Industrial plots, DDJAY plots, agricultural land`,
  url: `${SEO_CONFIG.siteUrl}/deals/${area.toLowerCase().replace(/ /g, "-")}`,
  telephone: SEO_CONFIG.contact.telephone,
  areaServed: {
    "@type": "City",
    name: area,
  },
});

export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url.startsWith("http") ? item.url : `${SEO_CONFIG.siteUrl}${item.url}`,
  })),
});