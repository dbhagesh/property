export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  areaId: string;
  areaName: string;
  areaSlug: string;
  propertyType: 'residential' | 'commercial';
  subType: string;
  status: 'available' | 'sold' | 'under_offer';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  areaUnit: 'sqft' | 'sqm' | 'sqyd';
  furnished: 'unfurnished' | 'semi-furnished' | 'fully-furnished';
  floor?: number;
  totalFloors?: number;
  facing?: string;
  parking?: number;
  features: string[];
  images: string[];
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  amenities: string[];
  nearbyPlaces: {
    name: string;
    distance: string;
    type: string;
  }[];
  postedDate: string;
  updatedDate: string;
  views: number;
  enquiries: number;
  isFeatured: boolean;
  isVerified: boolean;
}

// Sample properties - in production, properties are loaded from JSON files in /data/properties/
// This constant is kept for backward compatibility with components that may import it
export const PROPERTIES: Property[] = [];

// Helper functions for property operations
export const getPropertyBySlug = (slug: string): Property | undefined => {
  return PROPERTIES.find(property => property.slug === slug);
};

export const getPropertiesByArea = (areaSlug: string): Property[] => {
  return PROPERTIES.filter(property => property.areaSlug === areaSlug);
};

export const getPropertiesByType = (type: 'residential' | 'commercial'): Property[] => {
  return PROPERTIES.filter(property => property.propertyType === type);
};

export const getFeaturedProperties = (): Property[] => {
  return PROPERTIES.filter(property => property.isFeatured);
};

export const getAvailableProperties = (): Property[] => {
  return PROPERTIES.filter(property => property.status === 'available');
};

export const searchProperties = (query: {
  area?: string;
  type?: 'residential' | 'commercial';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  furnished?: string;
}): Property[] => {
  let results = [...PROPERTIES];

  if (query.area) {
    const areaQuery = query.area;
    results = results.filter(p =>
      p.areaSlug === areaQuery ||
      p.areaName.toLowerCase().includes(areaQuery.toLowerCase())
    );
  }

  if (query.type) {
    results = results.filter(p => p.propertyType === query.type);
  }

  if (query.minPrice) {
    results = results.filter(p => p.price >= query.minPrice!);
  }

  if (query.maxPrice) {
    results = results.filter(p => p.price <= query.maxPrice!);
  }

  if (query.bedrooms) {
    results = results.filter(p => p.bedrooms === query.bedrooms);
  }

  if (query.furnished) {
    results = results.filter(p => p.furnished === query.furnished);
  }

  return results;
};
