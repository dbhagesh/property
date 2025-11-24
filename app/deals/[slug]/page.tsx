import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAreaPageSEO, getBreadcrumbSchema, getLocalBusinessSchema } from "@/constants/seo";
import { getAreaBySlug as getAreaData, getAllAreas } from "@/lib/data/areas";
import { getPropertiesByArea } from "@/lib/data/properties";
import { convertToLegacyArea } from "@/types/area";
import { AreaHero } from "@/components/sections/area/AreaHero";
import { AreaOverview } from "@/components/sections/area/AreaOverview";
import { PropertyMarketAnalysis } from "@/components/sections/area/PropertyMarketAnalysis";
import { Connectivity } from "@/components/sections/area/Connectivity";
import { Amenities } from "@/components/sections/area/Amenities";
import { InvestmentGuide } from "@/components/sections/area/InvestmentGuide";
import { AreaFAQ } from "@/components/sections/area/AreaFAQ";
import { AreaContactForm } from "@/components/sections/area/AreaContactForm";
import { RelatedAreas } from "@/components/sections/area/RelatedAreas";

interface AreaPageProps {
  params: {
    slug: string;
  };
}

// Helper function to get area by slug from JSON data
function getAreaBySlug(slug: string) {
  try {
    const area = getAreaData(slug);
    if (!area) return null;

    // Get properties for this area
    const properties = getPropertiesByArea(slug, 10);

    // Combine area with properties
    return {
      ...area,
      properties,
      faqs: [],
    };
  } catch (error) {
    console.error('Error fetching area:', error);
    return null;
  }
}

// Generate static params for all areas
export function generateStaticParams() {
  try {
    const areas = getAllAreas();
    return areas.map((area) => ({
      slug: area.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Fallback to empty array if data is not available
    return [];
  }
}

// Generate metadata for each area page
export function generateMetadata({ params }: AreaPageProps): Metadata {
  const area = getAreaBySlug(params.slug);

  if (!area) {
    return {
      title: "Area Not Found",
      description: "The requested area could not be found.",
    };
  }

  const seo = getAreaPageSEO(area.name, area.city);
  const metaTitle = area.seo?.metaTitle || seo.title;
  const metaDescription = area.seo?.metaDescription || seo.description;
  const metaKeywords = area.seo?.keywords || seo.keywords;
  const featuredImage = area.images?.featured || '/images/areas/default.jpg';

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [featuredImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [featuredImage],
    },
    alternates: {
      canonical: `/deals/${area.slug}`,
    },
  };
}

export default function AreaPage({ params }: AreaPageProps) {
  const areaData = getAreaBySlug(params.slug);

  if (!areaData) {
    notFound();
  }

  // Convert for legacy components
  const area = convertToLegacyArea(areaData);

  // Breadcrumb items for schema
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Properties", url: "/deals" },
    { name: area.name, url: `/deals/${area.slug}` },
  ];

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema(breadcrumbItems),
      getLocalBusinessSchema(area.name),
      {
        "@type": "WebPage",
        name: `${area.name} Property Dealer`,
        description: `Find the best properties in ${area.name}, ${area.city}. Explore residential and commercial options with expert guidance.`,
        url: `https://mahadevrealestate.com/deals/${area.slug}`,
        isPartOf: {
          "@type": "WebSite",
          name: "Mahadev Real Estate",
          url: "https://mahadevrealestate.com",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AreaHero area={area} />

      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-secondary-600 mb-8">
            <a href="/" className="hover:text-primary-600 transition-colors">
              Home
            </a>
            <span>/</span>
            <a href="/deals" className="hover:text-primary-600 transition-colors">
              Properties
            </a>
            <span>/</span>
            <span className="text-secondary-900 font-medium">{area.name}</span>
          </nav>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-12">
              <AreaOverview area={area} />
              <PropertyMarketAnalysis area={area} />
              <Connectivity area={area} />
              <Amenities area={area} />
              <InvestmentGuide area={area} />
              <AreaFAQ area={area} />
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <AreaContactForm area={area} />

                {/* Quick Stats Card */}
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="font-bold text-lg text-secondary-900 mb-4">
                    Quick Facts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Properties</span>
                      <span className="font-semibold text-secondary-900">
                        {areaData.totalProperties}+
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Price Range</span>
                      <span className="font-semibold text-primary-600">
                        ₹{areaData.priceRangeMin ? (areaData.priceRangeMin / 100000).toFixed(0) : '0'}L - ₹{areaData.priceRangeMax ? (areaData.priceRangeMax / 100000).toFixed(0) : '0'}L
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Avg Price/Sq Ft</span>
                      <span className="font-semibold text-secondary-900">
                        ₹{areaData.avgPricePerSqFt || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Download Brochure */}
                <button className="w-full bg-white border-2 border-primary-600 text-primary-600 font-semibold py-3 px-4 rounded-lg hover:bg-primary-50 transition-colors">
                  📥 Download Area Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedAreas currentArea={area} />
    </>
  );
}