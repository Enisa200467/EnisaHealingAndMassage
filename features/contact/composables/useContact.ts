import type { ContactFormData } from '../types/contact.types';

export const useContact = () => {
  const toast = useToast();

  const submitContactForm = async (data: ContactFormData) => {
    try {
      // Send contact form data to the server API endpoint
      const response = await $fetch('/api/contact', {
        method: 'POST',
        body: data,
      });

      toast.add({
        title: 'Bericht verzonden!',
        description:
          'Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.',
        color: 'success',
      });

      return { success: true, data: response };
    } catch (error: unknown) {
      // Handle validation errors specifically
      if (
        error &&
        typeof error === 'object' &&
        'status' in error &&
        error.status === 400
      ) {
        const errorData = error as {
          data?: { data?: Array<{ message: string }> };
        };
        if (errorData.data?.data) {
          const validationErrors = errorData.data.data
            .map((issue) => issue.message)
            .join(', ');

          toast.add({
            title: 'Validatiefout',
            description: validationErrors,
            color: 'error',
          });
        } else {
          toast.add({
            title: 'Fout bij verzenden',
            description:
              'Er is iets misgegaan. Probeer het opnieuw of neem telefonisch contact op.',
            color: 'error',
          });
        }
      } else {
        toast.add({
          title: 'Fout bij verzenden',
          description:
            'Er is iets misgegaan. Probeer het opnieuw of neem telefonisch contact op.',
          color: 'error',
        });
      }

      return { success: false, error };
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
  };
};
