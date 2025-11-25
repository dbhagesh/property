export const CONTACT_INFO = {
  // Company Information
  companyName: "Mahadev Real Estate",
  tagline: "Your Trusted Property Partner in Kharkhoda",

  // Contact Numbers
  primaryPhone: "+91-9253648284",
  secondaryPhone: "+91-7876748284",
  whatsappNumber: "919253648284", // Without + for WhatsApp API

  // Email Addresses
  primaryEmail: "mahadevrealestate99@gmail.com",
  supportEmail: "mahadevrealestate99@gmail.com",
  salesEmail: "mahadevrealestate99@gmail.com",

  // Office Address
  address: {
    line1: "Shop no. 1 - Manodev School",
    line2: "Pipli Kharkhoda, Delhi Road",
    city: "Kharkhoda",
    district: "Sonipat",
    state: "Haryana",
    pincode: "131402",
    country: "India",
    googleMapsUrl: "https://maps.app.goo.gl/Wgm8KbeaEapkdbB26",
    coordinates: {
      latitude: 29.1765,
      longitude: 76.9137
    }
  },

  // Social Media Links
  socialMedia: {
    facebook: "",
    instagram: "https://www.instagram.com/mahadev.realestate_",
    twitter: "",
    linkedin: "",
    youtube: "",
  },

  // Business Hours
  businessHours: {
    weekdays: "9:00 AM - 7:00 PM",
    saturday: "9:00 AM - 7:00 PM",
    sunday: "10:00 AM - 5:00 PM",
    holidays: "Closed on National Holidays"
  },

  // WhatsApp Messages Templates
  whatsappMessages: {
    general: "Hi, I'm interested in properties in Haryana. Please share details.",
    propertyInquiry: (propertyType: string, area: string) =>
      `Hi, I'm interested in ${propertyType} in ${area}. Please share available options.`,
    scheduleVisit: (area: string) =>
      `Hi, I would like to schedule a property visit in ${area}. Please suggest suitable timings.`,
    priceInquiry: (area: string) =>
      `Hi, I need information about property prices in ${area}. Please share current rates.`,
  },

  // Quick Links for Contact
  quickLinks: {
    callPrimary: `tel:+91-9253648284`,
    callSecondary: `tel:+91-7876748284`,
    whatsapp: `https://wa.me/919253648284`,
    email: `mailto:mahadevrealestate99@gmail.com`,
    directions: "https://maps.app.goo.gl/Wgm8KbeaEapkdbB26",
  },

  // Team Members
  team: [
    {
      name: "Arvind",
      designation: "Founder & Property Consultant",
      experience: "10+ years",
      specialization: "Industrial & Commercial Properties",
      image: "/images/team/arvind.webp",
      phone: "+91-9253648284",
      email: "mahadevrealestate99@gmail.com",
    },
    {
      name: "Lokesh",
      designation: "Senior Property Consultant",
      experience: "8+ years",
      specialization: "Residential & Agriculture Land",
      image: "/images/team/lokesh.webp",
      phone: "+91-7876748284",
      email: "mahadevrealestate99@gmail.com",
    },
  ],

  // Company Statistics
  statistics: {
    yearsInBusiness: 10,
    propertiesSold: 500,
    happyCustomers: 450,
    activeListings: 100,
    areasServiced: 4,
    teamMembers: 2,
  },

  // Certifications and Associations
  certifications: [
    {
      name: "RERA Registered",
      registrationNo: "RERA/HR/2020/123",
      validTill: "2026-12-31",
    },
  ],

  // Service Areas
  serviceAreas: [
    "IMT Kharkhoda",
    "Bahadurgarh",
    "Sonipat",
    "Rohtak",
  ],

  // Specializations
  specializations: [
    "IMT Kharkhoda Industrial Plots",
    "Industrial Land",
    "Deen Dayal Jan Awas Yojana Plots",
    "Agriculture Land",
    "Residential Plots",
    "Commercial Properties",
  ],
};

// Helper function to generate WhatsApp URL
export const getWhatsAppUrl = (message?: string): string => {
  const baseUrl = "https://wa.me/";
  const number = CONTACT_INFO.whatsappNumber;

  if (message) {
    return `${baseUrl}${number}?text=${encodeURIComponent(message)}`;
  }

  return `${baseUrl}${number}`;
};

// Helper function to format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Format as +91-XXXXX-XXXXX
  if (cleaned.startsWith("+91")) {
    const number = cleaned.substring(3);
    if (number.length === 10) {
      return `+91-${number.substring(0, 5)}-${number.substring(5)}`;
    }
  }

  return phone;
};

// Helper function to get full address as string
export const getFullAddress = (): string => {
  const { address } = CONTACT_INFO;
  return `${address.line1}, ${address.line2}, ${address.city}, ${address.state} - ${address.pincode}`;
};

// Helper function to get display phone numbers (both primary and secondary)
export const getDisplayPhoneNumbers = (): string => {
  const primary = CONTACT_INFO.primaryPhone.replace("+91-", "");
  const secondary = CONTACT_INFO.secondaryPhone.replace("+91-", "");
  return `${primary}, ${secondary}`;
};
