'use client';

import { useState, useEffect } from 'react';

// Generate static params for build
export async function generateStaticParams() {
  // Return empty array for now - add blog slugs here when you have blog data
  return [];
}
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaCalendar, FaUser, FaEye, FaClock, FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: { name: string; email: string };
  category?: { name: string; slug: string } | null;
  tags: string[];
  featuredImage?: string | null;
  status: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/blogs/${slug}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  try {
    const response = await fetch(`/api/blogs?limit=4`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (!data.success) {
      return [];
    }

    return data.data
      .filter((post: BlogPost) => post.slug !== currentSlug)
      .slice(0, 3);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogPost = await getBlogPost(params.slug);
        if (!blogPost) {
          notFound();
          return;
        }
        setPost(blogPost);

        const related = await getRelatedPosts(blogPost.slug);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!post) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-primary-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{post.title}</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
            >
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                  {post.category?.name || 'General'}
                </span>
                <span className="flex items-center">
                  <FaCalendar className="mr-1" />
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center">
                  <FaClock className="mr-1" />
                  {Math.ceil(post.content.length / 200)} min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                {post.title}
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pb-6 border-b">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <FaUser className="mr-1" />
                    {post.author.name}
                  </span>
                  <span className="flex items-center">
                    <FaEye className="mr-1" />
                    {(post.viewCount || 0).toLocaleString()} views
                  </span>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 mr-2">Share:</span>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                    <FaFacebook />
                  </button>
                  <button className="p-2 text-sky-500 hover:bg-sky-50 rounded-full">
                    <FaTwitter />
                  </button>
                  <button className="p-2 text-blue-700 hover:bg-blue-50 rounded-full">
                    <FaLinkedin />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-full">
                    <FaWhatsapp />
                  </button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-8">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="py-6 border-t">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700">Tags:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Box */}
            <div className="bg-gray-100 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-secondary-900 mb-2">About the Author</h3>
              <p className="text-gray-600">
                {post.author.name} is part of the Mahadev Real Estate team, bringing years of experience
                in Haryana&apos;s real estate market. Our experts provide valuable insights to help
                you make informed property decisions.
              </p>
            </div>

            {/* CTA Section */}
            <div className="bg-primary-600 text-white rounded-lg p-6 text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Looking for Properties in Haryana?</h3>
              <p className="mb-4">
                Get expert guidance and find your dream property with Mahadev Real Estate
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-200">
                    <img
                      src={relatedPost.featuredImage || '/images/blog/default-blog.jpg'}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/blog/default-blog.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-600 mb-2">
                      {relatedPost.category?.name || 'General'} • {Math.ceil(relatedPost.content?.length / 200 || 5)} min read
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="text-primary-600 text-sm font-medium hover:text-primary-700"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}