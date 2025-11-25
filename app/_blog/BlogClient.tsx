'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCalendar, FaUser, FaEye, FaArrowRight } from 'react-icons/fa';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
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

const CATEGORIES = [
  'All',
  'Investment Guide',
  'Area Guide',
  'Buying Guide',
  'Legal Guide',
  'Property Tips',
  'Market Trends',
  'Area Comparison',
];

export default function BlogClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs?status=PUBLISHED&limit=20');
        const data = await response.json();

        if (data.success) {
          setBlogPosts(data.data);
        } else {
          setError('Failed to load blog posts');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category?.name === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Real Estate Insights & Guides
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Stay updated with the latest trends, investment opportunities, and expert advice
            in Haryana&apos;s real estate market.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4 overflow-x-auto">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      {!loading && !error && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Featured Post */}
            {filteredPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                {selectedCategory === 'All' ? 'Featured Post' : `${selectedCategory} - Featured`}
              </h2>
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="h-64 md:h-full bg-gray-200">
                      <img
                        src={filteredPosts[0].featuredImage || '/images/blog/default-blog.jpg'}
                        alt={filteredPosts[0].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/blog/default-blog.jpg';
                        }}
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                        {filteredPosts[0].category?.name || 'General'}
                      </span>
                      <span className="flex items-center">
                        <FaCalendar className="mr-1" />
                        {new Date(filteredPosts[0].publishedAt || filteredPosts[0].createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                      {filteredPosts[0].title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FaUser className="mr-1" />
                          {filteredPosts[0].author.name}
                        </span>
                        <span className="flex items-center">
                          <FaEye className="mr-1" />
                          {filteredPosts[0].viewCount} views
                        </span>
                      </div>
                      <Link
                        href={`/blog/${filteredPosts[0].slug}`}
                        className="text-primary-600 font-medium hover:text-primary-700 flex items-center"
                      >
                        Read More
                        <FaArrowRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Recent Posts */}
          {filteredPosts.length > 1 && (
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                {selectedCategory === 'All' ? 'Recent Posts' : `More ${selectedCategory} Articles`}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.slice(1).map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gray-200">
                      <img
                        src={post.featuredImage || '/images/blog/default-blog.jpg'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/blog/default-blog.jpg';
                        }}
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {post.category?.name || 'General'}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          <span className="flex items-center">
                            <FaEye className="mr-1" />
                            {post.viewCount} views
                          </span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-primary-600 text-sm font-medium hover:text-primary-700"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* No posts found */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">No Articles Found</h2>
              <p className="text-gray-600 mb-6">
                No articles found in the &quot;{selectedCategory}&quot; category.
                Try selecting a different category or browse all articles.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Browse All Articles
              </button>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Load More Articles
              </button>
            </div>
          )}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest property insights, market trends,
            and investment opportunities delivered to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}