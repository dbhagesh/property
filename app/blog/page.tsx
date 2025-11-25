import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Real Estate Blog | Property Insights & Market Trends | Mahadev Real Estate',
  description: 'Get the latest insights on Gurgaon real estate market, property investment tips, area guides, and expert advice from Mahadev Real Estate.',
  keywords: [
    'real estate blog',
    'property blog gurgaon',
    'real estate news',
    'property investment tips',
    'gurgaon property market',
    'real estate trends',
    'property buying guide',
    'area guides gurgaon'
  ],
};

export default function BlogPage() {
  return <BlogClient />;
}