"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { getTestimonials, getTestimonialStats, getInitials, getAvatarColor } from "@/lib/data/testimonials";

const testimonials = getTestimonials();
const stats = getTestimonialStats();

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-primary-600 mb-4">
            <FaStar className="text-2xl" />
            <span className="text-sm font-semibold uppercase tracking-wider">Client Testimonials</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            What Our <span className="text-primary-600">Happy Clients</span> Say
          </h2>
          <p className="text-lg text-secondary-600">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their experience with Mahadev Real Estate.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-soft p-8 lg:p-10"
              >
                <FaQuoteLeft className="text-4xl text-primary-200 mb-6" />

                <p className="text-lg text-secondary-700 mb-8 leading-relaxed">
                  {testimonials[currentIndex].text}
                </p>

                <div className="flex items-center gap-4">
                  {/* Colored Avatar with Initials */}
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl",
                    getAvatarColor(testimonials[currentIndex].name)
                  )}>
                    {getInitials(testimonials[currentIndex].name)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-secondary-900">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-secondary-600">
                      {testimonials[currentIndex].property} • {testimonials[currentIndex].location}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-1">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <FaStar key={i} className="text-accent-500 text-sm" />
                        ))}
                      </div>
                      <span className="text-xs text-secondary-500">
                        {testimonials[currentIndex].date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 bg-white rounded-full shadow-medium flex items-center justify-center hover:bg-primary-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="text-secondary-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 bg-white rounded-full shadow-medium flex items-center justify-center hover:bg-primary-50 transition-colors"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="text-secondary-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "w-8 bg-primary-600"
                    : "bg-secondary-300 hover:bg-secondary-400"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: stats.averageRating, label: "Average Rating" },
            { value: stats.happyCustomers, label: "Happy Customers" },
            { value: stats.satisfactionRate, label: "Satisfaction Rate" },
            { value: stats.customerSupport, label: "Customer Support" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-lg p-4 shadow-soft"
            >
              <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
              <p className="text-sm text-secondary-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};