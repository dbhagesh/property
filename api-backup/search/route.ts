import { NextRequest, NextResponse } from 'next/server';
import { PROPERTIES } from '@/constants/properties';
import { AREAS } from '@/constants/areas';

interface SearchResult {
  type: 'property' | 'area';
  id: string;
  title: string;
  slug: string;
  description: string;
  price?: number;
  location?: string;
  image?: string;
  relevance: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const type = searchParams.get('type'); // 'property' | 'area' | 'all'
    const limit = searchParams.get('limit');

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Query must be at least 2 characters long',
        data: []
      }, { status: 400 });
    }

    const results: SearchResult[] = [];

    // Search in properties
    if (!type || type === 'all' || type === 'property') {
      PROPERTIES.forEach(property => {
        let relevance = 0;

        // Check title match (highest relevance)
        if (property.title.toLowerCase().includes(query)) {
          relevance += 10;
        }

        // Check area name match
        if (property.areaName.toLowerCase().includes(query)) {
          relevance += 8;
        }

        // Check description match
        if (property.description.toLowerCase().includes(query)) {
          relevance += 5;
        }

        // Check property type match
        if (property.propertyType.toLowerCase().includes(query) ||
            property.subType.toLowerCase().includes(query)) {
          relevance += 6;
        }

        // Check address match
        if (property.address.toLowerCase().includes(query)) {
          relevance += 7;
        }

        // Check features match
        const featureMatch = property.features.some(feature =>
          feature.toLowerCase().includes(query)
        );
        if (featureMatch) {
          relevance += 3;
        }

        // Check amenities match
        const amenityMatch = property.amenities.some(amenity =>
          amenity.toLowerCase().includes(query)
        );
        if (amenityMatch) {
          relevance += 3;
        }

        // Price range search (if query is a number)
        const numQuery = parseInt(query.replace(/[^\d]/g, ''));
        if (!isNaN(numQuery)) {
          const priceInLakhs = property.price / 100000;
          if (Math.abs(priceInLakhs - numQuery) < 10) {
            relevance += 4;
          }
        }

        if (relevance > 0) {
          results.push({
            type: 'property',
            id: property.id,
            title: property.title,
            slug: property.slug,
            description: property.description,
            price: property.price,
            location: `${property.areaName}, ${property.city}`,
            image: property.images[0],
            relevance
          });
        }
      });
    }

    // Search in areas
    if (!type || type === 'all' || type === 'area') {
      AREAS.forEach(area => {
        let relevance = 0;

        // Check area name match (highest relevance)
        if (area.name.toLowerCase().includes(query)) {
          relevance += 10;
        }

        // Check city match
        if (area.city.toLowerCase().includes(query)) {
          relevance += 8;
        }

        // Check description match
        if (area.description.toLowerCase().includes(query)) {
          relevance += 5;
        }

        // Check popularFor match
        const popularMatch = area.popularFor.some(item =>
          item.toLowerCase().includes(query)
        );
        if (popularMatch) {
          relevance += 6;
        }

        // Check nearby landmarks
        const landmarkMatch = area.nearbyLandmarks.some(landmark =>
          landmark.toLowerCase().includes(query)
        );
        if (landmarkMatch) {
          relevance += 4;
        }

        // Check connectivity
        if (area.connectivity.metro) {
          const metroMatch = area.connectivity.metro.some(station =>
            station.toLowerCase().includes(query)
          );
          if (metroMatch) {
            relevance += 5;
          }
        }

        if (area.connectivity.highway) {
          const highwayMatch = area.connectivity.highway.some(highway =>
            highway.toLowerCase().includes(query)
          );
          if (highwayMatch) {
            relevance += 3;
          }
        }

        if (relevance > 0) {
          results.push({
            type: 'area',
            id: area.id,
            title: area.name,
            slug: area.slug,
            description: area.description,
            location: `${area.city}, ${area.state}`,
            image: area.imageUrl,
            relevance
          });
        }
      });
    }

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);

    // Apply limit if specified
    const limitedResults = limit
      ? results.slice(0, parseInt(limit))
      : results;

    // Group results by type
    const groupedResults = {
      properties: limitedResults.filter(r => r.type === 'property'),
      areas: limitedResults.filter(r => r.type === 'area'),
      all: limitedResults
    };

    return NextResponse.json({
      success: true,
      query,
      data: groupedResults,
      meta: {
        total: limitedResults.length,
        properties_count: groupedResults.properties.length,
        areas_count: groupedResults.areas.length
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Search failed'
      },
      { status: 500 }
    );
  }
}