/**
 * Global SEO composable for structured data and meta tags
 */

import { BUSINESS_INFO, getSchemaAddress, getSchemaContactPoint } from '~/constants/businessInfo';

interface StructuredDataItem {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

interface ContactPoint {
  '@type': string;
  telephone: string;
  contactType: string;
  areaServed: string;
  availableLanguage: string[];
}

interface PostalAddress {
  '@type': string;
  addressCountry: string;
  addressLocality: string;
  postalCode: string;
  streetAddress?: string;
}

export const useGlobalSEO = () => {
  // Business information from centralized constant
  const businessInfo = {
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    telephone: BUSINESS_INFO.contact.phoneInternational,
    email: BUSINESS_INFO.contact.email,
    description: BUSINESS_INFO.description,
    priceRange: BUSINESS_INFO.priceRange,
    image: '/images/logo.jpg',
    address: getSchemaAddress() as PostalAddress,
    contactPoint: getSchemaContactPoint() as ContactPoint,
    openingHours: BUSINESS_INFO.hours.schemaFormat,
    serviceArea: {
      '@type': 'City',
      name: BUSINESS_INFO.address.city,
    },
  };

  // Generate structured data for health services
  const generateHealthServiceSchema = (
    serviceName: string,
    description: string,
    price?: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      '@id': `${businessInfo.url}#${serviceName
        .toLowerCase()
        .replace(/\s+/g, '-')}`,
      name: serviceName,
      description,
      provider: {
        '@type': 'Organization',
        name: businessInfo.name,
        url: businessInfo.url,
      },
      offers: price
        ? {
            '@type': 'Offer',
            price: price.replace('€ ', '').replace(',', '.'),
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
          }
        : undefined,
      availableService: {
        '@type': 'MedicalProcedure',
        name: serviceName,
        description,
      },
    };
  };

  // Generate FAQ structured data
  const generateFAQSchema = (
    faqs: Array<{ question: string; answer: string }>
  ) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  };

  // Generate review/rating schema for business
  const generateReviewSchema = (
    reviews: Array<{
      name: string;
      rating: number;
      review: string;
      created_at: string;
    }>,
    averageRating: number,
    totalReviews: number
  ) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': businessInfo.url,
      name: businessInfo.name,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: averageRating.toFixed(1),
        reviewCount: totalReviews,
        bestRating: 5,
        worstRating: 1,
      },
      review: reviews.map((review) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.name,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: review.review,
        datePublished: review.created_at,
      })),
    };
  };

  // Generate business/organization schema
  const generateBusinessSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': businessInfo.url,
      name: businessInfo.name,
      description: businessInfo.description,
      url: businessInfo.url,
      telephone: businessInfo.telephone,
      email: businessInfo.email,
      address: businessInfo.address,
      contactPoint: businessInfo.contactPoint,
      openingHours: businessInfo.openingHours,
      serviceArea: businessInfo.serviceArea,
      priceRange: businessInfo.priceRange,
      image: businessInfo.image,
    };
  };

  // Generate breadcrumb structured data
  const generateBreadcrumbSchema = (
    breadcrumbs: Array<{ label: string; path: string }>
  ) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `${businessInfo.url}${crumb.path}`,
      })),
    };
  };

  // Generate service schema for treatments
  const generateServiceSchema = (
    serviceName: string,
    description: string,
    price?: string,
    duration?: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${businessInfo.url}#service-${serviceName
        .toLowerCase()
        .replace(/\s+/g, '-')}`,
      name: serviceName,
      description,
      provider: {
        '@type': 'Organization',
        name: businessInfo.name,
        url: businessInfo.url,
        address: businessInfo.address,
        telephone: businessInfo.telephone,
      },
      offers: price
        ? {
            '@type': 'Offer',
            price: price.replace('€ ', '').replace(',', '.'),
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            ...(duration && { validThrough: duration }),
          }
        : undefined,
      areaServed: businessInfo.serviceArea,
      category: 'Health and Wellness',
    };
  };

  // Generate article schema for content pages
  const generateArticleSchema = (
    title: string,
    description: string,
    path: string,
    datePublished?: string,
    dateModified?: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      url: `${businessInfo.url}${path}`,
      author: {
        '@type': 'Person',
        name: 'Enisa',
        jobTitle: 'Massagetherapeut en Healing Practitioner',
      },
      publisher: {
        '@type': 'Organization',
        name: businessInfo.name,
        url: businessInfo.url,
      },
      datePublished: datePublished || new Date().toISOString(),
      dateModified: dateModified || new Date().toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${businessInfo.url}${path}`,
      },
    };
  };

  // Enhanced SEO meta tags with canonical URL
  const setPageSEO = (options: {
    title: string;
    description: string;
    path: string;
    image?: string;
    type?: 'website' | 'article' | 'book' | 'profile';
    structuredData?: StructuredDataItem[];
  }) => {
    const canonical = `${businessInfo.url}${options.path}`;
    const image = options.image || businessInfo.image;

    useSeoMeta({
      title: options.title,
      description: options.description,
      ogTitle: options.title,
      ogDescription: options.description,
      ogImage: image,
      ogType: options.type || 'website',
      ogUrl: canonical,
      twitterCard: 'summary_large_image',
      twitterTitle: options.title,
      twitterDescription: options.description,
      twitterImage: image,
    });

    // Set canonical URL separately
    useHead({
      link: [
        {
          rel: 'canonical',
          href: canonical,
        },
      ],
    });

    // Add structured data if provided
    if (options.structuredData) {
      for (const data of options.structuredData) {
        useHead({
          script: [
            {
              type: 'application/ld+json',
              innerHTML: JSON.stringify(data),
            },
          ],
        });
      }
    }
  };

  return {
    businessInfo,
    generateHealthServiceSchema,
    generateFAQSchema,
    generateReviewSchema,
    generateBusinessSchema,
    generateBreadcrumbSchema,
    generateServiceSchema,
    generateArticleSchema,
    setPageSEO,
  };
};
