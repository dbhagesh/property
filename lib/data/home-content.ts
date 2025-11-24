import homeContent from '@/data/config/home-content.json';

export interface HeroContent {
  badge: string;
  title: {
    line1: string;
    highlighted: string;
    line2: string;
    highlightedCity: string;
  };
  description: string;
  searchPlaceholder: string;
  searchButton: string;
  ctaButtons: {
    whatsapp: string;
    call: string;
  };
  propertyShowcase: Array<{
    title: string;
    startingPrice?: string;
    subtitle?: string;
    image: string;
  }>;
  newListingCard: {
    title: string;
    subtitle: string;
  };
}

export interface WhyChooseUsContent {
  badge: string;
  title: string;
  titleHighlighted: string;
  titleSuffix: string;
  description: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
    color: string;
  }>;
  ctaButton: string;
  achievements: Array<{
    label: string;
    number?: string;
    suffix: string;
  }>;
  image: string;
}

export interface ServicesContent {
  badge: string;
  title: string;
  titleHighlighted: string;
  description: string;
  serviceList: Array<{
    icon: string;
    title: string;
    description: string;
    link: string;
  }>;
}

export interface TestimonialsContent {
  badge: string;
  title: string;
  titleHighlighted: string;
  description: string;
}

export interface FeaturedAreasContent {
  badge: string;
  title: string;
  titleHighlighted: string;
  description: string;
  viewAllButton: string;
}

export interface FeaturedPropertiesContent {
  badge: string;
  title: string;
  titleHighlighted: string;
  description: string;
  viewAllButton: string;
}

export interface CTAContent {
  badge: string;
  title: string;
  titleHighlighted: string;
  titleSuffix: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

export interface HomeContent {
  hero: HeroContent;
  whyChooseUs: WhyChooseUsContent;
  services: ServicesContent;
  testimonials: TestimonialsContent;
  featuredAreas: FeaturedAreasContent;
  featuredProperties: FeaturedPropertiesContent;
  cta: CTAContent;
}

/**
 * Get home page content
 */
export function getHomeContent(): HomeContent {
  return homeContent as HomeContent;
}

/**
 * Get hero section content
 */
export function getHeroContent(): HeroContent {
  return homeContent.hero as HeroContent;
}

/**
 * Get why choose us section content
 */
export function getWhyChooseUsContent(): WhyChooseUsContent {
  return homeContent.whyChooseUs as WhyChooseUsContent;
}

/**
 * Get services section content
 */
export function getServicesContent(): ServicesContent {
  return homeContent.services as ServicesContent;
}

/**
 * Get testimonials section content
 */
export function getTestimonialsContent(): TestimonialsContent {
  return homeContent.testimonials as TestimonialsContent;
}

/**
 * Get featured areas section content
 */
export function getFeaturedAreasContent(): FeaturedAreasContent {
  return homeContent.featuredAreas as FeaturedAreasContent;
}

/**
 * Get featured properties section content
 */
export function getFeaturedPropertiesContent(): FeaturedPropertiesContent {
  return homeContent.featuredProperties as FeaturedPropertiesContent;
}

/**
 * Get CTA section content
 */
export function getCTAContent(): CTAContent {
  return homeContent.cta as CTAContent;
}
