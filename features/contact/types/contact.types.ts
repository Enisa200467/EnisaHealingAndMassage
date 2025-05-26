export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  agreeToTerms: boolean
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  whatsapp: string
  hours: BusinessHours[]
}

export interface BusinessHours {
  day: string
  hours: string
}
