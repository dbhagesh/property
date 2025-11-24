import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProperties, getPropertyBySlug, getSimilarProperties } from "@/lib/data/properties";
import PropertyDetailClient from "./PropertyDetailClient";

interface PropertyPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all properties
export async function generateStaticParams() {
  try {
    const properties = getAllProperties();
    return properties
      .filter(p => p.isActive)
      .map((property) => ({
        slug: property.slug,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for each property
export function generateMetadata({ params }: PropertyPageProps): Metadata {
  try {
    const property = getPropertyBySlug(params.slug);

    if (!property) {
      return {
        title: "Property Not Found",
        description: "The requested property could not be found.",
      };
    }

    const priceFormatted = `₹${(property.price / 100000).toFixed(2)} Lakhs`;

    return {
      title: property.seo?.metaTitle || `${property.title} - ${priceFormatted} | Mahadev Real Estate`,
      description: property.seo?.metaDescription || property.description.substring(0, 160),
      keywords: property.seo?.keywords?.join(', '),
      openGraph: {
        title: property.seo?.metaTitle || property.title,
        description: property.seo?.metaDescription || property.description,
        images: property.images.length > 0 ? [property.images[0]] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: property.seo?.metaTitle || property.title,
        description: property.seo?.metaDescription || property.description,
        images: property.images.length > 0 ? [property.images[0]] : [],
      },
    };
  } catch (error) {
    return {
      title: "Property Details",
      description: "View property details",
    };
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  try {
    const property = getPropertyBySlug(params.slug);

    if (!property) {
      notFound();
    }

    // Get similar properties from the same area
    const similarProperties = getSimilarProperties(property.slug, property.area.slug, 3);

    return <PropertyDetailClient property={property} similarProperties={similarProperties} />;
  } catch (error) {
    console.error('Error fetching property:', error);
    notFound();
  }
}
