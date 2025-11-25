import Link from 'next/link';
import { Metadata } from 'next';
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

export function generateStaticParams() {
  try {
    // Return empty array since there are no blog posts yet
    // Add blog slugs here when you have blog data
    return [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </Link>

            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
            </header>

            <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </article>
    </div>
  );
}
