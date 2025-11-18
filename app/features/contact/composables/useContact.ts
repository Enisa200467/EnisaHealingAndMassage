import type { ContactFormData } from '../types/contact.types';

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
      phone: '+31612345678',
      email: 'info@enisahealing.nl',
      address: 'Voorbeeldstraat 123, 1234 AB Amsterdam',
      whatsapp: '+31612345678',
      hours: [
        { day: 'Maandag - Zaterdag', hours: '9:00 - 18:00' },
        { day: 'Zondag', hours: 'Gesloten' },
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
