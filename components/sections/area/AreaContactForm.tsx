"use client";

import { useState } from "react";
import { Area } from "@/constants/areas";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { CONTACT_INFO, getWhatsAppUrl } from "@/constants/contact";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

interface AreaContactFormProps {
  area: Area;
}

export const AreaContactForm: React.FC<AreaContactFormProps> = ({ area }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your inquiry! Our team will contact you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "",
        budget: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <h3 className="text-xl font-bold text-secondary-900 mb-2">
        Get Best Deals in {area.name}
      </h3>
      <p className="text-sm text-secondary-600 mb-4">
        Fill the form below or call us directly for immediate assistance
      </p>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button
          variant="whatsapp"
          size="sm"
          fullWidth
          leftIcon={<FaWhatsapp />}
          onClick={() => {
            const message = `Hi, I need information about properties in ${area.name}`;
            window.open(getWhatsAppUrl(message), "_blank");
          }}
        >
          WhatsApp
        </Button>
        <Button
          variant="call"
          size="sm"
          fullWidth
          leftIcon={<FaPhone />}
          onClick={() => window.open(`tel:${CONTACT_INFO.primaryPhone}`, "_self")}
        >
          Call Now
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 top-0 flex items-center">
          <div className="w-full border-t border-secondary-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-sm text-secondary-500">Or fill the form</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          required
        />

        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />

        <Select
          label="Property Type"
          name="propertyType"
          value={formData.propertyType}
          onChange={handleInputChange}
          options={[
            { value: "", label: "Select property type" },
            { value: "2bhk", label: "2 BHK Apartment" },
            { value: "3bhk", label: "3 BHK Apartment" },
            { value: "4bhk", label: "4 BHK Apartment" },
            { value: "villa", label: "Villa" },
            { value: "plot", label: "Plot" },
            { value: "commercial", label: "Commercial Space" },
          ]}
          required
        />

        <Select
          label="Budget Range"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          options={[
            { value: "", label: "Select budget" },
            { value: "50L-1Cr", label: "₹50 Lakhs - ₹1 Crore" },
            { value: "1Cr-2Cr", label: "₹1 Crore - ₹2 Crores" },
            { value: "2Cr-3Cr", label: "₹2 Crores - ₹3 Crores" },
            { value: "3Cr-5Cr", label: "₹3 Crores - ₹5 Crores" },
            { value: "5Cr+", label: "₹5 Crores & Above" },
          ]}
          required
        />

        <Textarea
          label="Message (Optional)"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Any specific requirements..."
          rows={3}
        />

        <Button type="submit" fullWidth loading={isSubmitting}>
          Submit Inquiry
        </Button>
      </form>

      <p className="text-xs text-secondary-500 text-center mt-4">
        By submitting, you agree to our terms and privacy policy.
        We promise not to spam you.
      </p>
    </div>
  );
};