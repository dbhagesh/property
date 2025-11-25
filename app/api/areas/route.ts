import { NextResponse } from 'next/server';
import { getAllAreas } from '@/lib/data/areas';

export async function GET() {
  try {
    const areas = getAllAreas();

    // Transform the data to match what the frontend expects
    const transformedAreas = areas.map(area => ({
      id: area.id,
      name: area.name,
      slug: area.slug,
      city: area.city,
      imageUrl: area.imageUrl,
      propertyCount: area.propertyCount,
      startingPrice: area.priceRangeMin
        ? `₹${(area.priceRangeMin / 100000).toFixed(0)} Lakhs`
        : '₹25 Lakhs',
      popularFor: area.featured ? ['Featured Location'] : ['Prime Location']
    }));

    return NextResponse.json({
      success: true,
      data: transformedAreas,
      count: transformedAreas.length
    });
  } catch (error) {
    console.error('Error fetching areas:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch areas',
        data: []
      },
      { status: 500 }
    );
  }
}
