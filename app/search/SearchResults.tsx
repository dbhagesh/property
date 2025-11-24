'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SearchBar } from '@/components/ui/SearchBar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AREAS } from '@/constants/areas';
import { FaMapMarkerAlt, FaHome, FaFileAlt, FaSearch } from 'react-icons/fa';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'area' | 'property' | 'blog';
  url: string;
  image?: string;
  metadata?: {
    propertyCount?: number;
    startingPrice?: string;
    date?: string;
  };
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(query);
  const [filter, setFilter] = useState<'all' | 'area' | 'property' | 'blog'>('all');

  // Mock search function - replace with real API call
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockResults: SearchResult[] = [
      // Areas
      ...AREAS
        .filter(area =>
          area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          area.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          area.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(area => ({
          id: `area-${area.id}`,
          title: `${area.name}, ${area.city}`,
          description: area.description,
          type: 'area' as const,
          url: `/deals/${area.slug}`,
          image: area.imageUrl,
          metadata: {
            propertyCount: area.propertyCount,
            startingPrice: area.startingPrice,
          }
        })),

      // Mock properties
      ...(searchQuery.toLowerCase().includes('property') || searchQuery.toLowerCase().includes('apartment') ? [
        {
          id: 'prop-1',
          title: '3BHK Apartment in Sector 45',
          description: 'Luxury 3BHK apartment with modern amenities, excellent connectivity, and prime location.',
          type: 'property' as const,
          url: '/properties/3bhk-sector-45',
          image: '/images/properties/prop-1.jpg',
          metadata: {
            startingPrice: '₹1.2 Crores'
          }
        },
        {
          id: 'prop-2',
          title: 'Industrial Plot in IMT Kharkhoda',
          description: 'Prime 200 sq. yards industrial plot in IMT Kharkhoda with excellent NH-44 connectivity.',
          type: 'property' as const,
          url: '/properties/industrial-plot-imt-kharkhoda',
          image: '/images/properties/prop-2.jpg',
          metadata: {
            startingPrice: '₹45 Lakhs'
          }
        }
      ] : []),

      // Mock blog posts
      ...(searchQuery.toLowerCase().includes('blog') || searchQuery.toLowerCase().includes('tips') || searchQuery.toLowerCase().includes('investment') ? [
        {
          id: 'blog-1',
          title: 'Real Estate Investment Tips for 2024',
          description: 'Complete guide to investing in real estate in Haryana. Learn about market trends, best areas, and investment strategies.',
          type: 'blog' as const,
          url: '/blog/real-estate-investment-tips-2024',
          metadata: {
            date: '2024-01-15'
          }
        },
        {
          id: 'blog-2',
          title: 'Property Market Trends in Haryana',
          description: 'Latest trends and predictions for Gurgaon property market. Area-wise analysis and future prospects.',
          type: 'blog' as const,
          url: '/blog/property-market-trends-gurgaon',
          metadata: {
            date: '2024-01-10'
          }
        }
      ] : [])
    ];

    setResults(mockResults);
    setLoading(false);
  };

  useEffect(() => {
    setCurrentQuery(query);
    performSearch(query);
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setCurrentQuery(newQuery);
    performSearch(newQuery);
    // Update URL without page reload
    window.history.replaceState({}, '', `/search?q=${encodeURIComponent(newQuery)}`);
  };

  const filteredResults = results.filter(result =>
    filter === 'all' || result.type === filter
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'area': return <FaMapMarkerAlt className="text-blue-500" />;
      case 'property': return <FaHome className="text-green-500" />;
      case 'blog': return <FaFileAlt className="text-purple-500" />;
      default: return <FaSearch />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'area': return 'Area';
      case 'property': return 'Property';
      case 'blog': return 'Blog Post';
      default: return '';
    }
  };

  const resultCounts = {
    all: results.length,
    area: results.filter(r => r.type === 'area').length,
    property: results.filter(r => r.type === 'property').length,
    blog: results.filter(r => r.type === 'blog').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Search Results
          </h1>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              placeholder="Search properties, areas, blogs..."
              className="max-w-2xl"
              onSearch={handleSearch}
              showSuggestions={false}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: `All (${resultCounts.all})` },
              { key: 'area', label: `Areas (${resultCounts.area})` },
              { key: 'property', label: `Properties (${resultCounts.property})` },
              { key: 'blog', label: `Blog Posts (${resultCounts.blog})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as 'all' | 'area' | 'property' | 'blog')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        ) : currentQuery && filteredResults.length === 0 ? (
          <div className="text-center py-12">
            <FaSearch className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No results found for &quot;{currentQuery}&quot;
            </h2>
            <p className="text-gray-600 mb-6">
              Try different keywords or check your spelling
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Search suggestions:</p>
              <ul className="list-disc list-inside">
                <li>Try searching for area names like &quot;Sector 45&quot; or &quot;DLF Phase 3&quot;</li>
                <li>Use property types like &quot;apartment&quot;, &quot;flat&quot;, or &quot;villa&quot;</li>
                <li>Search for topics like &quot;investment tips&quot; or &quot;market trends&quot;</li>
              </ul>
            </div>
          </div>
        ) : currentQuery && filteredResults.length > 0 ? (
          <div>
            <p className="text-gray-600 mb-6">
              Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for &quot;{currentQuery}&quot;
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResults.map((result) => (
                <Card key={result.id} className="hover:shadow-lg transition-shadow">
                  <Link href={result.url} className="block">
                    {result.image && (
                      <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder-property.jpg';
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(result.type)}
                        <span className="text-sm font-medium text-gray-500">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {result.title}
                      </h3>

                      <p className="text-gray-600 mb-4">
                        {result.description}
                      </p>

                      {result.metadata && (
                        <div className="flex items-center justify-between text-sm">
                          {result.metadata.propertyCount && (
                            <span className="text-gray-500">
                              {result.metadata.propertyCount} Properties
                            </span>
                          )}
                          {result.metadata.startingPrice && (
                            <span className="font-semibold text-primary-600">
                              {result.metadata.startingPrice}
                            </span>
                          )}
                          {result.metadata.date && (
                            <span className="text-gray-500">
                              {new Date(result.metadata.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <FaSearch className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Start your search
            </h2>
            <p className="text-gray-600 mb-6">
              Search for properties, areas, or get expert advice from our blog
            </p>
            <div className="grid gap-4 md:grid-cols-3 max-w-lg mx-auto">
              <Button
                variant="outline"
                onClick={() => handleSearch('Sector 45')}
                className="flex items-center gap-2"
              >
                <FaMapMarkerAlt />
                Areas
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSearch('apartment')}
                className="flex items-center gap-2"
              >
                <FaHome />
                Properties
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSearch('investment tips')}
                className="flex items-center gap-2"
              >
                <FaFileAlt />
                Blog Posts
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}