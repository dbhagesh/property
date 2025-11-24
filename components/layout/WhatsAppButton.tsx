"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { getWhatsAppUrl } from "@/constants/contact";
import { cn } from "@/lib/utils";

export const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip after button appears
      setTimeout(() => {
        setShowTooltip(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => {
          setShowTooltip(false);
        }, 5000);
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    // Track WhatsApp click event (you can add analytics here)
    window.open(getWhatsAppUrl(), "_blank");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-3 animate-fade-in-up">
            <div className="relative bg-white text-secondary-900 px-4 py-2 rounded-lg shadow-hard whitespace-nowrap">
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-secondary-100 hover:bg-secondary-200 rounded-full flex items-center justify-center transition-colors"
              >
                <FaTimes className="text-xs" />
              </button>
              <p className="text-sm font-medium">Need help? Chat with us!</p>
              <p className="text-xs text-secondary-600">We typically reply in minutes</p>
              {/* Tooltip arrow */}
              <div className="absolute bottom-0 right-6 transform translate-y-full">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
              </div>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={handleClick}
          className={cn(
            "group relative w-14 h-14 bg-[#25D366] hover:bg-[#1da851] rounded-full shadow-hard hover:shadow-xl transition-all duration-300 hover:scale-110",
            "flex items-center justify-center",
            "animate-fade-in"
          )}
          aria-label="Chat on WhatsApp"
        >
          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>

          {/* Icon */}
          <FaWhatsapp className="text-white text-2xl relative z-10" />

          {/* Hover Text */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-secondary-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with us
          </span>
        </button>

        {/* Mobile Only - Text below button */}
        <p className="text-center text-xs text-secondary-600 mt-1 sm:hidden">
          Chat Now
        </p>
      </div>

      {/* Alternative Design - WhatsApp Bar (Hidden by default, can be enabled) */}
      {false && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#25D366] text-white p-3 z-40 lg:hidden">
          <button
            onClick={handleClick}
            className="w-full flex items-center justify-center gap-3"
          >
            <FaWhatsapp className="text-2xl" />
            <div className="text-left">
              <p className="font-semibold">Chat on WhatsApp</p>
              <p className="text-xs opacity-90">Get instant property assistance</p>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

// Call to Action WhatsApp Button (for use in sections)
interface WhatsAppCTAProps {
  message?: string;
  buttonText?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  message,
  buttonText = "Chat on WhatsApp",
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const handleClick = () => {
    const url = message ? getWhatsAppUrl(message) : getWhatsAppUrl();
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl",
        sizeClasses[size],
        className
      )}
    >
      <FaWhatsapp className="text-xl" />
      {buttonText}
    </button>
  );
};