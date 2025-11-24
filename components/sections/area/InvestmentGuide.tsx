"use client";

import { Area } from "@/constants/areas";
import { FaChartLine, FaLightbulb, FaShieldAlt, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

interface InvestmentGuideProps {
  area: Area;
}

export const InvestmentGuide: React.FC<InvestmentGuideProps> = ({ area }) => {
  const investmentReasons = [
    {
      icon: FaChartLine,
      title: "High Appreciation Potential",
      description: "Property values have shown consistent growth of 10-15% annually over the past 5 years.",
    },
    {
      icon: FaLightbulb,
      title: "Infrastructure Development",
      description: "Upcoming metro expansion and highway connectivity will boost property values significantly.",
    },
    {
      icon: FaShieldAlt,
      title: "Trusted Developers",
      description: "Major developers like DLF, Godrej, and M3M have projects in this area.",
    },
    {
      icon: FaTrophy,
      title: "Premium Location",
      description: "Close proximity to business hubs, making it ideal for both residential and commercial investment.",
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
        <FaChartLine className="text-xl" />
        <h2 className="text-2xl font-bold">Investment Guide</h2>
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-lg text-secondary-900 mb-3">
          Why Invest in {area.name}?
        </h3>
        <p className="text-secondary-700">
          {area.name} represents one of the most promising investment opportunities in {area.city}.
          With excellent connectivity, modern infrastructure, and continuous development, this area
          offers both capital appreciation and rental income potential.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {investmentReasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex gap-4 p-4 border border-secondary-200 rounded-lg hover:shadow-medium transition-shadow"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <reason.icon className="text-primary-600 text-xl" />
            </div>
            <div>
              <h4 className="font-semibold text-secondary-900 mb-1">{reason.title}</h4>
              <p className="text-sm text-secondary-600">{reason.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-secondary-50 rounded-lg p-6">
        <h3 className="font-semibold text-secondary-900 mb-4">ROI Calculator</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-secondary-600 mb-1">Investment Amount</p>
            <p className="text-xl font-bold text-primary-600">₹1 Crore</p>
          </div>
          <div>
            <p className="text-sm text-secondary-600 mb-1">Expected Returns (5 years)</p>
            <p className="text-xl font-bold text-success-600">₹1.6 Crores</p>
          </div>
          <div>
            <p className="text-sm text-secondary-600 mb-1">Annual ROI</p>
            <p className="text-xl font-bold text-accent-600">12-15%</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-warning-50 rounded-lg border border-warning-200">
        <p className="text-sm text-warning-800">
          <strong>Investment Tip:</strong> The best time to invest in {area.name} is now, before the
          upcoming infrastructure projects are completed. Contact our experts for personalized investment advice.
        </p>
      </div>
    </motion.section>
  );
};