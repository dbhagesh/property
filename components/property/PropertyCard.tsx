'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaStar, FaEye } from 'react-icons/fa';

interface PropertyCardProps {
  property: {
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
    area: {
      name: string;
      city: string;
    };
  };
  viewMode?: 'grid' | 'list';
}

export default function PropertyCard({ property, viewMode = 'grid' }: PropertyCardProps) {
  const formatPrice = (price: string) => {
    const priceNum = parseFloat(price);
    if (priceNum >= 10000000) {
      return `₹${(priceNum / 10000000).toFixed(2)} Cr`;
    } else if (priceNum >= 100000) {
      return `₹${(priceNum / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${priceNum.toLocaleString('en-IN')}`;
  };

  const mainImage = property.images && property.images.length > 0
    ? property.images[0]
    : '/images/placeholder-property.jpg';

  if (viewMode === 'list') {
    return (
      <Link href={`/properties/${property.slug}`}>
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col md:flex-row group">
          <div className="relative h-64 md:h-auto md:w-80 bg-secondary-200 flex-shrink-0">
            {mainImage && (
              <Image
                src={mainImage}
                alt={property.title}
                fill
                sizes="320px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            )}
            {property.isFeatured && (
              <div className="absolute top-4 left-4 bg-accent-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <FaStar /> Featured
              </div>
            )}
            <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {property.propertyType}
            </div>
          </div>

          <div className="p-6 flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                {property.title}
              </h3>
              <p className="text-2xl font-bold text-primary-600 whitespace-nowrap ml-4">
                {formatPrice(property.price)}
              </p>
            </div>

            <div className="flex items-center text-secondary-600 text-sm mb-4">
              <FaMapMarkerAlt className="mr-1" />
              <span>{property.area.name}, {property.area.city}</span>
            </div>

            <p className="text-secondary-600 mb-4 line-clamp-2">
              {property.description}
            </p>

            <div className="flex items-center gap-6 text-secondary-600">
              {property.bedrooms && (
                <div className="flex items-center gap-2">
                  <FaBed className="text-primary-600" />
                  <span>{property.bedrooms} Beds</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-2">
                  <FaBath className="text-primary-600" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FaRuler className="text-primary-600" />
                <span>{property.areaSize.toLocaleString()} sq ft</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <FaEye className="text-secondary-400" />
                <span className="text-sm">{property.viewCount} views</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/properties/${property.slug}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group h-full flex flex-col">
        <div className="relative h-56 bg-secondary-200">
          {mainImage && (
            <Image
              src={mainImage}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          )}
          {property.isFeatured && (
            <div className="absolute top-4 left-4 bg-accent-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <FaStar /> Featured
            </div>
          )}
          <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {property.propertyType}
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {property.title}
          </h3>

          <div className="flex items-center text-secondary-600 text-sm mb-3">
            <FaMapMarkerAlt className="mr-1" />
            <span className="line-clamp-1">{property.area.name}, {property.area.city}</span>
          </div>

          <p className="text-secondary-600 text-sm mb-4 line-clamp-2 flex-1">
            {property.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
            <div className="flex items-center gap-4 text-sm text-secondary-600">
              {property.bedrooms && (
                <div className="flex items-center gap-1">
                  <FaBed className="text-primary-600" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-1">
                  <FaBath className="text-primary-600" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <FaRuler className="text-primary-600" />
                <span>{property.areaSize.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xl font-bold text-primary-600">
              {formatPrice(property.price)}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3 text-xs text-secondary-500">
            <div className="flex items-center gap-1">
              <FaEye />
              <span>{property.viewCount} views</span>
            </div>
            <span className="text-primary-600 font-semibold group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
