"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { CONTACT_INFO, getWhatsAppUrl } from "@/constants/contact";
import { getHeroContent } from "@/lib/data/home-content";
import {
  FaSearch,
  FaHome,
  FaUsers,
  FaAward,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt
} from "react-icons/fa";
import { motion } from "framer-motion";

interface Area {
  id: string;
  name: string;
  slug: string;
  propertyCount: number;
}

export const HeroSection = () => {
  const router = useRouter();
  const content = getHeroContent();
  const [selectedArea, setSelectedArea] = useState("");
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('/api/areas');
        const data = await response.json();
        if (data.success && data.data) {
          setAreas(data.data);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
        setAreas([]);
      }
    };

    fetchAreas();
  }, []);

  const handleAreaSearch = () => {
    if (selectedArea) {
      router.push(`/deals/${selectedArea}`);
    }
  };

  const stats = [
    { icon: FaHome, value: `${CONTACT_INFO.statistics.propertiesSold}+`, label: "Properties Sold" },
    { icon: FaUsers, value: `${CONTACT_INFO.statistics.happyCustomers}+`, label: "Happy Customers" },
    { icon: FaAward, value: `${CONTACT_INFO.statistics.yearsInBusiness}+`, label: "Years Experience" },
  ];

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] bg-gradient-to-br from-primary-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                <FaAward />
                {content.badge}
              </div>

              {/* Heading */}
              <div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary-900 leading-tight">
                  {content.title.line1}
                  <span className="text-primary-600"> {content.title.highlighted}</span> {content.title.line2}
                  <span className="text-primary-600"> {content.title.highlightedCity}</span>
                </h1>
                <p className="mt-4 text-lg text-secondary-600 max-w-xl">
                  {content.description.replace('expert guidance', `${CONTACT_INFO.statistics.yearsInBusiness}+ years of expertise`)}
                </p>
              </div>

              {/* Search Box */}
              <div className="bg-white p-6 rounded-xl shadow-soft">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Select
                      label="Choose Area"
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      options={areas.map(area => ({
                        value: area.slug,
                        label: `${area.name} (${area.propertyCount} properties)`
                      }))}
                      placeholder={content.searchPlaceholder}
                    />
                  </div>
                  <Button
                    onClick={handleAreaSearch}
                    size="lg"
                    className="sm:mt-6"
                    leftIcon={<FaSearch />}
                    disabled={!selectedArea}
                  >
                    {content.searchButton}
                  </Button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="whatsapp"
                  size="lg"
                  leftIcon={<FaWhatsapp />}
                  onClick={() => window.open(getWhatsAppUrl(), "_blank")}
                >
                  {content.ctaButtons.whatsapp}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<FaPhoneAlt />}
                  onClick={() => window.open(`tel:${CONTACT_INFO.primaryPhone}`, "_self")}
                >
                  {content.ctaButtons.call}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<FaMapMarkerAlt />}
                  onClick={() => window.open(CONTACT_INFO.address.googleMapsUrl, "_blank")}
                >
                  Get Directions
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-secondary-200">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center sm:text-left"
                  >
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <stat.icon className="text-primary-600 text-xl" />
                      <div>
                        <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                        <p className="text-xs text-secondary-600">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {[0, 1].map((idx) => (
                  <div
                    key={idx}
                    className={`relative ${idx === 0 ? 'h-48' : 'h-64'} rounded-lg overflow-hidden shadow-medium bg-secondary-200`}
                  >
                    <Image
                      src={content.propertyShowcase[idx].image}
                      alt={content.propertyShowcase[idx].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-110 transition-transform duration-300"
                      priority={idx === 0}
                      loading={idx === 0 ? undefined : "lazy"}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">{content.propertyShowcase[idx].title}</p>
                      <p className="text-sm">{content.propertyShowcase[idx].startingPrice || content.propertyShowcase[idx].subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 mt-8">
                {[2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`relative ${idx === 2 ? 'h-64' : 'h-48'} rounded-lg overflow-hidden shadow-medium bg-secondary-200`}
                  >
                    <Image
                      src={content.propertyShowcase[idx].image}
                      alt={content.propertyShowcase[idx].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">{content.propertyShowcase[idx].title}</p>
                      <p className="text-sm">{content.propertyShowcase[idx].startingPrice || content.propertyShowcase[idx].subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-hard"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                  <FaHome className="text-success-600 text-xl" />
                </div>
                <div>
                  <p className="font-bold text-secondary-900">{content.newListingCard.title}</p>
                  <p className="text-sm text-secondary-600">{content.newListingCard.subtitle}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};