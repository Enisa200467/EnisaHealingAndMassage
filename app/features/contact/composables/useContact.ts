import type { ContactFormData } from '../types/contact.types';
import { BUSINESS_INFO } from '~/constants/businessInfo';

export const useContact = () => {
  const { execute, loading, error } = useApiCall();

  const submitContactForm = async (data: ContactFormData) => {
    try {
      const response = await execute('/api/contact', {
        method: 'POST',
        body: data,
        successMessage: 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.',
      });

      return { success: true, data: response };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const getContactInfo = () => {
    return {
      phone: BUSINESS_INFO.contact.phoneInternational,
      phoneFormatted: BUSINESS_INFO.contact.phoneFormatted,
      email: BUSINESS_INFO.contact.email,
      address: BUSINESS_INFO.address.fullAddress,
      whatsapp: BUSINESS_INFO.contact.phoneInternational,
      hours: [
        { day: 'Maandag - Vrijdag', hours: BUSINESS_INFO.hours.monday },
        { day: 'Zaterdag', hours: BUSINESS_INFO.hours.saturday },
        { day: 'Zondag', hours: BUSINESS_INFO.hours.sunday },
      ],
    };
  };

  return {
    submitContactForm,
    getContactInfo,
    loading,
    error,
  };
};
