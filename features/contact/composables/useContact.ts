import type { ContactFormData } from '../types/contact.types'

export const useContact = () => {
  const toast = useToast()

  const submitContactForm = async (data: ContactFormData) => {
    try {
      // In a real implementation, this would send to an API endpoint
      console.log('Submitting contact form:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.add({
        title: 'Bericht verzonden!',
        description: 'Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.',
        color: 'green'
      })
      
      return { success: true }
    } catch (error) {
      toast.add({
        title: 'Fout bij verzenden',
        description: 'Er is iets misgegaan. Probeer het opnieuw of neem telefonisch contact op.',
        color: 'red'
      })
      
      return { success: false, error }
    }
  }

  const getContactInfo = () => {
    return {
      phone: '+31612345678',
      email: 'info@enisahealing.nl',
      address: 'Voorbeeldstraat 123, 1234 AB Amsterdam',
      whatsapp: '+31612345678',
      hours: [
        { day: 'Maandag - Zaterdag', hours: '9:00 - 18:00' },
        { day: 'Zondag', hours: 'Gesloten' }
      ]
    }
  }

  return {
    submitContactForm,
    getContactInfo
  }
}
