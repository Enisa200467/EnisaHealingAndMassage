# Email Setup Guide

## Overview

The contact form now sends real emails using Resend, a reliable transactional email service. This guide will help you set up email functionality for the website.

## Email Service Options

### Option 1: Resend (Recommended)

Resend is a modern transactional email service that's perfect for contact forms and has excellent deliverability.

#### Setup Steps:

1. **Create a Resend Account**

   - Go to [resend.com](https://resend.com)
   - Sign up for a free account (100 emails/day on free tier)

2. **Get Your API Key**

   - In your Resend dashboard, go to API Keys
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Add Domain (Optional but Recommended)**

   - Add your domain (e.g., `enisahealing.nl`) to Resend
   - Follow their DNS verification process
   - This allows you to send from `noreply@enisahealing.nl`

4. **Configure Environment Variables**

   ```bash
   # Add to your .env file
   RESEND_API_KEY=re_your_api_key_here
   ```

5. **Update Email Addresses**
   - In `/server/api/contact/index.post.ts`, update:
     - `from: 'Enisa Healing Website <noreply@enisahealing.nl>'` (use your domain)
     - `to: ['info@enisahealing.nl']` (your actual business email)

### Option 2: Gmail SMTP (Alternative)

If you prefer using Gmail, you can modify the implementation to use Gmail SMTP instead:

1. **Install Nodemailer**

   ```bash
   bun add nodemailer @types/nodemailer
   ```

2. **Replace the Resend implementation** with Gmail SMTP configuration
3. **Use App Password** (not your regular Gmail password)

## Configuration

### Environment Variables

Create a `.env` file in your project root with:

```env
RESEND_API_KEY=your_resend_api_key_here
```

### Email Content Customization

The email template is in `/server/api/contact/index.post.ts`. You can customize:

- **Subject line**: Currently uses the form subject with "Nieuw contactformulier:" prefix
- **HTML template**: Styled email with contact details and message
- **Reply-to**: Automatically set to the customer's email for easy replies
- **Recipient**: Currently set to `info@enisahealing.nl`

### Form Validation

The server validates all form fields using Zod:

- **firstName**: Minimum 2 characters
- **lastName**: Minimum 2 characters
- **email**: Valid email format required
- **phone**: Optional field
- **subject**: Minimum 3 characters
- **message**: Minimum 10 characters
- **agreeToTerms**: Must be true

## Testing

### Development Testing

1. **Start the development server**:

   ```bash
   bun run dev
   ```

2. **Fill out the contact form** at `/contact`

3. **Check the server logs** for any errors

4. **Verify email delivery** in your business email inbox

### Production Testing

1. **Deploy your changes** to your hosting platform
2. **Set environment variables** in your hosting dashboard
3. **Test the contact form** on the live site

## Troubleshooting

### Common Issues

1. **"Email service not configured" error**

   - Make sure `RESEND_API_KEY` is set in your environment variables
   - Verify the API key is correct and active

2. **Emails not being received**

   - Check your spam/junk folder
   - Verify the recipient email address is correct
   - Check Resend dashboard for delivery status

3. **Domain verification issues**

   - Make sure DNS records are properly configured
   - Allow 24-48 hours for DNS propagation
   - Use Resend's shared domain initially if needed

4. **Rate limiting**
   - Free Resend accounts have 100 emails/day limit
   - Upgrade to paid plan for higher limits if needed

### Debug Steps

1. **Check server logs** for detailed error messages
2. **Test API endpoint directly** using a tool like Postman
3. **Verify environment variables** are loaded correctly
4. **Check Resend dashboard** for email delivery status

## Security Considerations

- **API key security**: Never commit API keys to version control
- **Input validation**: All form inputs are validated server-side
- **Rate limiting**: Consider adding rate limiting for production
- **SPAM protection**: Consider adding reCAPTCHA for additional protection

## Monitoring

- **Resend Dashboard**: Monitor email delivery and bounces
- **Server Logs**: Track form submissions and errors
- **Analytics**: Monitor contact form conversion rates

## Alternative Implementations

If you need different functionality, consider:

- **Store in database**: Save contact form submissions to Supabase for record keeping
- **Auto-responder**: Send confirmation email to the customer
- **Notifications**: Send SMS or Slack notifications for urgent inquiries
- **CRM integration**: Forward to customer management systems

## Support

For issues with:

- **Resend**: Check their [documentation](https://resend.com/docs) or support
- **This implementation**: Check the code comments and error logs
- **Hosting**: Refer to your hosting provider's documentation for environment variable setup
