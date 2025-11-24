"use client";

import { useState } from "react";
import { Area } from "@/constants/areas";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface AreaFAQProps {
  area: Area;
}

export const AreaFAQ: React.FC<AreaFAQProps> = ({ area }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: `What is the average property price in ${area.name}?`,
      answer: `The average property price in ${area.name} starts from ${area.startingPrice}. The exact price depends on factors like property type, size, floor, facing, and specific location within the area. 2BHK apartments typically range from ₹65 Lakhs to ₹1.5 Crores, while 3BHK units can go from ₹1.2 Crores to ₹3 Crores.`,
    },
    {
      question: `Is ${area.name} a good area for investment?`,
      answer: `Yes, ${area.name} is an excellent choice for investment. The area has shown consistent appreciation of 10-15% annually, offers good rental yields of 3-4%, and has excellent connectivity. With upcoming infrastructure projects and its proximity to major business hubs, the investment potential is very promising.`,
    },
    {
      question: `What types of properties are available in ${area.name}?`,
      answer: `${area.name} offers a diverse range of properties including ${area.popularFor.join(", ")}. You can find everything from affordable 2BHK apartments to luxury villas, builder floors, and commercial spaces. Both ready-to-move and under-construction options are available.`,
    },
    {
      question: `How is the connectivity from ${area.name}?`,
      answer: area.connectivity.metro
        ? `${area.name} has excellent connectivity with metro stations like ${area.connectivity.metro.join(", ")}. It's well-connected via ${area.connectivity.highway?.join(", ") || "major highways"} and is approximately ${area.connectivity.airport?.distance || "20-30 km"} from the airport.`
        : `${area.name} is well-connected via ${area.connectivity.highway?.join(", ") || "major highways"} and is approximately ${area.connectivity.airport?.distance || "20-30 km"} from the airport. Public transport and cab services are readily available.`,
    },
    {
      question: `What are the nearby landmarks and amenities?`,
      answer: `${area.name} is close to major landmarks including ${area.nearbyLandmarks.join(", ")}. The area has excellent social infrastructure with reputed schools, hospitals, shopping malls, and entertainment centers all within 5-10 km radius.`,
    },
    {
      question: `Is it a good time to buy property in ${area.name}?`,
      answer: `Yes, now is an opportune time to invest in ${area.name}. With upcoming infrastructure developments and before the completion of major projects, property prices are still reasonable. Post-development, prices are expected to appreciate significantly.`,
    },
    {
      question: `What is the rental yield in ${area.name}?`,
      answer: `The rental yield in ${area.name} typically ranges from 3% to 4.5% annually, depending on the property type and location. 2BHK apartments can fetch ₹25,000-40,000 per month, while 3BHK units can command ₹35,000-70,000 monthly rent.`,
    },
    {
      question: `Are there any upcoming projects in ${area.name}?`,
      answer: `Yes, several reputed developers have announced new projects in ${area.name}. These include residential complexes, commercial spaces, and mixed-use developments. Our team can provide you with detailed information about pre-launch and new launch projects with the best deals.`,
    },
    {
      question: `What documents are required for property purchase?`,
      answer: `For property purchase, you'll need: PAN card, Aadhaar card, address proof, income proof (salary slips/ITR), bank statements, passport-size photographs, and a cheque for booking amount. Our team will guide you through the complete documentation process.`,
    },
    {
      question: `Do you assist with home loans?`,
      answer: `Yes, we have tie-ups with all major banks and financial institutions. We assist our clients in getting home loans at competitive interest rates with minimal documentation. Our team handles the entire loan process from application to disbursement.`,
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
        <FaQuestionCircle className="text-xl" />
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="border border-secondary-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-5 py-4 bg-white hover:bg-secondary-50 transition-colors flex items-center justify-between text-left"
            >
              <span className="font-medium text-secondary-900 pr-4">{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp className="text-primary-600 flex-shrink-0" />
              ) : (
                <FaChevronDown className="text-secondary-400 flex-shrink-0" />
              )}
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 py-4 bg-secondary-50 text-secondary-700 border-t border-secondary-200">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <p className="text-sm text-primary-700">
          <strong>Have more questions?</strong> Our property experts are here to help.
          Call us at {CONTACT_INFO.primaryPhone} or WhatsApp for instant assistance.
        </p>
      </div>
    </motion.section>
  );
};

import { CONTACT_INFO } from "@/constants/contact";