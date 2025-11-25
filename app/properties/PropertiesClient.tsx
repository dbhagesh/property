'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch, FaFilter, FaTh, FaList, FaMapMarkerAlt } from 'react-icons/fa';
import PropertyCard from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  propertyType: string;
  status: string;
  bedrooms: number | null;
  bathrooms: number | null;
  areaSize: number;
  address: string;
  locality: string | null;
  images: string[];
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
  area: {
    id: string;
    name: string;
    slug: string;
    city: string;
    state: string;
  };
}

export default function PropertiesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  // Pagination
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        ...(search && { search }),
        ...(propertyType && { propertyType }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        ...(bedrooms && { bedrooms }),
        ...(sortBy && { sort: sortBy }),
      });

      const response = await fetch(`/api/properties?${params}`);
      const data = await response.json();

      if (data.success) {
        setProperties(data.data);
        setTotalPages(data.meta.totalPages);
        setTotal(data.meta.total);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, search, propertyType, minPrice, maxPrice, bedrooms, sortBy]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProperties();
  };

  const handleReset = () => {
    setSearch('');
    setPropertyType('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    setSortBy('newest');
    setCurrentPage(1);
    router.push('/properties');
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            Browse {total} properties available in Haryana
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <div className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <Input
                  type="text"
                  placeholder="Search by title, location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-2">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Types</option>
                  <option value="RESIDENTIAL">Residential</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="LAND">Land</option>
                  <option value="INDUSTRIAL">Industrial</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Any Beds</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-2">
                <Button onClick={handleSearch} className="w-full">
                  <FaSearch className="mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <p className="text-secondary-600">
                Showing <span className="font-semibold text-secondary-900">{properties.length}</span> of{' '}
                <span className="font-semibold text-secondary-900">{total}</span> properties
              </p>
              {(search || propertyType || minPrice || bedrooms) && (
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Reset Filters
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Viewed</option>
              </select>

              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
            <Button onClick={handleReset}>Reset Filters</Button>
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
            }>
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? 'primary' : 'outline'}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
