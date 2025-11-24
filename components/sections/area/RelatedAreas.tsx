"use client";

import { Area, AREAS } from "@/constants/areas";
import { AreaCard } from "@/components/ui/Card";
import { FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface RelatedAreasProps {
  currentArea: Area;
}

export const RelatedAreas: React.FC<RelatedAreasProps> = ({ currentArea }) => {
  // Get related areas (same city, excluding current)
  const relatedAreas = AREAS.filter(
    (area) => area.city === currentArea.city && area.id !== currentArea.id
  ).slice(0, 3);

  if (relatedAreas.length === 0) return null;

  return (
    <section className="py-16 bg-secondary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-primary-600 mb-4">
            <FaMapMarkedAlt className="text-2xl" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Explore More Areas
            </span>
          </div>
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Other Popular Areas in {currentArea.city}
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for in {currentArea.name}?
            Explore these nearby areas with similar amenities and price ranges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
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
        </div>
      </div>
    </section>
  );
};