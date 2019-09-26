export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

// Secure: false; // SSLFalse
// Email Services:
// Amazon SES
// Mailgun
// Sparkpost
// Mandril (only Mailchimp)

// GMAIL - limite de envios - te trava

// Mailtrap (Dev)
