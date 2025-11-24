"use client";

import { Area } from "@/constants/areas";
import {
  FaMapMarkerAlt,
  FaSubway,
  FaRoad,
  FaPlane,
  FaBus,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface ConnectivityProps {
  area: Area;
}

export const Connectivity: React.FC<ConnectivityProps> = ({ area }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg p-6 lg:p-8 shadow-soft"
    >
      <div className="flex items-center gap-2 text-primary-600 mb-6">
        <FaMapMarkerAlt className="text-xl" />
        <h2 className="text-2xl font-bold">Connectivity & Transportation</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Metro Connectivity */}
        {area.connectivity.metro && (
          <div className="bg-gradient-to-r from-primary-50 to-white rounded-lg p-5 border border-primary-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <FaSubway className="text-white text-lg" />
              </div>
              <h3 className="font-semibold text-lg text-secondary-900">Metro Stations</h3>
            </div>
            <ul className="space-y-2">
              {area.connectivity.metro.map((station, index) => (
                <li key={index} className="flex items-center gap-2 text-secondary-700">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  {station}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Highway Connectivity */}
        {area.connectivity.highway && (
          <div className="bg-gradient-to-r from-secondary-50 to-white rounded-lg p-5 border border-secondary-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-secondary-600 rounded-full flex items-center justify-center">
                <FaRoad className="text-white text-lg" />
              </div>
              <h3 className="font-semibold text-lg text-secondary-900">Major Highways</h3>
            </div>
            <ul className="space-y-2">
              {area.connectivity.highway.map((highway, index) => (
                <li key={index} className="flex items-center gap-2 text-secondary-700">
                  <div className="w-2 h-2 bg-secondary-600 rounded-full" />
                  {highway}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Airport Connectivity */}
        {area.connectivity.airport && (
          <div className="bg-gradient-to-r from-accent-50 to-white rounded-lg p-5 border border-accent-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center">
                <FaPlane className="text-white text-lg" />
              </div>
              <h3 className="font-semibold text-lg text-secondary-900">Airport Access</h3>
            </div>
            <p className="text-secondary-700">
              <span className="font-medium">{area.connectivity.airport.name}</span>
              <span className="block text-sm mt-1">
                Distance: {area.connectivity.airport.distance}
              </span>
              <span className="block text-sm text-secondary-600">
                Travel Time: ~30-45 minutes by car
              </span>
            </p>
          </div>
        )}

        {/* Public Transport */}
        <div className="bg-gradient-to-r from-success-50 to-white rounded-lg p-5 border border-success-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-success-600 rounded-full flex items-center justify-center">
              <FaBus className="text-white text-lg" />
            </div>
            <h3 className="font-semibold text-lg text-secondary-900">Public Transport</h3>
          </div>
          <ul className="space-y-2 text-secondary-700">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-600 rounded-full" />
              Regular bus services to major areas
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-600 rounded-full" />
              Auto-rickshaw and taxi availability
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-600 rounded-full" />
              App-based cab services available 24/7
            </li>
          </ul>
        </div>
      </div>

      {/* Key Distances - from database if available */}
      {area.connectivity && typeof area.connectivity === 'object' && (area.connectivity as any).distances && (
        <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
          <h3 className="font-semibold text-secondary-900 mb-3">Key Distances</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {(area.connectivity as any).distances.map((distance: any, index: number) => (
              <div key={index}>
                <p className="text-secondary-600">{distance.name}</p>
                <p className="font-semibold text-secondary-900">{distance.distance}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
};