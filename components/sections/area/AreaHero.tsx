"use client";

import Image from "next/image";
import { Area } from "@/constants/areas";
import { Button } from "@/components/ui/Button";
import { CONTACT_INFO, getWhatsAppUrl } from "@/constants/contact";
import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaHome,
  FaPhoneAlt,
  FaWhatsapp,
  FaBuilding,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface AreaHeroProps {
  area: Area;
}

export const AreaHero: React.FC<AreaHeroProps> = ({ area }) => {
  return (
    <section className="relative bg-gradient-to-br from-secondary-50 to-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 h-96 lg:h-[500px] bg-secondary-200">
        {area.imageUrl && (
          <Image
            src={area.imageUrl}
            alt={`${area.name}, ${area.city}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-20 pb-12 lg:pt-32 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-secondary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FaMapMarkerAlt className="text-accent-600" />
            {area.city}, {area.state}
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
            {area.name}
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            {area.description}
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/95 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-accent-600 mb-1">
                <FaHome />
                <span className="text-sm font-medium">Properties</span>
              </div>
              <p className="text-2xl font-bold text-secondary-900">
                {area.propertyCount}+
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-primary-600 mb-1">
                <FaRupeeSign />
                <span className="text-sm font-medium">Starting From</span>
              </div>
              <p className="text-2xl font-bold text-secondary-900">
                {area.startingPrice}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/95 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-accent-600 mb-1">
                <FaBuilding />
                <span className="text-sm font-medium">Popular For</span>
              </div>
              <p className="text-lg font-bold text-secondary-900 truncate">
                {area.popularFor?.[0] || 'N/A'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/95 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-accent-600 mb-1">
                <FaMapMarkerAlt />
                <span className="text-sm font-medium">Nearby</span>
              </div>
              <p className="text-lg font-bold text-secondary-900 truncate">
                {area.nearbyLandmarks?.[0] || 'N/A'}
              </p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              leftIcon={<FaWhatsapp />}
              onClick={() => {
                const message = `Hi, I'm interested in properties in ${area.name}, ${area.city}. Please share available options.`;
                window.open(getWhatsAppUrl(message), "_blank");
              }}
            >
              Get Property List
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<FaPhoneAlt />}
              className="bg-white/90 backdrop-blur-sm"
              onClick={() => window.open(`tel:${CONTACT_INFO.primaryPhone}`, "_self")}
            >
              Talk to Expert
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto -mt-1"
        >
          <path
            d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 35C672 40 768 50 864 55C960 60 1056 60 1152 55C1248 50 1344 40 1392 35L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};