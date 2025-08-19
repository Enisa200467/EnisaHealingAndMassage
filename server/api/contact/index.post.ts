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
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    });
  }

  try {
    const body = await readBody(event);
    const validatedData = contactFormSchema.parse(body);

    // Initialize Resend with API key from environment
    const config = useRuntimeConfig();
    const resendApiKey = config.resendApiKey;
    const contactEmail = config.contactEmail;

    if (!resendApiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Email service not configured',
      });
    }

    if (!contactEmail) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Contact email not configured',
      });
    }

    const resend = new Resend(resendApiKey);

    // Prepare email content
    const emailSubject = `Nieuw contactformulier: ${validatedData.subject}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B5CF6;">Nieuw bericht via contactformulier</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Contactgegevens</h3>
          <p><strong>Naam:</strong> ${validatedData.firstName} ${
      validatedData.lastName
    }</p>
          <p><strong>E-mail:</strong> ${validatedData.email}</p>
          ${
            validatedData.phone
              ? `<p><strong>Telefoon:</strong> ${validatedData.phone}</p>`
              : ''
          }
          <p><strong>Onderwerp:</strong> ${validatedData.subject}</p>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Bericht</h3>
          <p style="white-space: pre-line;">${validatedData.message}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
          <p>Dit bericht is verzonden via het contactformulier op enisahealing.nl</p>
          <p>Verzonden op: ${new Date().toLocaleString('nl-NL', {
            timeZone: 'Europe/Amsterdam',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}</p>
        </div>
      </div>
    `;

    // Send email to the business owner
    const result = await resend.emails.send({
      from: 'Enisa Healing Website <noreply@enisahealing.nl>', // TODO: You'll need to configure your domain
      to: [contactEmail], // Configurable email from environment variable
      subject: emailSubject,
      html: emailHtml,
      replyTo: validatedData.email, // Allow easy reply to the customer
    });

    if (result.error) {
      console.error('Email sending failed:', result.error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send email',
      });
    }

    // Optionally, you could also store the contact form submission in Supabase
    // for record keeping and follow-up purposes

    return {
      success: true,
      message: 'Contact form submitted successfully',
      emailId: result.data?.id,
    };
  } catch (error) {
    console.error('Contact form submission error:', error);

    if (error instanceof z.ZodError) {
      // Zod validation error
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation failed',
        data: error.issues,
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
