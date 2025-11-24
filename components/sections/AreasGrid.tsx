"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CONTACT_INFO } from "@/constants/contact";
import { AreaCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FaMapMarkedAlt, FaArrowRight } from "react-icons/fa";

interface Area {
  id: string;
  name: string;
  slug: string;
  city: string;
  imageUrl: string;
  propertyCount: number;
  startingPrice: string;
  popularFor: string[];
}

export const AreasGrid = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const displayedAreas = showAll ? areas : areas.slice(0, 6);

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
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 lg:py-20 bg-secondary-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-primary-600 mb-4">
            <FaMapMarkedAlt className="text-2xl" />
            <span className="text-sm font-semibold uppercase tracking-wider">Explore Properties</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            We Deal in These <span className="text-primary-600">Prime Areas</span>
          </h2>
          <p className="text-lg text-secondary-600">
            Discover the best properties in Haryana&apos;s most sought-after locations including IMT Kharkhoda, Bahadurgarh, Sonipat, and Rohtak.
          </p>
        </motion.div>

        {/* Areas Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedAreas.map((area) => (
              <motion.div key={area.id} variants={itemVariants}>
                <AreaCard
                  name={area.name}
                  slug={area.slug}
                  city={area.city}
                  imageUrl={area.imageUrl}
                  propertyCount={area.propertyCount}
                  startingPrice={area.startingPrice}
                  popularFor={area.popularFor}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Show More/Less Button */}
        {areas.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-10"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              rightIcon={<FaArrowRight className={`transform transition-transform ${showAll ? "rotate-90" : ""}`} />}
            >
              {showAll ? "Show Less Areas" : `View All ${areas.length} Areas`}
            </Button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-2">
            Can&apos;t Find Your Preferred Area?
          </h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            We deal in all areas of Haryana and nearby regions. Contact us for personalized property recommendations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.open(`tel:${CONTACT_INFO.primaryPhone}`, "_self")}
            >
              Call Us Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-primary-600 border-white hover:bg-primary-50"
              onClick={() => window.location.href = "/contact"}
            >
              Send Inquiry
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};