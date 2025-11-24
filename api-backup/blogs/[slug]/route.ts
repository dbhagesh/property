import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/lib/data/blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const blog = getBlogPostBySlug(params.slug);

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Blog Post API Error:', error);
    return NextResponse.json(
      { error: 'Blog post not found' },
      { status: 404 }
    );
  }
}