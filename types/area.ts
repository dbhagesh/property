// Area type matching the database schema
export interface Area {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  description: string;
  overview: string;
  imageUrl: string | null;
  totalProperties: number;
  priceRangeMin: number | null;
  priceRangeMax: number | null;
  avgPricePerSqFt: number | null;
  connectivity: any; // JSON field
  amenities: any; // JSON field
  viewCount: number;
  inquiryCount: number;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
  properties?: Property[];
  faqs?: AreaFAQ[];
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  price: any; // Prisma Decimal type
  propertyType: string;
  status: string;
  areaSize: number;
  bedrooms: number | null;
  bathrooms: number | null;
  images: string[];
  isFeatured: boolean;
}

export interface AreaFAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

// For backward compatibility with components expecting the old format
export interface LegacyArea {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  description: string;
  overview?: string;
  imageUrl: string;
  propertyCount: number;
  startingPrice: string;
  priceRangeMax?: string;
  avgPricePerSqFt?: number;
  popularFor: string[];
  nearbyLandmarks: string[];
  connectivity: {
    metro?: string[];
    highway?: string[];
    airport?: { name: string; distance: string };
    distances?: Array<{ name: string; distance: string }>;
  };
  amenities?: any;
  highlights?: string[];
}

// Helper function to convert Area to LegacyArea format (now accepts both old and new formats)
export function convertToLegacyArea(area: any): LegacyArea {
  // Parse connectivity and amenities from JSON if they're strings
  let connectivity: any = typeof area.connectivity === 'string'
    ? JSON.parse(area.connectivity)
    : (area.connectivity || {});

  let amenities: any = typeof area.amenities === 'string'
    ? JSON.parse(area.amenities)
    : (area.amenities || {});

  // Handle connectivity if it's an array (new format from admin)
  let connectivityObj: any = {};
  if (Array.isArray(connectivity)) {
    // New format: array of {name, distance, time, type}
    connectivityObj = {
      metro: connectivity.filter((c: any) => c.type === 'metro' || c.name?.toLowerCase().includes('metro')),
      highway: connectivity.filter((c: any) => c.type === 'highway' || c.name?.toLowerCase().includes('highway') || c.name?.toLowerCase().includes('road')),
      airport: connectivity.find((c: any) => c.type === 'airport' || c.name?.toLowerCase().includes('airport')),
      landmarks: connectivity.filter((c: any) => !c.type || c.type === 'landmark').map((c: any) => c.name),
      distances: connectivity.map((c: any) => ({ name: c.name, distance: c.distance }))
    };
  } else {
    // Old format: object with metro, highway, airport arrays
    connectivityObj = connectivity;
  }

  // Handle amenities if it's an array (from admin)
  let amenitiesData: any = amenities;
  if (Array.isArray(amenities)) {
    // amenities is array of {category, items}
    amenitiesData = amenities;
  }

  // Extract popular property types - check top-level first, then amenities
  const popularFor = area.popularFor
    || amenitiesData.popularFor
    || (Array.isArray(amenitiesData) ? amenitiesData.flatMap((a: any) => a.items).slice(0, 3) : null)
    || ['Residential', 'Commercial'];

  const nearbyLandmarks = area.nearbyLandmarks
    || connectivityObj.landmarks
    || [];
  const highlights = area.highlights
    || amenitiesData.highlights
    || connectivityObj.highlights
    || [];

  return {
    id: area.id,
    name: area.name,
    slug: area.slug,
    city: area.city,
    state: area.state,
    description: area.description || area.overview || `Properties in ${area.name}`,
    overview: area.overview,
    imageUrl: area.imageUrl || area.images?.featured || '/images/areas/default.jpg',
    propertyCount: area.totalProperties || 0,
    startingPrice: area.priceRangeMin
      ? `₹${(area.priceRangeMin / 100000).toFixed(0)} Lakhs`
      : 'Contact for Price',
    priceRangeMax: area.priceRangeMax
      ? `₹${(area.priceRangeMax / 100000).toFixed(0)} Lakhs`
      : undefined,
    avgPricePerSqFt: area.avgPricePerSqFt || undefined,
    popularFor: Array.isArray(popularFor) ? popularFor : ['Residential', 'Commercial'],
    nearbyLandmarks: Array.isArray(nearbyLandmarks) ? nearbyLandmarks : [],
    highlights: Array.isArray(highlights) ? highlights : [],
    amenities: amenitiesData,
    connectivity: {
      metro: Array.isArray(connectivityObj.metro) ? connectivityObj.metro.map((m: any) => typeof m === 'string' ? m : m.name) : [],
      highway: Array.isArray(connectivityObj.highway) ? connectivityObj.highway.map((h: any) => typeof h === 'string' ? h : h.name) : [],
      airport: connectivityObj.airport || { name: 'IGI Airport', distance: 'N/A' },
      distances: connectivityObj.distances || []
    }
  };
}