export interface Property {
  id: string;
  title: string;
  slug: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  priceDisplay: string;
  area: {
    value: number;
    unit: "sqft" | "sqm" | "sqyd";
  };
  location: {
    address: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  features: PropertyFeatures;
  images: PropertyImage[];
  description: string;
  amenities: string[];
  nearbyPlaces: NearbyPlace[];
  postedDate: Date;
  updatedDate: Date;
  viewCount: number;
  isFeatured: boolean;
  isVerified: boolean;
}

export type PropertyType =
  | "apartment"
  | "villa"
  | "plot"
  | "builder-floor"
  | "penthouse"
  | "studio"
  | "duplex"
  | "commercial"
  | "office-space"
  | "shop"
  | "warehouse";

export type PropertyStatus =
  | "available"
  | "sold"
  | "under-offer"
  | "coming-soon";

export interface PropertyFeatures {
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  parkingSpaces?: number;
  floors?: number;
  totalFloors?: number;
  furnishing?: "furnished" | "semi-furnished" | "unfurnished";
  facing?: "north" | "south" | "east" | "west" | "north-east" | "north-west" | "south-east" | "south-west";
  age?: number; // in years
  possession?: "ready-to-move" | "under-construction";
  possessionDate?: Date;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  isPrimary: boolean;
  order: number;
}

export interface NearbyPlace {
  name: string;
  type: "school" | "hospital" | "mall" | "metro" | "bus-stop" | "airport" | "railway" | "park" | "restaurant";
  distance: number; // in km
  travelTime?: string; // e.g., "10 mins"
}

export interface PropertyFilter {
  type?: PropertyType[];
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  bedrooms?: number[];
  location?: string[];
  furnishing?: string[];
  possession?: string[];
  sortBy?: "price-asc" | "price-desc" | "date-new" | "date-old" | "area-asc" | "area-desc";
}

export interface PropertySearchResult {
  properties: Property[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  filters: PropertyFilter;
}