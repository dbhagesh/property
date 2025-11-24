import { NextRequest, NextResponse } from 'next/server';
import { getPropertyBySlug, getSimilarProperties } from '@/lib/data/properties';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Try to get property by slug (id can be either actual ID or slug)
    const property = getPropertyBySlug(params.id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      );
    }

    // Get similar properties from the same area
    const similarProperties = getSimilarProperties(
      property.slug,
      property.area.slug,
      3
    );

    return NextResponse.json({
      success: true,
      data: property,
      similarProperties,
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}
