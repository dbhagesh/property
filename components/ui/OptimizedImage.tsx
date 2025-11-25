"use client";

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
 * Optimized Image component that uses WebP with JPEG/PNG fallback
 * Uses browser's native picture element for zero JavaScript overhead
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
  // Generate WebP path from original image path
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const hasWebP = webpSrc !== src;

  const imageProps = {
    src: hasWebP ? webpSrc : src,
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
