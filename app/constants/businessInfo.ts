/**
 * Centralized business information
 * This is the single source of truth for all business details
 */

export interface BusinessAddress {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
  fullAddress: string;
}

export interface BusinessLocation {
  latitude: number;
  longitude: number;
}

export interface BusinessContact {
  phone: string;
  phoneFormatted: string; // For display
  phoneInternational: string; // For tel: links and international use
  email: string;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  schemaFormat: string[]; // Format for schema.org
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  url: string;
  priceRange: string;
  address: BusinessAddress;
  location: BusinessLocation;
  contact: BusinessContact;
  hours: BusinessHours;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Enisa Healing & Massage',
  tagline: 'Vind Balans en Diepe Ontspanning',
  description:
    'Professionele massage en healing praktijk in Amsterdam Noord, gespecialiseerd in ontspanning, stressvermindering en energetische behandelingen.',
  url: 'https://enisahealingmassage.nl',
  priceRange: '€40-€90',

  address: {
    street: 'IJplein',
    houseNumber: '69',
    postalCode: '1021 LB',
    city: 'Amsterdam',
    country: 'Nederland',
    fullAddress: 'IJplein 69, 1021 LB Amsterdam',
  },

  location: {
    latitude: 52.3821288,
    longitude: 4.9096088,
  },

  contact: {
    phone: '06 22445121',
    phoneFormatted: '06 224 451 21', // Spaced for readability
    phoneInternational: '+31622445121', // International format for tel: links
    email: 'info@enisahealing.nl',
  },

  // TODO: Verify actual opening hours
  hours: {
    monday: '09:00-18:00',
    tuesday: '09:00-18:00',
    wednesday: '09:00-18:00',
    thursday: '09:00-18:00',
    friday: '09:00-18:00',
    saturday: '09:00-15:00',
    sunday: 'Gesloten',
    schemaFormat: ['Mo-Fr 09:00-18:00', 'Sa 09:00-15:00'],
  },

  social: {
    // TODO: Add social media links if available
    facebook: undefined,
    instagram: undefined,
    linkedin: undefined,
  },
};

// Helper functions for common use cases
export const getGoogleMapsUrl = () => {
  return `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS_INFO.location.latitude},${BUSINESS_INFO.location.longitude}`;
};

export const getGoogleMapsEmbedUrl = () => {
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.5!2d${BUSINESS_INFO.location.longitude}!3d${BUSINESS_INFO.location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1snl!2snl!4v1234567890`;
};

export const getPhoneLink = () => {
  return `tel:${BUSINESS_INFO.contact.phoneInternational}`;
};

export const getEmailLink = () => {
  return `mailto:${BUSINESS_INFO.contact.email}`;
};

// Schema.org formatted address
export const getSchemaAddress = () => {
  return {
    '@type': 'PostalAddress',
    streetAddress: `${BUSINESS_INFO.address.street} ${BUSINESS_INFO.address.houseNumber}`,
    addressLocality: BUSINESS_INFO.address.city,
    postalCode: BUSINESS_INFO.address.postalCode,
    addressCountry: 'NL',
  };
};

// Schema.org formatted contact point
export const getSchemaContactPoint = () => {
  return {
    '@type': 'ContactPoint',
    telephone: BUSINESS_INFO.contact.phoneInternational,
    contactType: 'customer service',
    areaServed: 'NL',
    availableLanguage: ['Dutch', 'English'],
  };
};
