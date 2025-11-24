import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div className={cn("animate-spin", sizeClasses[size], className)}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

interface LoadingDotsProps {
  className?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({ className }) => {
  return (
    <div className={cn("flex space-x-1", className)}>
      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" />
    </div>
  );
};

interface PageLoadingProps {
  message?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-50">
      <LoadingSpinner size="xl" className="text-primary-600 mb-4" />
      <p className="text-secondary-600 text-lg font-medium">{message}</p>
    </div>
  );
};

interface SectionLoadingProps {
  message?: string;
  className?: string;
}

export const SectionLoading: React.FC<SectionLoadingProps> = ({
  message = "Loading...",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16",
        className
      )}
    >
      <LoadingSpinner size="lg" className="text-primary-600 mb-3" />
      <p className="text-secondary-600 font-medium">{message}</p>
    </div>
  );
};

interface OverlayLoadingProps {
  isLoading: boolean;
  message?: string;
}

export const OverlayLoading: React.FC<OverlayLoadingProps> = ({
  isLoading,
  message = "Processing...",
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
        <LoadingSpinner size="lg" className="text-primary-600 mb-3" />
        <p className="text-secondary-700 font-medium">{message}</p>
      </div>
    </div>
  );
};