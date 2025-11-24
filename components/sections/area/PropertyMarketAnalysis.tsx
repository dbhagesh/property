"use client";

import { Area } from "@/constants/areas";
import { FaChartLine, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

interface PropertyMarketAnalysisProps {
  area: Area;
}

export const PropertyMarketAnalysis: React.FC<PropertyMarketAnalysisProps> = ({ area }) => {
  const marketData = {
    appreciation: "+12%",
    rentalYield: "3.5%",
    avgPricePerSqft: "₹8,500",
    demandLevel: "High",
  };

  const propertyTypes = [
    { type: "2 BHK Apartments", price: "₹65 Lakhs - ₹1.2 Cr", availability: "High" },
    { type: "3 BHK Apartments", price: "₹1.2 Cr - ₹2.5 Cr", availability: "Medium" },
    { type: "Villas", price: "₹2.5 Cr - ₹5 Cr", availability: "Low" },
    { type: "Builder Floors", price: "₹1.5 Cr - ₹3 Cr", availability: "Medium" },
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
        <FaChartLine className="text-xl" />
        <h2 className="text-2xl font-bold">Property Market Analysis</h2>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-success-50 to-white rounded-lg p-4 border border-success-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-secondary-600">Annual Appreciation</span>
            <FaArrowUp className="text-success-600" />
          </div>
          <p className="text-2xl font-bold text-success-600">{marketData.appreciation}</p>
        </div>

        <div className="bg-gradient-to-br from-primary-50 to-white rounded-lg p-4 border border-primary-200">
          <span className="text-sm text-secondary-600">Rental Yield</span>
          <p className="text-2xl font-bold text-primary-600 mt-2">{marketData.rentalYield}</p>
        </div>

        <div className="bg-gradient-to-br from-accent-50 to-white rounded-lg p-4 border border-accent-200">
          <span className="text-sm text-secondary-600">Avg Price/Sq.ft</span>
          <p className="text-2xl font-bold text-accent-700 mt-2">{marketData.avgPricePerSqft}</p>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-white rounded-lg p-4 border border-secondary-200">
          <span className="text-sm text-secondary-600">Demand Level</span>
          <p className="text-2xl font-bold text-secondary-700 mt-2">{marketData.demandLevel}</p>
        </div>
      </div>

      {/* Property Types Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary-50">
              <th className="text-left p-4 font-semibold text-secondary-900">Property Type</th>
              <th className="text-left p-4 font-semibold text-secondary-900">Price Range</th>
              <th className="text-left p-4 font-semibold text-secondary-900">Availability</th>
            </tr>
          </thead>
          <tbody>
            {propertyTypes.map((property, index) => (
              <tr key={index} className="border-b border-secondary-100">
                <td className="p-4 text-secondary-700">{property.type}</td>
                <td className="p-4 font-semibold text-primary-600">{property.price}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      property.availability === "High"
                        ? "bg-success-100 text-success-700"
                        : property.availability === "Medium"
                        ? "bg-warning-100 text-warning-700"
                        : "bg-error-100 text-error-700"
                    }`}
                  >
                    {property.availability}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <p className="text-sm text-primary-700">
          <strong>Market Insight:</strong> {area.name} has shown consistent growth in property values
          {area.avgPricePerSqFt && ` with an average price of ₹${area.avgPricePerSqFt.toLocaleString()} per sq ft`}.
          {area.popularFor?.[0] && ` The area is particularly popular among ${area.popularFor[0].toLowerCase()} buyers.`}
          {area.priceRangeMax && ` Property prices range from ${area.startingPrice} to ${area.priceRangeMax}.`}
        </p>
      </div>
    </motion.section>
  );
};