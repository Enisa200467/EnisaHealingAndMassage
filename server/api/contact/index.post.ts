import { z } from 'zod';
import { Resend } from 'resend';

const contactFormSchema = z.object({
  firstName: z.string().min(2, 'Voornaam moet minimaal 2 karakters lang zijn'),
  lastName: z.string().min(2, 'Achternaam moet minimaal 2 karakters lang zijn'),
  email: z.string().email('Voer een geldig e-mailadres in'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Onderwerp moet minimaal 3 karakters lang zijn'),
  message: z.string().min(10, 'Bericht moet minimaal 10 karakters lang zijn'),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'Je moet akkoord gaan met de voorwaarden'),
});

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw ApiErrors.methodNotAllowed();
  }

  // Apply rate limiting: 5 requests per hour per IP
  checkRateLimit(event, rateLimitPresets.contactForm);

  try {
    const body = await readBody(event);
    const validatedData = contactFormSchema.parse(body);

    // Sanitize all input fields to prevent XSS attacks
    const sanitizedData = sanitizeObject(validatedData);

    // Initialize Resend with API key from environment
    const config = useRuntimeConfig();
    const resendApiKey = config.resendApiKey;
    const contactEmail = config.contactEmail;

    if (!resendApiKey) {
      throw ApiErrors.serviceUnavailable('E-mailservice is niet geconfigureerd');
    }

    if (!contactEmail) {
      throw ApiErrors.internalError('Contactgegevens zijn niet geconfigureerd');
    }

    const resend = new Resend(resendApiKey);

    // Prepare email content using template
    const emailSubject = `Nieuw contactformulier: ${sanitizedData.subject}`;
    const emailHtml = generateContactFormEmail({
      firstName: sanitizedData.firstName,
      lastName: sanitizedData.lastName,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
    });

    // Send email to the business owner
    const result = await resend.emails.send({
      from: 'Enisa Healing Website <noreply@enisahealing.nl>', // TODO: You'll need to configure your domain
      to: [contactEmail], // Configurable email from environment variable
      subject: emailSubject,
      html: emailHtml,
      replyTo: sanitizedData.email, // Allow easy reply to the customer
    });

    if (result.error) {
      console.error('Email sending failed:', result.error);
      throw ApiErrors.serviceUnavailable('Kon e-mail niet verzenden. Probeer het later opnieuw.');
    }

    // Optionally, you could also store the contact form submission in Supabase
    // for record keeping and follow-up purposes

    return createApiSuccess(
      { emailId: result.data?.id },
      'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.'
    );
  } catch (error) {
    console.error('Contact form submission error:', error);

    if (error instanceof z.ZodError) {
      throw handleZodError(error);
    }

    // Re-throw if it's already a formatted API error
    if (error.statusCode) {
      throw error;
    }

    throw ApiErrors.internalError();
  }
});
