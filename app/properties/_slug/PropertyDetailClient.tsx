'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import {
  FaBed,
  FaBath,
  FaRuler,
  FaMapMarkerAlt,
  FaCalendar,
  FaEye,
  FaShareAlt,
  FaHeart,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaCheckCircle,
} from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import PropertyCard from '@/components/property/PropertyCard';

interface PropertyDetailClientProps {
  property: any;
  similarProperties: any[];
}

export default function PropertyDetailClient({ property, similarProperties }: PropertyDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in ${property.title}`,
  });

  const formatPrice = (price: string | number) => {
    const priceNum = typeof price === 'string' ? parseFloat(price) : price;
    if (priceNum >= 10000000) {
      return `₹${(priceNum / 10000000).toFixed(2)} Cr`;
    } else if (priceNum >= 100000) {
      return `₹${(priceNum / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${priceNum.toLocaleString('en-IN')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          propertyId: property.id,
          source: 'property_detail',
        }),
      });

      if (response.ok) {
        toast.success('Inquiry sent successfully! We\'ll contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: `I'm interested in ${property.title}`,
        });
      } else {
        toast.error('Failed to send inquiry. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const images = property.images && property.images.length > 0
    ? property.images
    : ['/images/placeholder-property.jpg'];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-secondary-600">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-primary-600">Properties</Link>
            <span>/</span>
            <Link href={`/deals/${property.area.slug}`} className="hover:text-primary-600">
              {property.area.name}
            </Link>
            <span>/</span>
            <span className="text-secondary-900 font-medium">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div>
              <div className="relative h-96 md:h-[500px] bg-secondary-200 rounded-lg overflow-hidden mb-4">
                {images[selectedImage] && (
                  <Image
                    src={images[selectedImage]}
                    alt={property.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 66vw"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                )}
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-20 rounded-lg overflow-hidden ${
                        selectedImage === idx ? 'ring-2 ring-primary-600' : ''
                      }`}
                    >
                      {img && (
                        <Image
                          src={img}
                          alt={`${property.title} - ${idx + 1}`}
                          fill
                          sizes="150px"
                          className="object-cover"
                          unoptimized
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Price */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-secondary-600 mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{property.address}, {property.area.name}, {property.area.city}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-secondary-500">
                    <div className="flex items-center gap-1">
                      <FaEye />
                      <span>{property.viewCount} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendar />
                      <span>Posted {new Date(property.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl md:text-4xl font-bold text-primary-600">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-sm text-secondary-600 mt-1">
                    ₹{Math.round(parseFloat(property.price.toString()) / property.areaSize).toLocaleString()}/sq ft
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-secondary-50 rounded-lg p-6">
                {property.bedrooms && (
                  <div className="text-center">
                    <div className="flex items-center justify-center text-primary-600 text-2xl mb-2">
                      <FaBed />
                    </div>
                    <p className="text-2xl font-bold text-secondary-900">{property.bedrooms}</p>
                    <p className="text-sm text-secondary-600">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center">
                    <div className="flex items-center justify-center text-primary-600 text-2xl mb-2">
                      <FaBath />
                    </div>
                    <p className="text-2xl font-bold text-secondary-900">{property.bathrooms}</p>
                    <p className="text-sm text-secondary-600">Bathrooms</p>
                  </div>
                )}
                <div className="text-center">
                  <div className="flex items-center justify-center text-primary-600 text-2xl mb-2">
                    <FaRuler />
                  </div>
                  <p className="text-2xl font-bold text-secondary-900">{property.areaSize.toLocaleString()}</p>
                  <p className="text-sm text-secondary-600">Sq Ft</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-secondary-600 mb-2">Type</p>
                  <p className="text-lg font-bold text-secondary-900">{property.propertyType}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-secondary-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">Description</h2>
              <p className="text-secondary-700 whitespace-pre-line leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Property Details */}
            <div className="bg-white border border-secondary-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">Property Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b border-secondary-100">
                  <span className="text-secondary-600">Property Type</span>
                  <span className="font-semibold text-secondary-900">{property.propertyType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-secondary-100">
                  <span className="text-secondary-600">Status</span>
                  <span className="font-semibold text-secondary-900">{property.status}</span>
                </div>
                {property.bedrooms && (
                  <div className="flex justify-between py-2 border-b border-secondary-100">
                    <span className="text-secondary-600">Bedrooms</span>
                    <span className="font-semibold text-secondary-900">{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex justify-between py-2 border-b border-secondary-100">
                    <span className="text-secondary-600">Bathrooms</span>
                    <span className="font-semibold text-secondary-900">{property.bathrooms}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-secondary-100">
                  <span className="text-secondary-600">Area Size</span>
                  <span className="font-semibold text-secondary-900">{property.areaSize.toLocaleString()} sq ft</span>
                </div>
                {property.floors && (
                  <div className="flex justify-between py-2 border-b border-secondary-100">
                    <span className="text-secondary-600">Floors</span>
                    <span className="font-semibold text-secondary-900">{property.floors}</span>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex justify-between py-2 border-b border-secondary-100">
                    <span className="text-secondary-600">Year Built</span>
                    <span className="font-semibold text-secondary-900">{property.yearBuilt}</span>
                  </div>
                )}
                {property.furnishing && (
                  <div className="flex justify-between py-2 border-b border-secondary-100">
                    <span className="text-secondary-600">Furnishing</span>
                    <span className="font-semibold text-secondary-900">{property.furnishing}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white border border-secondary-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Features</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <FaCheckCircle className="text-success-600 flex-shrink-0" />
                      <span className="text-secondary-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white border border-secondary-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Amenities</h2>
                <div className="grid md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <FaCheckCircle className="text-success-600 flex-shrink-0" />
                      <span className="text-secondary-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Form */}
              <div className="bg-white border-2 border-primary-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  Interested in this Property?
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Your Phone *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </Button>
                </form>
              </div>

              {/* Contact Options */}
              <div className="bg-secondary-50 rounded-lg p-6">
                <h3 className="font-bold text-secondary-900 mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    <FaPhone className="text-primary-600" />
                    <span className="text-secondary-900">+91-98765-43210</span>
                  </a>
                  <a
                    href={`https://wa.me/919876543210?text=I'm interested in ${property.title}`}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-success-50 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="text-success-600" />
                    <span className="text-secondary-900">WhatsApp Us</span>
                  </a>
                  <a
                    href="mailto:info@mahadevrealestate99.gmail.com"
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    <FaEnvelope className="text-primary-600" />
                    <span className="text-secondary-900">Email Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
