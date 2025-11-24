import { NextRequest, NextResponse } from 'next/server';
import { getProperties } from '@/lib/data/properties';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters = {
      propertyType: searchParams.get('propertyType') || undefined,
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      bedrooms: searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms')!) : undefined,
      bathrooms: searchParams.get('bathrooms') ? parseInt(searchParams.get('bathrooms')!) : undefined,
      search: searchParams.get('search') || undefined,
      areaSlug: searchParams.get('areaSlug') || undefined,
      status: searchParams.get('status') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '12'),
      sortBy: (searchParams.get('sort') || 'newest') as any,
    };

    const result = getProperties(filters);

    return NextResponse.json({
      success: true,
      data: result.properties,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
        hasMore: result.hasMore,
      },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
