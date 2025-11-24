import fs from 'fs';
import path from 'path';
import blogIndex from '@/data/blog/index.json';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: string;
  tags: string[];
  status: string;
  publishedAt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  author: {
    id: string;
    name: string;
  };
  category: string;
  tags: string[];
  status: string;
  publishedAt: string;
}

/**
 * Get all blog posts (summary)
 */
export function getAllBlogPosts(): BlogPostSummary[] {
  return blogIndex.posts;
}

/**
 * Get blog post by slug with full details
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(process.cwd(), 'data', 'blog', `${slug}.json`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get blog posts with pagination
 */
export function getBlogPosts(page = 1, limit = 10) {
  const posts = getAllBlogPosts();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    posts: posts.slice(startIndex, endIndex),
    total: posts.length,
    page,
    limit,
    totalPages: Math.ceil(posts.length / limit),
    hasMore: endIndex < posts.length
  };
}

/**
 * Get blog posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPostSummary[] {
  return getAllBlogPosts().filter(post =>
    post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPostSummary[] {
  return getAllBlogPosts().filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Search blog posts
 */
export function searchBlogPosts(query: string): BlogPostSummary[] {
  const searchTerm = query.toLowerCase();
  return getAllBlogPosts().filter(post =>
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

/**
 * Get recent blog posts
 */
export function getRecentBlogPosts(limit = 5): BlogPostSummary[] {
  return getAllBlogPosts().slice(0, limit);
}
