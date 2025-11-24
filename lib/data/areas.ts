import fs from 'fs';
import path from 'path';
import areasIndex from '@/data/areas/index.json';

export interface Area {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  description: string;
  overview?: string;
  coordinates?: { lat: number; lng: number } | null;
  priceRangeMin?: number;
  priceRangeMax?: number;
  avgPricePerSqFt?: number;
  totalProperties?: number;
  connectivity?: any[];
  amenities?: any[];
  images?: {
    featured: string;
    gallery: string[];
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface AreaSummary {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  description: string;
  imageUrl: string;
  propertyCount: number;
  priceRangeMin?: number;
  priceRangeMax?: number;
  featured: boolean;
}

/**
 * Get all areas (summary)
 */
export function getAllAreas(): AreaSummary[] {
  return areasIndex.areas;
}

/**
 * Get area by slug with full details
 */
export function getAreaBySlug(slug: string): Area | null {
  const filePath = path.join(process.cwd(), 'data', 'areas', `${slug}.json`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading area ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured areas
 */
export function getFeaturedAreas(limit = 6): AreaSummary[] {
  return areasIndex.areas.filter(area => area.featured).slice(0, limit);
}

/**
 * Get areas by city
 */
export function getAreasByCity(city: string): AreaSummary[] {
  return areasIndex.areas.filter(area =>
    area.city.toLowerCase() === city.toLowerCase()
  );
}

/**
 * Search areas by name or city
 */
export function searchAreas(query: string): AreaSummary[] {
  const searchTerm = query.toLowerCase();
  return areasIndex.areas.filter(area =>
    area.name.toLowerCase().includes(searchTerm) ||
    area.city.toLowerCase().includes(searchTerm) ||
    area.description.toLowerCase().includes(searchTerm)
  );
}
