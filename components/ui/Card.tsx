import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { FaMapMarkerAlt, FaRupeeSign, FaHome, FaChartLine } from "react-icons/fa";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-white",
      bordered: "bg-white border border-secondary-200",
      elevated: "bg-white shadow-soft hover:shadow-medium transition-shadow duration-200",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg overflow-hidden",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 py-4 border-b border-secondary-100", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 py-4 border-t border-secondary-100", className)}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

// Specialized Area Card Component
interface AreaCardProps {
  name: string;
  slug: string;
  city: string;
  imageUrl: string;
  propertyCount: number;
  startingPrice: string;
  popularFor: string[];
}

export const AreaCard: React.FC<AreaCardProps> = ({
  name,
  slug,
  city,
  imageUrl,
  propertyCount,
  startingPrice,
  popularFor,
}) => {
  return (
    <Link href={`/deals/${slug}`}>
      <Card variant="elevated" className="group cursor-pointer h-full">
        <div className="relative h-48 overflow-hidden bg-secondary-200">
          {imageUrl && (
            <OptimizedImage
              src={imageUrl}
              alt={`Properties in ${name}, ${city}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm flex items-center gap-1">
              <FaMapMarkerAlt className="text-xs" />
              {city}
            </p>
          </div>
        </div>

        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-secondary-600">
              <FaHome />
              <span className="text-sm font-medium">{propertyCount} Properties</span>
            </div>
            <div className="flex items-center gap-1 text-primary-600 font-bold">
              <FaRupeeSign className="text-sm" />
              <span>{startingPrice.replace("₹", "")}</span>
            </div>
          </div>

          {popularFor && popularFor.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-secondary-500 font-medium">Popular for:</p>
              <div className="flex flex-wrap gap-1">
                {popularFor.slice(0, 3).map((type, index) => (
                  <span
                    key={index}
                    className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <span className="text-sm font-semibold text-primary-600 group-hover:text-primary-700 flex items-center gap-1">
              View Properties
              <FaChartLine className="text-xs" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// Property Card Component
interface PropertyCardProps {
  title: string;
  price: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area: string;
  imageUrl: string;
  propertyType: string;
  isNew?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  propertyType,
  isNew = false,
}) => {
  return (
    <Card variant="elevated" className="group cursor-pointer">
      <div className="relative h-56 overflow-hidden bg-secondary-200">
        {imageUrl && (
          <OptimizedImage
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {isNew && (
          <div className="absolute top-4 left-4 bg-success-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            New Listing
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-secondary-900">
          {propertyType}
        </div>
      </div>

      <CardContent className="space-y-3">
        <div>
          <h3 className="font-bold text-lg text-secondary-900 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-secondary-600 flex items-center gap-1 mt-1">
            <FaMapMarkerAlt className="text-xs" />
            {location}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-secondary-700">
          {bedrooms && (
            <span>{bedrooms} Beds</span>
          )}
          {bathrooms && (
            <span>{bathrooms} Baths</span>
          )}
          <span>{area}</span>
        </div>

        <div className="pt-3 border-t border-secondary-100">
          <p className="text-2xl font-bold text-primary-600 flex items-center gap-1">
            <FaRupeeSign className="text-lg" />
            {price}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};