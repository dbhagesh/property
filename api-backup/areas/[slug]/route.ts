import { NextRequest, NextResponse } from 'next/server';
import { getAreaBySlug } from '@/lib/data/areas';
import { getPropertiesByArea } from '@/lib/data/properties';

interface AreaPageParams {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: AreaPageParams) {
  try {
    const area = getAreaBySlug(params.slug);

    if (!area) {
      return NextResponse.json(
        { error: 'Area not found' },
        { status: 404 }
      );
    }

    // Get properties for this area
    const properties = getPropertiesByArea(params.slug, 10);

    return NextResponse.json({
      area: {
        ...area,
        properties,
      },
      success: true
    });
  } catch (error) {
    console.error('Error fetching area:', error);
    return NextResponse.json(
      { error: 'Failed to fetch area' },
      { status: 500 }
    );
  }
}