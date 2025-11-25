"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CONTACT_INFO } from "@/constants/contact";
import { getWhyChooseUsContent } from "@/lib/data/home-content";
import { Button } from "@/components/ui/Button";
import {
  FaAward,
  FaUserShield,
  FaHandshake,
  FaChartLine,
  FaHome,
  FaCertificate,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";

const iconMap: { [key: string]: any } = {
  award: FaAward,
  userShield: FaUserShield,
  handshake: FaHandshake,
  chartLine: FaChartLine,
  home: FaHome,
  certificate: FaCertificate,
};

const colorMap: { [key: string]: { text: string; bg: string } } = {
  primary: { text: "text-primary-600", bg: "bg-primary-100" },
  success: { text: "text-success-600", bg: "bg-success-100" },
  accent: { text: "text-accent-600", bg: "bg-accent-100" },
  secondary: { text: "text-secondary-600", bg: "bg-secondary-100" },
};

export const WhyChooseUs = () => {
  const content = getWhyChooseUsContent();

  const features = content.features.map(f => ({
    icon: iconMap[f.icon],
    title: f.title,
    description: f.description,
    color: colorMap[f.color].text,
    bgColor: colorMap[f.color].bg,
  }));

  const achievements = [
    { number: CONTACT_INFO.statistics.propertiesSold, ...content.achievements[0] },
    { number: CONTACT_INFO.statistics.happyCustomers, ...content.achievements[1] },
    { number: CONTACT_INFO.statistics.yearsInBusiness, ...content.achievements[2] },
    content.achievements[3],
  ];

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
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 text-primary-600 mb-4">
                <FaAward className="text-2xl" />
                <span className="text-sm font-semibold uppercase tracking-wider">{content.badge}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
                {content.title} <span className="text-primary-600">{content.titleHighlighted}</span> {content.titleSuffix}
              </h2>
              <p className="text-lg text-secondary-600">
                {content.description}
              </p>
            </div>

            {/* Features Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-6 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex gap-4"
                >
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className={`text-xl ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-secondary-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => window.open(`tel:${CONTACT_INFO.primaryPhone}`, "_self")}
                leftIcon={<FaPhoneAlt />}
              >
                {content.ctaButton}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = "/about"}
              >
                Know More About Us
              </Button>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-hard bg-secondary-200">
              <Image
                src="/images/why-choose-us.jpg"
                alt="Mahadev Real Estate Office"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
                unoptimized
              />

              {/* Overlay Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-hard">
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="text-center"
                    >
                      <p className="text-2xl lg:text-3xl font-bold text-primary-600">
                        {achievement.number}{achievement.suffix}
                      </p>
                      <p className="text-sm text-secondary-600">{achievement.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -top-4 -right-4 bg-success-600 text-white p-4 rounded-full shadow-hard"
            >
              <div className="text-center">
                <FaCheckCircle className="text-3xl mb-1 mx-auto" />
                <p className="text-xs font-semibold">VERIFIED</p>
              </div>
            </motion.div>

            {/* Certification Badges */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              {CONTACT_INFO.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-secondary-50 px-4 py-2 rounded-lg"
                >
                  <p className="text-xs text-secondary-500">{cert.name}</p>
                  <p className="text-sm font-semibold text-secondary-700">
                    {cert.registrationNo}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};