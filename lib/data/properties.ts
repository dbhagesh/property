import fs from 'fs';
import path from 'path';
import propertiesIndexData from '@/data/properties/index.json';

interface PropertiesIndex {
  properties: Array<{
    id: string;
    title: string;
    slug: string;
    price: number;
    propertyType: string;
    status: string;
    bedrooms?: number | null;
    bathrooms?: number | null;
    areaSize: number;
    areaSlug: string;
    areaName: string;
    address: string;
    imageUrl: string;
    isFeatured: boolean;
    isActive: boolean;
  }>;
  lastUpdated: string;
}

const propertiesIndex = propertiesIndexData as PropertiesIndex;

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  propertyType: string;
  status: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaSize: number;
  floors?: number | null;
  yearBuilt?: number | null;
  furnishing?: string | null;
  address: string;
  locality?: string | null;
  area: {
    id: string;
    name: string;
    slug: string;
    city: string;
    state: string;
  };
  coordinates?: any;
  features?: string[];
  amenities?: string[];
  nearbyPlaces?: any[];
  images: string[];
  virtualTourUrl?: string | null;
  videoUrl?: string | null;
  floorPlanUrl?: string | null;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  isFeatured: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertySummary {
  id: string;
  title: string;
  slug: string;
  price: number;
  propertyType: string;
  status: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaSize: number;
  areaSlug?: string;  // Keep for backward compatibility
  areaName?: string;  // Keep for backward compatibility
  area: {
    name: string;
    city?: string;
    slug: string;
  };
  address: string;
  imageUrl: string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface PropertyFilters {
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  search?: string;
  areaSlug?: string;
  status?: string;
  limit?: number;
  page?: number;
  sortBy?: 'newest' | 'oldest' | 'priceHigh' | 'priceLow';
}

/**
 * Get all properties (summary)
 */
export function getAllProperties(): PropertySummary[] {
  return propertiesIndex.properties
    .filter(p => p.isActive)
    .map(p => ({
      ...p,
      area: {
        name: p.areaName,
        city: '',  // Not available in summary
        slug: p.areaSlug
      }
    }));
}

/**
 * Get property by slug with full details
 */
export function getPropertyBySlug(slug: string): Property | null {
  const filePath = path.join(process.cwd(), 'data', 'properties', `${slug}.json`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading property ${slug}:`, error);
    return null;
  }
}

/**
 * Get properties with filters
 */
export function getProperties(filters?: PropertyFilters) {
  let properties = getAllProperties();

  // Apply filters
  if (filters?.propertyType) {
    properties = properties.filter(p => p.propertyType === filters.propertyType);
  }

  if (filters?.minPrice !== undefined) {
    properties = properties.filter(p => p.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    properties = properties.filter(p => p.price <= filters.maxPrice!);
  }

  if (filters?.bedrooms !== undefined) {
    properties = properties.filter(p => p.bedrooms === filters.bedrooms);
  }

  if (filters?.bathrooms !== undefined) {
    properties = properties.filter(p => p.bathrooms === filters.bathrooms);
  }

  if (filters?.areaSlug) {
    properties = properties.filter(p => p.areaSlug === filters.areaSlug);
  }

  if (filters?.status) {
    properties = properties.filter(p => p.status === filters.status);
  }

  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    properties = properties.filter(p =>
      p.title.toLowerCase().includes(searchTerm) ||
      p.address.toLowerCase().includes(searchTerm) ||
      p.areaName?.toLowerCase().includes(searchTerm)
    );
  }

  // Sorting
  const sortBy = filters?.sortBy || 'newest';
  properties.sort((a, b) => {
    switch (sortBy) {
      case 'priceHigh':
        return b.price - a.price;
      case 'priceLow':
        return a.price - b.price;
      case 'oldest':
        return a.id.localeCompare(b.id); // Assuming ID is chronological
      case 'newest':
      default:
        return b.id.localeCompare(a.id);
    }
  });

  // Pagination
  const page = filters?.page || 1;
  const limit = filters?.limit || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const total = properties.length;
  const paginatedProperties = properties.slice(startIndex, endIndex);

  return {
    properties: paginatedProperties,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasMore: endIndex < total
  };
}

/**
 * Get featured properties
 */
export function getFeaturedProperties(limit = 6): PropertySummary[] {
  return getAllProperties()
    .filter(p => p.isFeatured)
    .slice(0, limit);
}

/**
 * Get properties by area
 */
export function getPropertiesByArea(areaSlug: string, limit?: number): PropertySummary[] {
  const areaProperties = getAllProperties()
    .filter(p => p.areaSlug === areaSlug);

  return limit ? areaProperties.slice(0, limit) : areaProperties;
}

/**
 * Get similar properties (same area, different property)
 */
export function getSimilarProperties(currentSlug: string, areaSlug: string, limit = 3): PropertySummary[] {
  return getAllProperties()
    .filter(p => p.areaSlug === areaSlug && p.slug !== currentSlug)
    .slice(0, limit);
}

/**
 * Get property count by area
 */
export function getPropertyCountByArea(areaSlug: string): number {
  return getAllProperties().filter(p => p.areaSlug === areaSlug).length;
}
