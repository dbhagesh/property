import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AREAS } from "@/constants/areas";
import { FaHome, FaSearch, FaPhoneAlt, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  const popularAreas = AREAS.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600/20">404</h1>
          <div className="relative -mt-20">
            <FaHome className="text-6xl text-primary-600 mx-auto animate-bounce" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
          The property page you&apos;re looking for seems to have been moved or doesn&apos;t exist.
          Don&apos;t worry, we have plenty of other amazing properties for you to explore!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link href="/">
            <Button size="lg" leftIcon={<FaArrowLeft />}>
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" leftIcon={<FaPhoneAlt />}>
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Popular Areas */}
        <div className="bg-white rounded-lg shadow-soft p-8">
          <h3 className="text-2xl font-bold text-secondary-900 mb-6">
            Explore Popular Areas
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularAreas.map((area) => (
              <Link
                key={area.id}
                href={`/deals/${area.slug}`}
                className="bg-secondary-50 hover:bg-primary-50 rounded-lg p-4 transition-colors group"
              >
                <FaSearch className="text-2xl text-primary-600 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-secondary-900">{area.name}</h4>
                <p className="text-sm text-secondary-600">
                  {area.propertyCount}+ properties
                </p>
                <p className="text-sm text-primary-600 font-semibold">
                  From {area.startingPrice}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-secondary-600">
          <p className="mb-2">
            Still can&apos;t find what you&apos;re looking for?
          </p>
          <p>
            Call us at{" "}
            <a
              href="tel:+919876543210"
              className="text-primary-600 font-semibold hover:underline"
            >
              +91-9876543210
            </a>{" "}
            for personalized assistance.
          </p>
        </div>
      </div>
    </div>
  );
}