/**
 * Centralized Branding Configuration for the Website
 *
 * All website names, taglines, and branding text should be managed here.
 * Change these values once, and they'll update throughout the entire site.
 */

export const BRANDING = {
  // Main company name
  name: "Mahadev Realtors",

  // Short name for compact spaces
  shortName: "Mahadev",

  // Tagline/Slogan
  tagline: "Your Trusted Property Partner",

  // Alternative taglines you can use
  alternativeTaglines: {
    professional: "Professional Real Estate Solutions",
    trusted: "Building Trust, Delivering Dreams",
    haryana: "Haryana's Leading Property Dealer",
    premium: "Your Gateway to Premium Properties",
  },

  // Full company description
  description: "Mahadev Realtors is a leading property dealer in Haryana, specializing in residential and commercial properties across prime locations including IMT Kharkhoda, Bahadurgarh, Sonipat, and Rohtak.",

  // Founder/Owner name
  founder: "Mahadev",

  // Established year
  establishedYear: "2020",

  // Logo alt text
  logoAlt: "Mahadev Realtors Logo",

  // Social media handles
  socialHandles: {
    facebook: "@mahadevrealtors",
    instagram: "@mahadevrealtors",
    twitter: "@mahadevrealtors",
  },

  // Legal entity name (for terms, privacy policy)
  legalName: "Mahadev Realtors",

  // Website title format
  titleFormat: (pageTitle?: string) =>
    pageTitle ? `${pageTitle} | Mahadev Realtors` : "Mahadev Realtors - Your Trusted Property Partner",
};

// Export individual items for convenience
export const SITE_NAME = BRANDING.name;
export const SITE_TAGLINE = BRANDING.tagline;
export const SITE_DESCRIPTION = BRANDING.description;
export const LOGO_ALT = BRANDING.logoAlt;
