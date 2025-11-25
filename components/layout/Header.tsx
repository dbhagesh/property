"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AREAS } from "@/constants/areas";
import { CONTACT_INFO, getWhatsAppUrl } from "@/constants/contact";
import { SITE_NAME, SITE_TAGLINE, LOGO_ALT } from "@/constants/branding";
import {
  FaBars,
  FaTimes,
  FaPhone,
  FaWhatsapp,
  FaChevronDown,
  FaMapMarkerAlt,
} from "react-icons/fa";

export const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAreaDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 bg-white transition-all duration-300",
          isScrolled && "shadow-medium"
        )}
      >
        {/* Top Bar - Desktop Only */}
        <div className="hidden lg:block bg-primary-600 text-white py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <a
                  href={`tel:${CONTACT_INFO.primaryPhone}`}
                  className="flex items-center gap-2 hover:text-primary-100 transition-colors"
                >
                  <FaPhone className="text-xs" />
                  {CONTACT_INFO.primaryPhone}
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.primaryEmail}`}
                  className="hover:text-primary-100 transition-colors"
                >
                  {CONTACT_INFO.primaryEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-xs" />
                <span>{CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt={LOGO_ALT}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-secondary-900">
                  {SITE_NAME}
                </h1>
                <p className="text-xs text-secondary-600 hidden sm:block">
                  {SITE_TAGLINE}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors hover:text-primary-600",
                    pathname === link.href
                      ? "text-primary-600"
                      : "text-secondary-700"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              {/* Areas Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
                  className={cn(
                    "flex items-center gap-1 font-medium transition-colors hover:text-primary-600",
                    pathname.startsWith("/deals")
                      ? "text-primary-600"
                      : "text-secondary-700"
                  )}
                >
                  Deals in
                  <FaChevronDown
                    className={cn(
                      "text-xs transition-transform",
                      isAreaDropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {isAreaDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-hard border border-secondary-200 py-2">
                    <div className="px-3 py-2 border-b border-secondary-100">
                      <p className="text-xs font-semibold text-secondary-500 uppercase">
                        Browse by Area
                      </p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {AREAS.map((area) => (
                        <Link
                          key={area.slug}
                          href={`/deals/${area.slug}`}
                          className="block px-3 py-2 hover:bg-primary-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-secondary-900">
                                {area.name}
                              </p>
                              <p className="text-xs text-secondary-600">
                                {area.propertyCount} Properties
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-primary-600">
                              {area.startingPrice}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<FaPhone />}
                onClick={() => window.open(`tel:${CONTACT_INFO.primaryPhone}`, "_self")}
              >
                Call Now
              </Button>
              <Button
                variant="whatsapp"
                size="sm"
                leftIcon={<FaWhatsapp />}
                onClick={() => window.open(getWhatsAppUrl(), "_blank")}
              >
                WhatsApp
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-secondary-700 hover:text-primary-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-white shadow-hard max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block py-2 font-medium transition-colors",
                    pathname === link.href
                      ? "text-primary-600"
                      : "text-secondary-700"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              {/* Areas Section - Mobile */}
              <div className="border-t border-secondary-200 pt-4">
                <p className="text-sm font-semibold text-secondary-500 uppercase mb-3">
                  Deals in
                </p>
                <div className="space-y-2">
                  {AREAS.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/deals/${area.slug}`}
                      className="block py-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-secondary-900">
                            {area.name}
                          </p>
                          <p className="text-xs text-secondary-600">
                            {area.propertyCount} Properties • {area.startingPrice}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Buttons - Mobile */}
              <div className="border-t border-secondary-200 pt-4 space-y-3">
                <Button
                  variant="call"
                  size="md"
                  fullWidth
                  leftIcon={<FaPhone />}
                  onClick={() => window.open(`tel:${CONTACT_INFO.primaryPhone}`, "_self")}
                >
                  Call Now
                </Button>
                <Button
                  variant="whatsapp"
                  size="md"
                  fullWidth
                  leftIcon={<FaWhatsapp />}
                  onClick={() => window.open(getWhatsAppUrl(), "_blank")}
                >
                  WhatsApp Us
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isAreaDropdownOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsAreaDropdownOpen(false)}
        />
      )}
    </>
  );
};