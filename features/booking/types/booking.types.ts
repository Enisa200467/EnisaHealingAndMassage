export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  treatment: string;
  date: string;
  time: string;
  notes?: string;
  agreeToTerms: boolean;
}

export interface Treatment {
  id: string;
  name: string;
  duration: string;
  price: string;
  description?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingConfirmation {
  id: string;
  date: string;
  time: string;
  treatment: string;
  confirmationNumber: string;
}
