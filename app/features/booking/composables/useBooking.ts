import type {
  BookingFormData,
  Treatment,
  TimeSlot,
  BookingConfirmation,
} from '../types/booking.types';

export const useBooking = () => {
  const toast = useToast();

  /**
   * Submit a booking request
   */
  const submitBooking = async (
    data: BookingFormData
  ): Promise<{
    success: boolean;
    confirmation?: BookingConfirmation;
    error?: string;
  }> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const confirmation: BookingConfirmation = {
        id: `booking_${Date.now()}`,
        date: data.date,
        time: data.time,
        treatment: data.treatment,
        confirmationNumber: `ENM${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}`,
      };

      toast.add({
        title: 'Afspraak geboekt!',
        description: `Je afspraak is bevestigd. Bevestigingsnummer: ${confirmation.confirmationNumber}`,
        color: 'green',
      });

      return { success: true, confirmation };
    } catch (error) {
      toast.add({
        title: 'Fout bij boeken',
        description:
          'Er is iets misgegaan. Probeer het opnieuw of neem telefonisch contact op.',
        color: 'red',
      });

      return { success: false, error: 'Booking failed' };
    }
  };

  /**
   * Get available treatments for booking
   */
  const getAvailableTreatments = (): Treatment[] => {
    return [
      {
        id: 'klassieke-ontspanningsmassage',
        name: 'Klassieke Ontspanningsmassage',
        duration: '60 minuten',
        price: '€ 70',
        description: 'Complete ontspanning voor lichaam en geest',
      },
      {
        id: 'zweedse-massage',
        name: 'Zweedse Massage',
        duration: '75 minuten',
        price: '€ 85',
        description: 'Krachtige massage voor diepe spierontspanning',
      },
      {
        id: 'intuitieve-lichaamsmassage',
        name: 'Intuïtieve Lichaamsmassage',
        duration: '90 minuten',
        price: '€ 95',
        description: 'Holistische benadering van lichaam en energiesysteem',
      },
      {
        id: 'energetische-healing-sessie',
        name: 'Energetische Healing Sessie',
        duration: '60 minuten',
        price: '€ 65',
        description: 'Energetische balans en innerlijke rust',
      },
      {
        id: 'chakra-balancering',
        name: 'Chakra Balancering',
        duration: '75 minuten',
        price: '€ 75',
        description: 'Herstel de balans in je energiecentra',
      },
      {
        id: 'sportmassage',
        name: 'Sportmassage',
        duration: '60 minuten',
        price: '€ 80',
        description: 'Specifiek voor sporters en actieve mensen',
      },
    ];
  };

  /**
   * Get available time slots for a given date
   */
  const getAvailableTimeSlots = (date: string): TimeSlot[] => {
    // In a real implementation, this would check actual availability
    const timeSlots = [
      '09:00',
      '10:30',
      '12:00',
      '13:30',
      '15:00',
      '16:30',
      '18:00',
    ];

    return timeSlots.map((time) => ({
      time,
      available: Math.random() > 0.3, // Simulate some slots being unavailable
    }));
  };

  /**
   * Check if a specific date/time combination is available
   */
  const checkAvailability = async (
    date: string,
    time: string
  ): Promise<boolean> => {
    // Simulate API check
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Math.random() > 0.2; // 80% chance of being available
  };

  return {
    submitBooking,
    getAvailableTreatments,
    getAvailableTimeSlots,
    checkAvailability,
  };
};
