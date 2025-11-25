import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
  quality?: number;
}

/**
 * Optimized Image component for WebP images
 * Simple wrapper around Next.js Image with sensible defaults
 * All images are pre-converted to WebP format via scripts/convert-to-webp.js
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  loading,
  sizes,
  quality = 80,
}) => {
  const imageProps = {
    src,
    alt,
    className,
    unoptimized: true,
    ...(priority && { priority: true }),
    ...(loading && { loading }),
    ...(sizes && { sizes }),
    ...(quality && { quality }),
  };

  if (fill) {
    return <Image {...imageProps} fill />;
  }

  if (width && height) {
    return <Image {...imageProps} width={width} height={height} />;
  }

  // Fallback to fill if no dimensions provided
  return <Image {...imageProps} fill />;
};

export default OptimizedImage;
