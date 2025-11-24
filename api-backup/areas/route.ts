import { NextResponse } from 'next/server';
import { getAllAreas } from '@/lib/data/areas';
import { getPropertyCountByArea } from '@/lib/data/properties';

export async function GET() {
  try {
    const areas = getAllAreas();

    // Enrich with property counts
    const enrichedAreas = areas.map(area => ({
      ...area,
      propertyCount: getPropertyCountByArea(area.slug),
      startingPrice: area.priceRangeMin
        ? `₹${(area.priceRangeMin / 100000).toFixed(0)} Lakhs`
        : 'Contact for Price',
    }));

    return NextResponse.json({
      success: true,
      data: enrichedAreas,
      count: enrichedAreas.length,
    });
  } catch (error) {
    console.error('Areas API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch areas' },
      { status: 500 }
    );
  }
}
