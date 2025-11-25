"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CONTACT_INFO, getFullAddress, getDisplayPhoneNumbers } from "@/constants/contact";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

interface Area {
  id: string;
  name: string;
  slug: string;
  propertyCount: number;
}

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('/api/areas');
        const data = await response.json();
        if (data.success && data.data) {
          setAreas(data.data.slice(0, 6)); // Only show first 6 areas in footer
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
        setAreas([]);
      }
    };

    fetchAreas();
  }, []);

  return (
    <footer className="bg-secondary-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-secondary-800 border-b border-secondary-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Subscribe to Our Newsletter</h3>
              <p className="text-secondary-300">Get latest property updates and exclusive deals</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-lg bg-white text-secondary-900 placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-64"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-secondary-900 hover:bg-secondary-800 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
                <FaArrowRight className="text-sm" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-heading">{CONTACT_INFO.companyName}</h2>
              <p className="text-secondary-400 mt-2">{CONTACT_INFO.tagline}</p>
            </div>
            <p className="text-secondary-300 mb-4 text-sm">
              Leading property dealer in Haryana with {CONTACT_INFO.statistics.yearsInBusiness}+ years
              of experience, {CONTACT_INFO.statistics.propertiesSold}+ properties sold,
              and {CONTACT_INFO.statistics.happyCustomers}+ happy customers.
            </p>
            <div className="flex gap-3">
              <a
                href={CONTACT_INFO.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-800 hover:bg-accent-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href={CONTACT_INFO.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-800 hover:bg-accent-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href={CONTACT_INFO.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-800 hover:bg-accent-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href={CONTACT_INFO.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-800 hover:bg-accent-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href={CONTACT_INFO.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-800 hover:bg-accent-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Properties by Area */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Properties by Area</h3>
            <ul className="space-y-2">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/deals/${area.slug}`}
                    className="text-secondary-300 hover:text-accent-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-xs text-secondary-500 group-hover:text-accent-400 transition-colors" />
                    {area.name} ({area.propertyCount})
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/deals"
                  className="text-accent-400 hover:text-accent-300 transition-colors text-sm font-semibold"
                >
                  View All Areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-secondary-300 hover:text-accent-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-secondary-300 hover:text-accent-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary-300 hover:text-accent-400 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-secondary-300 hover:text-accent-400 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-secondary-300 hover:text-accent-400 transition-colors text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-secondary-300 hover:text-accent-400 transition-colors text-sm"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent-400 mt-1 flex-shrink-0" />
                <span className="text-secondary-300 text-sm">
                  {getFullAddress()}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.primaryPhone}`}
                  className="flex items-center gap-3 text-secondary-300 hover:text-accent-400 transition-colors text-sm"
                >
                  <FaPhone className="text-accent-400 flex-shrink-0" />
                  {getDisplayPhoneNumbers()}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.primaryEmail}`}
                  className="flex items-center gap-3 text-secondary-300 hover:text-accent-400 transition-colors text-sm"
                >
                  <FaEnvelope className="text-accent-400 flex-shrink-0" />
                  {CONTACT_INFO.primaryEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="text-accent-400 mt-1 flex-shrink-0" />
                <div className="text-secondary-300 text-sm">
                  <p>Mon-Sat: {CONTACT_INFO.businessHours.weekdays}</p>
                  <p>Sunday: {CONTACT_INFO.businessHours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-secondary-800 mt-8 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            {CONTACT_INFO.certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-secondary-400">{cert.name}</p>
                <p className="text-sm font-semibold text-secondary-300">
                  {cert.registrationNo}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary-800 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-400 text-sm text-center md:text-left">
              © {currentYear} {CONTACT_INFO.companyName}. All rights reserved.
            </p>
            <p className="text-secondary-500 text-xs text-center md:text-right">
              Designed & Developed with ❤️ for Haryana Real Estate
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};