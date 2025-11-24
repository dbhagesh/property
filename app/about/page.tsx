import { Metadata } from "next";
import { PAGE_SEO, getOrganizationSchema } from "@/constants/seo";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: PAGE_SEO.about.title,
  description: PAGE_SEO.about.description,
  keywords: PAGE_SEO.about.keywords,
  openGraph: {
    title: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
    type: "website",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const jsonLd = getOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AboutContent />
    </>
  );
}