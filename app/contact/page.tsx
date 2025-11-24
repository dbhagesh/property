import { Metadata } from "next";
import { PAGE_SEO, getOrganizationSchema } from "@/constants/seo";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: PAGE_SEO.contact.title,
  description: PAGE_SEO.contact.description,
  keywords: PAGE_SEO.contact.keywords,
  openGraph: {
    title: PAGE_SEO.contact.title,
    description: PAGE_SEO.contact.description,
    type: "website",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const organizationSchema = getOrganizationSchema();

  return (
    <>
      <ContactForm />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  );
}