"use client";

import Image from "next/image";
import { CONTACT_INFO } from "@/constants/contact";
import { Button } from "@/components/ui/Button";
import {
  FaAward,
  FaUsers,
  FaHome,
  FaHandshake,
  FaCheckCircle,
  FaTrophy,
  FaPhoneAlt,
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutContent() {
  const stats = [
    { icon: FaHome, value: CONTACT_INFO.statistics.propertiesSold, label: "Properties Sold" },
    { icon: FaUsers, value: CONTACT_INFO.statistics.happyCustomers, label: "Happy Families" },
    { icon: FaAward, value: CONTACT_INFO.statistics.yearsInBusiness, label: "Years of Trust" },
    { icon: FaHandshake, value: CONTACT_INFO.statistics.teamMembers, label: "Expert Team" },
  ];

  const values = [
    {
      icon: FaCheckCircle,
      title: "Integrity & Trust",
      description: "We believe in transparent dealings and building long-term relationships based on trust.",
    },
    {
      icon: FaTrophy,
      title: "Excellence",
      description: "We strive for excellence in every transaction, ensuring the best outcomes for our clients.",
    },
    {
      icon: FaUsers,
      title: "Customer First",
      description: "Your satisfaction is our priority. We go above and beyond to meet your expectations.",
    },
    {
      icon: FaHandshake,
      title: "Professional Service",
      description: "Our team of experts provides professional guidance throughout your property journey.",
    },
  ];

  const teamMembers = [
    {
      name: "Arvind",
      role: "Co-Founder",
      image: "/images/team/arvind.jpg",
      experience: "15+ years",
      linkedin: "https://linkedin.com",
      email: CONTACT_INFO.primaryEmail,
    },
    {
      name: "Lokesh",
      role: "Co-Founder",
      image: "/images/team/lokesh.jpg",
      experience: "15+ years",
      linkedin: "https://linkedin.com",
      email: CONTACT_INFO.primaryEmail,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
                About <span className="text-primary-600">Mahadev Real Estate</span>
              </h1>
              <p className="text-xl text-secondary-600 mb-8">
                {CONTACT_INFO.tagline}
              </p>
              <p className="text-lg text-secondary-700 leading-relaxed">
                With over {CONTACT_INFO.statistics.yearsInBusiness} years of experience in Haryana&apos;s real estate market,
                Mahadev Real Estate has established itself as the most trusted property dealer in the region.
                We&apos;ve helped over {CONTACT_INFO.statistics.happyCustomers} families find their dream homes and
                assisted countless investors in making profitable property decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-secondary-900 mb-2">{stat.value}</h3>
                  <p className="text-secondary-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
                Our Story & Mission
              </h2>
              <p className="text-secondary-600 mb-4">
                Founded in 2004, Mahadev Real Estate began with a simple vision: to make property buying and selling a
                transparent, trustworthy, and hassle-free experience for everyone in Haryana.
              </p>
              <p className="text-secondary-600 mb-4">
                Over the years, we&apos;ve grown from a small team of passionate real estate professionals to one of
                Gurgaon&apos;s most recognized property consultancy firms. Our success is built on the foundation of trust,
                expertise, and an unwavering commitment to our clients&apos; satisfaction.
              </p>
              <p className="text-secondary-600 mb-6">
                Today, we pride ourselves on our deep understanding of Gurgaon&apos;s real estate landscape, from emerging
                sectors to established neighborhoods. Whether you&apos;re a first-time homebuyer, a seasoned investor, or
                looking to sell your property, we&apos;re here to guide you every step of the way.
              </p>
              <Button
                onClick={() => window.location.href = "/contact"}
                variant="primary"
                size="lg"
              >
                Start Your Property Journey
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-96 lg:h-full rounded-lg overflow-hidden shadow-xl bg-secondary-200"
            >
              <Image
                src="/images/office.jpg"
                alt="Mahadev Real Estate Office"
                fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              These principles guide everything we do and how we serve our clients
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-4">
                    <Icon className="w-10 h-10 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">{value.title}</h3>
                  <p className="text-secondary-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Dedicated professionals with deep knowledge of Gurgaon&apos;s real estate market
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-64 bg-secondary-200">
                  {member.image && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-secondary-600 mb-4">{member.experience} Experience</p>
                  <div className="flex space-x-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-400 hover:text-primary-600 transition-colors"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-secondary-400 hover:text-primary-600 transition-colors"
                    >
                      <FaEnvelope className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose Mahadev Real Estate?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Transparency</h3>
              <p className="text-secondary-600">No hidden charges or surprise fees. Everything is clear upfront.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Support</h3>
              <p className="text-secondary-600">Our team is always available to help you with your queries.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">Zero</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Hassles</h3>
              <p className="text-secondary-600">We handle all the paperwork and legal formalities for you.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Let our experts guide you through your property journey with trust and transparency
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = `tel:${CONTACT_INFO.primaryPhone}`}
                variant="secondary"
                size="lg"
                className="inline-flex items-center"
              >
                <FaPhoneAlt className="mr-2" />
                Call Now: {CONTACT_INFO.primaryPhone}
              </Button>
              <Button
                onClick={() => window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}`, '_blank')}
                variant="outline"
                size="lg"
                className="inline-flex items-center text-white border-white hover:bg-white hover:text-primary-600"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}