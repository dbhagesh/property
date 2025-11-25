import { Metadata } from "next";
import { Suspense } from "react";
import PropertiesClient from "./PropertiesClient";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Haryana | Mahadev Real Estate",
  description: "Browse our extensive collection of properties for sale and rent in Haryana. Find your dream home, commercial space, or investment property.",
  keywords: ["properties gurgaon", "real estate gurgaon", "houses for sale", "apartments for rent"],
};

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading properties...</div>}>
      <PropertiesClient />
    </Suspense>
  );
}
