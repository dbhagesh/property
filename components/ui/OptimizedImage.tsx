"use client";

import Image from "next/image";
import { useState } from "react";

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
 * Automatically tries to load WebP version first for better performance
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
  const [imgSrc, setImgSrc] = useState(src);
  const [useWebP, setUseWebP] = useState(true);

  // Generate WebP path from original image path
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const displaySrc = useWebP && webpSrc !== src ? webpSrc : imgSrc;

  const handleError = () => {
    if (useWebP) {
      // WebP failed, fall back to original
      setUseWebP(false);
      setImgSrc(src);
    }
  };

  const imageProps = {
    src: displaySrc,
    alt,
    className,
    onError: handleError,
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
