"use client";

import { useState } from "react";
import { CONTACT_INFO, getFullAddress, getWhatsAppUrl } from "@/constants/contact";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    propertyType: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          message: `${formData.subject ? `Subject: ${formData.subject}\n` : ''}${formData.propertyType ? `Property Type: ${formData.propertyType}\n` : ''}${formData.budget ? `Budget: ${formData.budget}\n` : ''}\n${formData.message}`,
          source: 'contact-page'
        }),
      });

      if (response.ok) {
        alert("Thank you for your inquiry! We'll contact you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          propertyType: "",
          budget: "",
          message: "",
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Ready to find your dream property? Contact our expert team today
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                  />
                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Property Inquiry"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    label="Property Type"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Select Type" },
                      { value: "residential", label: "Residential" },
                      { value: "commercial", label: "Commercial" },
                      { value: "plot", label: "Plot/Land" },
                      { value: "rental", label: "Rental" },
                    ]}
                  />
                  <Select
                    label="Budget Range"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Select Budget" },
                      { value: "50L-1Cr", label: "50 Lakh - 1 Crore" },
                      { value: "1Cr-2Cr", label: "1 - 2 Crore" },
                      { value: "2Cr-5Cr", label: "2 - 5 Crore" },
                      { value: "5Cr+", label: "5 Crore+" },
                    ]}
                  />
                </div>

                <Textarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your requirements..."
                />

                {/* Honeypot field for spam prevention */}
                <input
                  type="text"
                  name="honeypot"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                {/* Office Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Address</h3>
                    <p className="text-gray-600">{getFullAddress()}</p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaPhone className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone Numbers</h3>
                    <p className="text-gray-600">
                      <a href={`tel:${CONTACT_INFO.primaryPhone}`} className="hover:text-blue-600 transition-colors">
                        {CONTACT_INFO.primaryPhone}
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href={`tel:${CONTACT_INFO.secondaryPhone}`} className="hover:text-blue-600 transition-colors">
                        {CONTACT_INFO.secondaryPhone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${CONTACT_INFO.primaryEmail}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {CONTACT_INFO.primaryEmail}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {CONTACT_INFO.primaryPhone}
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaClock className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sunday: 11:00 AM - 5:00 PM</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {CONTACT_INFO.socialMedia.facebook && (
                      <a
                        href={CONTACT_INFO.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <FaFacebook className="text-white" />
                      </a>
                    )}
                    {CONTACT_INFO.socialMedia.instagram && (
                      <a
                        href={CONTACT_INFO.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-all"
                      >
                        <FaInstagram className="text-white" />
                      </a>
                    )}
                    {CONTACT_INFO.socialMedia.linkedin && (
                      <a
                        href={CONTACT_INFO.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                      >
                        <FaLinkedin className="text-white" />
                      </a>
                    )}
                    {CONTACT_INFO.socialMedia.twitter && (
                      <a
                        href={CONTACT_INFO.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                      >
                        <FaTwitter className="text-white" />
                      </a>
                    )}
                    {CONTACT_INFO.socialMedia.youtube && (
                      <a
                        href={CONTACT_INFO.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                      >
                        <FaYoutube className="text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Find Us</h2>
          <div className="aspect-w-16 aspect-h-9 md:aspect-h-6 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.8!2d77.08!3d28.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI4JzQ4LjAiTiA3N8KwMDQnNDguMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Office Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}