import { Metadata } from 'next';
import { Suspense } from 'react';
import SearchResults from './SearchResults';

export const metadata: Metadata = {
  title: 'Search Properties & Areas | Mahadev Real Estate',
  description: 'Search for properties, areas, and real estate information in Haryana. Find your perfect property with Mahadev Real Estate.',
  keywords: [
    'property search',
    'gurgaon property search',
    'real estate search',
    'property finder',
    'area search',
    'property listings'
  ],
};

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}