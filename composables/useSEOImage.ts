/**
 * SEO Image Optimization Utilities
 */

interface ImageSEOOptions {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
}

export const useSEOImage = () => {
  /**
   * Generate responsive image sizes for better SEO
   */
  const generateResponsiveSizes = (breakpoints: { [key: string]: number }) => {
    return Object.entries(breakpoints)
      .map(([bp, size]) => `(max-width: ${bp}) ${size}px`)
      .join(', ');
  };

  /**
   * Default responsive sizes for common use cases
   */
  const responsiveSizes = {
    hero: '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px',
    feature: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw',
    thumbnail: '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw',
    fullWidth: '100vw',
    halfWidth: '(max-width: 768px) 100vw, 50vw',
  };

  /**
   * Generate ImageObject structured data for SEO
   */
  const generateImageSchema = (options: ImageSEOOptions) => {
    return {
      '@type': 'ImageObject',
      url: options.src,
      name: options.alt,
      width: options.width,
      height: options.height,
      contentUrl: options.src,
    };
  };

  /**
   * Generate optimized image props for NuxtImg
   */
  const getOptimizedImageProps = (options: ImageSEOOptions) => {
    return {
      src: options.src,
      alt: options.alt,
      width: options.width,
      height: options.height,
      sizes: options.sizes || responsiveSizes.feature,
      quality: options.quality || 85,
      format: options.format || 'webp',
      loading: options.priority ? 'eager' : 'lazy',
      preload: options.priority || false,
    };
  };

  return {
    responsiveSizes,
    generateImageSchema,
    getOptimizedImageProps,
    generateResponsiveSizes,
  };
};
