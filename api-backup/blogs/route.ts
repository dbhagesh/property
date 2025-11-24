import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/data/blog';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const allBlogs = getAllBlogPosts();
    const total = allBlogs.length;
    const blogs = allBlogs.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: blogs,
      meta: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Public Blogs API Error:', error);
    return NextResponse.json({
      success: true,
      data: [],
      meta: {
        total: 0,
        limit,
        offset,
        hasMore: false
      }
    });
  }
}