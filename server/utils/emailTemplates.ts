/**
 * Email Templates
 * Reusable email HTML templates for various emails sent from the application
 */

interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Contact form submission email template
 * Sent to business owner when someone submits the contact form
 */
export function generateContactFormEmail(data: ContactEmailData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8B5CF6;">Nieuw bericht via contactformulier</h2>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Contactgegevens</h3>
        <p><strong>Naam:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        ${
          data.phone
            ? `<p><strong>Telefoon:</strong> ${data.phone}</p>`
            : ''
        }
        <p><strong>Onderwerp:</strong> ${data.subject}</p>
      </div>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Bericht</h3>
        <p style="white-space: pre-line;">${data.message}</p>
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
}

interface BookingConfirmationData {
  customerName: string;
  customerEmail: string;
  treatmentName: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  confirmationNumber: string;
}

/**
 * Booking confirmation email template
 * Sent to customer after successful booking
 */
export function generateBookingConfirmationEmail(data: BookingConfirmationData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8B5CF6;">Afspraakbevestiging - Enisa Healing & Massage</h2>

      <p>Beste ${data.customerName},</p>

      <p>Bedankt voor je boeking! Je afspraak is bevestigd.</p>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Afspraakdetails</h3>
        <p><strong>Behandeling:</strong> ${data.treatmentName}</p>
        <p><strong>Datum:</strong> ${new Date(data.date).toLocaleDateString('nl-NL', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</p>
        <p><strong>Tijd:</strong> ${data.time}</p>
        <p><strong>Duur:</strong> ${data.duration}</p>
        <p><strong>Prijs:</strong> ${data.price}</p>
        <p><strong>Bevestigingsnummer:</strong> ${data.confirmationNumber}</p>
      </div>

      <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
        <p style="margin: 0;"><strong>Let op:</strong> Kom 5-10 minuten voor je afspraak aan.</p>
      </div>

      <div style="margin-top: 30px;">
        <h3 style="color: #374151;">Wijzigen of annuleren?</h3>
        <p>Als je je afspraak wilt wijzigen of annuleren, neem dan minimaal 24 uur van tevoren contact op via:</p>
        <ul>
          <li>E-mail: info@enisahealing.nl</li>
          <li>Telefoon: +31 6 12 34 56 78</li>
        </ul>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; text-align: center;">
        <p>Ik kijk ernaar uit je te ontmoeten!</p>
        <p style="margin-top: 10px;">Met vriendelijke groet,<br><strong>Enisa</strong></p>
        <p style="margin-top: 20px;">Enisa Healing & Massage<br>enisahealing.nl</p>
      </div>
    </div>
  `;
}

interface ReviewNotificationData {
  reviewerName: string;
  treatment?: string;
  rating: number;
  reviewText: string;
  reviewId: string;
}

/**
 * Review notification email template
 * Sent to admin when a new review is submitted
 */
export function generateReviewNotificationEmail(data: ReviewNotificationData): string {
  const stars = '⭐'.repeat(data.rating);

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8B5CF6;">Nieuwe review ontvangen</h2>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Reviewer</h3>
        <p><strong>Naam:</strong> ${data.reviewerName}</p>
        ${data.treatment ? `<p><strong>Behandeling:</strong> ${data.treatment}</p>` : ''}
        <p><strong>Beoordeling:</strong> ${stars} (${data.rating}/5)</p>
      </div>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Review</h3>
        <p style="white-space: pre-line;">${data.reviewText}</p>
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://enisahealing.nl/admin/reviews"
           style="background-color: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Review Beoordelen
        </a>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
        <p>Review ID: ${data.reviewId}</p>
        <p>Ontvangen op: ${new Date().toLocaleString('nl-NL', {
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
}

/**
 * Email template wrapper with consistent branding
 */
export function wrapEmailTemplate(content: string, preheaderText?: string): string {
  return `
    <!DOCTYPE html>
    <html lang="nl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <title>Enisa Healing & Massage</title>
      ${preheaderText ? `<div style="display: none; max-height: 0; overflow: hidden;">${preheaderText}</div>` : ''}
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            ${content}
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
