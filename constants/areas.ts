export interface Area {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  description: string;
  overview?: string;
  imageUrl: string;
  propertyCount: number;
  startingPrice: string;
  priceRangeMax?: string;
  avgPricePerSqFt?: number;
  popularFor: string[];
  nearbyLandmarks: string[];
  highlights?: string[];
  connectivity: {
    metro?: string[];
    highway?: string[];
    airport?: { name: string; distance: string };
    distances?: any[];
  };
  amenities?: any;
}

export const AREAS: Area[] = [
  {
    id: "area-imt-kharkhoda",
    name: "IMT Kharkhoda",
    slug: "imt-kharkhoda",
    city: "Kharkhoda",
    state: "Haryana",
    description: "IMT Kharkhoda is a rapidly developing Industrial Model Township located in Sonipat district, offering excellent investment opportunities in industrial plots and commercial spaces.",
    imageUrl: "/images/areas/imt-kharkhoda.webp",
    propertyCount: 120,
    startingPrice: "₹45 Lakhs",
    popularFor: ["Industrial Plots", "Commercial Spaces", "Warehouse Units"],
    nearbyLandmarks: ["NH-44", "IMT Industrial Area", "Kundli Industrial Area"],
    connectivity: {
      highway: ["NH-44 (Delhi-Karnal Highway)", "KMP Expressway"],
      airport: { name: "IGI Airport", distance: "40 km" },
      distances: [
        { name: "Delhi", distance: "40 km" },
        { name: "Sonipat", distance: "15 km" },
        { name: "Kundli", distance: "8 km" }
      ]
    }
  },
  {
    id: "area-bahadurgarh",
    name: "Bahadurgarh",
    slug: "bahadurgarh",
    city: "Bahadurgarh",
    state: "Haryana",
    description: "Bahadurgarh, known as the 'Gateway to Haryana', is a rapidly growing industrial and residential hub with excellent Delhi Metro connectivity.",
    imageUrl: "/images/areas/bahadurgarh.webp",
    propertyCount: 95,
    startingPrice: "₹35 Lakhs",
    popularFor: ["Residential Plots", "Industrial Units", "Commercial Properties"],
    nearbyLandmarks: ["Bahadurgarh Metro Station", "Industrial Area", "Jhajjar Road"],
    connectivity: {
      metro: ["Bahadurgarh City Metro Station (Green Line)"],
      highway: ["NH-9", "Rohtak Road"],
      airport: { name: "IGI Airport", distance: "25 km" },
      distances: [
        { name: "Delhi", distance: "25 km" },
        { name: "Rohtak", distance: "25 km" }
      ]
    }
  },
  {
    id: "area-sonipat",
    name: "Sonipat",
    slug: "sonipat",
    city: "Sonipat",
    state: "Haryana",
    description: "Sonipat is a major educational and industrial hub in Haryana, known for DDJAY (Deen Dayal Jan Awas Yojana) affordable housing plots and agricultural land.",
    imageUrl: "/images/areas/sonipat.webp",
    propertyCount: 180,
    startingPrice: "₹15 Lakhs",
    popularFor: ["DDJAY Plots", "Agricultural Land", "Residential Plots"],
    nearbyLandmarks: ["Sonipat City", "Rai University", "Industrial Areas"],
    connectivity: {
      highway: ["NH-44 (GT Karnal Road)", "NH-709B"],
      airport: { name: "IGI Airport", distance: "45 km" },
      distances: [
        { name: "Delhi", distance: "45 km" },
        { name: "Panipat", distance: "45 km" }
      ]
    }
  },
  {
    id: "area-rohtak",
    name: "Rohtak",
    slug: "rohtak",
    city: "Rohtak",
    state: "Haryana",
    description: "Rohtak is a prominent educational and commercial city in Haryana, home to IIM Rohtak and PGIMS, with growing real estate opportunities.",
    imageUrl: "/images/areas/rohtak.webp",
    propertyCount: 140,
    startingPrice: "₹25 Lakhs",
    popularFor: ["Residential Plots", "Agricultural Land", "Commercial Properties"],
    nearbyLandmarks: ["IIM Rohtak", "PGIMS Hospital", "Rohtak City Center"],
    connectivity: {
      highway: ["NH-9 (Delhi-Rohtak Highway)", "State Highway 13"],
      airport: { name: "IGI Airport", distance: "65 km" },
      distances: [
        { name: "Delhi", distance: "65 km" },
        { name: "Jhajjar", distance: "30 km" },
        { name: "Hisar", distance: "65 km" }
      ]
    }
  }
];

export const getAreaBySlug = (slug: string): Area | undefined => {
  return AREAS.find(area => area.slug === slug);
};

export const getAreasByCity = (city: string): Area[] => {
  return AREAS.filter(area => area.city.toLowerCase() === city.toLowerCase());
};
