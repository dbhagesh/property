"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  if (!measurementId || process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

// Event tracking helper functions
declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track contact events
export const trackContactEvent = (method: "phone" | "whatsapp" | "email" | "form") => {
  trackEvent("contact_click", "engagement", method);
};

// Track property view
export const trackPropertyView = (propertyName: string, area: string) => {
  trackEvent("property_view", "properties", `${propertyName} - ${area}`);
};

// Track area page view
export const trackAreaPageView = (areaName: string) => {
  trackEvent("area_view", "areas", areaName);
};

// Track form submission
export const trackFormSubmission = (formType: "contact" | "inquiry" | "newsletter") => {
  trackEvent("form_submit", "forms", formType);
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent("cta_click", "engagement", `${ctaName} - ${location}`);
};