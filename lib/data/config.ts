import siteSettings from '@/data/config/site-settings.json';
import contactInfo from '@/data/config/contact-info.json';
import aboutContent from '@/data/about/content.json';

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  favicon: string;
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  features: {
    blog: boolean;
    search: boolean;
    contactForm: boolean;
  };
}

export interface ContactInfo {
  primaryPhone: string;
  secondaryPhone?: string;
  primaryEmail: string;
  supportEmail?: string;
  whatsapp: string;
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  hours: {
    [key: string]: string;
  };
  formspreeEndpoint?: string;
}

export interface AboutContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  story: {
    title: string;
    content: string;
    image: string;
  };
  mission: {
    title: string;
    content: string;
    values: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  statistics: Array<{
    label: string;
    value: string;
    icon: string;
  }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

/**
 * Get site settings
 */
export function getSiteSettings(): SiteSettings {
  return siteSettings;
}

/**
 * Get contact information
 */
export function getContactInfo(): ContactInfo {
  return contactInfo;
}

/**
 * Get about page content
 */
export function getAboutContent(): AboutContent {
  return aboutContent;
}

/**
 * Get WhatsApp URL with pre-filled message
 */
export function getWhatsAppUrl(message?: string): string {
  const phone = contactInfo.whatsapp.replace(/[^0-9]/g, '');
  const defaultMessage = message || 'Hi, I would like to inquire about properties in Gurgaon.';
  return `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;
}

/**
 * Get formatted address
 */
export function getFormattedAddress(): string {
  const addr = contactInfo.address;
  return `${addr.street}, ${addr.area}, ${addr.city}, ${addr.state} ${addr.pincode}, ${addr.country}`;
}
