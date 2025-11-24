"use client";

import { Area } from "@/constants/areas";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

interface AreaOverviewProps {
  area: Area;
}

export const AreaOverview: React.FC<AreaOverviewProps> = ({ area }) => {
  // Use highlights from database or generate defaults
  const highlights = area.highlights && area.highlights.length > 0
    ? area.highlights
    : [
        `Prime location in ${area.city}`,
        `${area.propertyCount}+ verified properties`,
        `Starting from ${area.startingPrice}`,
        "Excellent connectivity",
        "Modern infrastructure",
        "High appreciation potential",
      ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg p-6 lg:p-8 shadow-soft"
    >
      <div className="flex items-center gap-2 text-primary-600 mb-4">
        <FaInfoCircle className="text-xl" />
        <h2 className="text-2xl font-bold">About {area.name}</h2>
      </div>

      <div className="prose prose-lg max-w-none text-secondary-700 mb-6">
        {area.overview ? (
          // Use overview from database if available
          <div dangerouslySetInnerHTML={{ __html: area.overview.replace(/\n/g, '<br />') }} />
        ) : (
          // Fallback to default content
          <>
            <p>
              {area.name} is one of the most sought-after residential and commercial hubs in {area.city}.
              {area.description} This area has witnessed tremendous growth over the past few years,
              making it an ideal choice for both end-users and investors.
            </p>
            <p>
              With its strategic location and excellent infrastructure, {area.name} offers a perfect
              blend of urban convenience and suburban tranquility. The area is well-connected to major
              business districts, educational institutions, and healthcare facilities, making it a
              preferred choice for families and working professionals.
            </p>
          </>
        )}
      </div>

      <div className="bg-primary-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-lg text-secondary-900 mb-4">Key Highlights</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-2"
            >
              <FaCheckCircle className="text-success-600 mt-1 flex-shrink-0" />
              <span className="text-secondary-700">{highlight}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-secondary-50 rounded-lg p-4 text-center">
          <p className="text-sm text-secondary-600 mb-1">Property Types</p>
          <p className="text-lg font-semibold text-secondary-900">
            {area.popularFor.length}+ Options
          </p>
        </div>
        <div className="bg-secondary-50 rounded-lg p-4 text-center">
          <p className="text-sm text-secondary-600 mb-1">Price Range</p>
          <p className="text-lg font-semibold text-primary-600">{area.startingPrice}+</p>
        </div>
        <div className="bg-secondary-50 rounded-lg p-4 text-center">
          <p className="text-sm text-secondary-600 mb-1">Connectivity</p>
          <p className="text-lg font-semibold text-secondary-900">Excellent</p>
        </div>
      </div>
    </motion.section>
  );
};