import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
}) => {
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-lg",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };

  return (
    <div
      className={cn(
        "bg-secondary-200",
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: width || "100%",
        height: height || "20px",
      }}
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-soft", className)}>
      <Skeleton height={200} variant="rectangular" />
      <div className="p-6 space-y-3">
        <Skeleton height={24} width="75%" />
        <Skeleton height={16} width="50%" />
        <div className="flex gap-2">
          <Skeleton height={20} width={60} variant="rounded" />
          <Skeleton height={20} width={60} variant="rounded" />
          <Skeleton height={20} width={60} variant="rounded" />
        </div>
        <div className="pt-3 border-t border-secondary-100">
          <Skeleton height={32} width="40%" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonPropertyCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-soft", className)}>
      <Skeleton height={224} variant="rectangular" />
      <div className="p-4 space-y-3">
        <div>
          <Skeleton height={24} width="80%" className="mb-2" />
          <Skeleton height={16} width="60%" />
        </div>
        <div className="flex gap-4">
          <Skeleton height={16} width={50} />
          <Skeleton height={16} width={50} />
          <Skeleton height={16} width={60} />
        </div>
        <div className="pt-3 border-t border-secondary-100">
          <Skeleton height={32} width="50%" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={16}
          width={index === lines - 1 ? "80%" : "100%"}
          variant="text"
        />
      ))}
    </div>
  );
};

export const SkeletonAvatar: React.FC<{
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}> = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  return (
    <Skeleton
      className={cn(sizeClasses[size], className)}
      variant="circular"
    />
  );
};

export const SkeletonButton: React.FC<{
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "h-9 w-20",
    md: "h-11 w-24",
    lg: "h-12 w-28",
  };

  return (
    <Skeleton
      className={cn(sizeClasses[size], className)}
      variant="rounded"
    />
  );
};

export const SkeletonTable: React.FC<{
  rows?: number;
  columns?: number;
  className?: string;
}> = ({ rows = 5, columns = 4, className }) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="bg-secondary-100 p-4 border-b border-secondary-200">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} height={16} variant="text" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-secondary-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} height={16} variant="text" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};