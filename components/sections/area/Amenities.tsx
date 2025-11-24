"use client";

import { Area } from "@/constants/areas";
import {
  FaGraduationCap,
  FaHospital,
  FaShoppingCart,
  FaUtensils,
  FaTree,
  FaUniversity,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface AmenitiesProps {
  area: Area;
}

export const Amenities: React.FC<AmenitiesProps> = ({ area }) => {
  // Icon mapping for different amenity categories
  const iconMap: Record<string, any> = {
    'Education': FaGraduationCap,
    'Educational Institutions': FaGraduationCap,
    'Schools': FaGraduationCap,
    'Healthcare': FaHospital,
    'Healthcare Facilities': FaHospital,
    'Hospitals': FaHospital,
    'Shopping': FaShoppingCart,
    'Shopping & Retail': FaShoppingCart,
    'Malls': FaShoppingCart,
    'Dining': FaUtensils,
    'Dining & Entertainment': FaUtensils,
    'Restaurants': FaUtensils,
    'Parks': FaTree,
    'Parks & Recreation': FaTree,
    'Recreation': FaTree,
    'Banks': FaUniversity,
    'Banks & ATMs': FaUniversity,
    'ATMs': FaUniversity,
  };

  const colorMap: Record<string, { text: string; bg: string }> = {
    'Education': { text: 'text-primary-600', bg: 'bg-primary-50' },
    'Educational Institutions': { text: 'text-primary-600', bg: 'bg-primary-50' },
    'Schools': { text: 'text-primary-600', bg: 'bg-primary-50' },
    'Healthcare': { text: 'text-error-600', bg: 'bg-error-50' },
    'Healthcare Facilities': { text: 'text-error-600', bg: 'bg-error-50' },
    'Hospitals': { text: 'text-error-600', bg: 'bg-error-50' },
    'Shopping': { text: 'text-accent-600', bg: 'bg-accent-50' },
    'Shopping & Retail': { text: 'text-accent-600', bg: 'bg-accent-50' },
    'Malls': { text: 'text-accent-600', bg: 'bg-accent-50' },
    'Dining': { text: 'text-success-600', bg: 'bg-success-50' },
    'Dining & Entertainment': { text: 'text-success-600', bg: 'bg-success-50' },
    'Restaurants': { text: 'text-success-600', bg: 'bg-success-50' },
    'Parks': { text: 'text-success-600', bg: 'bg-success-50' },
    'Parks & Recreation': { text: 'text-success-600', bg: 'bg-success-50' },
    'Recreation': { text: 'text-success-600', bg: 'bg-success-50' },
    'Banks': { text: 'text-secondary-600', bg: 'bg-secondary-50' },
    'Banks & ATMs': { text: 'text-secondary-600', bg: 'bg-secondary-50' },
    'ATMs': { text: 'text-secondary-600', bg: 'bg-secondary-50' },
  };

  // Use amenities from database if available, otherwise use defaults
  const amenityCategories = area.amenities && Array.isArray(area.amenities) && area.amenities.length > 0
    ? area.amenities.map((cat: any) => ({
        icon: iconMap[cat.category] || FaShoppingCart,
        title: cat.category,
        color: colorMap[cat.category]?.text || 'text-primary-600',
        bgColor: colorMap[cat.category]?.bg || 'bg-primary-50',
        items: cat.items || []
      }))
    : [
        {
          icon: FaGraduationCap,
          title: "Educational Institutions",
          color: "text-primary-600",
          bgColor: "bg-primary-50",
          items: [
            "DPS International School - 2 km",
            "Heritage School - 3 km",
            "Amity University - 5 km",
            "Multiple coaching centers nearby",
          ],
        },
        {
          icon: FaHospital,
          title: "Healthcare Facilities",
          color: "text-error-600",
          bgColor: "bg-error-50",
          items: [
            "Fortis Hospital - 4 km",
            "Medanta Hospital - 6 km",
            "Artemis Hospital - 8 km",
            "24/7 clinics and pharmacies",
          ],
        },
        {
          icon: FaShoppingCart,
          title: "Shopping & Retail",
          color: "text-accent-600",
          bgColor: "bg-accent-50",
          items: [
            "DLF Mall - 3 km",
            "Ambience Mall - 5 km",
            "Local markets within 1 km",
            "24/7 convenience stores",
          ],
        },
      ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg p-6 lg:p-8 shadow-soft"
    >
      <div className="flex items-center gap-2 text-primary-600 mb-6">
        <FaShoppingCart className="text-xl" />
        <h2 className="text-2xl font-bold">Amenities & Infrastructure</h2>
      </div>

      <p className="text-secondary-700 mb-6">
        {area.name} offers excellent social infrastructure with all modern amenities within easy reach.
        From top-rated schools to world-class healthcare facilities, everything you need is just minutes away.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenityCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="border border-secondary-200 rounded-lg p-5 hover:shadow-medium transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                <category.icon className={`${category.color} text-lg`} />
              </div>
              <h3 className="font-semibold text-secondary-900">{category.title}</h3>
            </div>
            <ul className="space-y-2">
              {category.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="flex items-start gap-2 text-sm text-secondary-600">
                  <div className="w-1.5 h-1.5 bg-secondary-400 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <p className="text-sm text-primary-700">
          <strong>Note:</strong> All distances are approximate and may vary based on the specific location
          within {area.name}. Our team can provide detailed information about amenities near your preferred property.
        </p>
      </div>
    </motion.section>
  );
};