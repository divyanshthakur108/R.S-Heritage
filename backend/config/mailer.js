const nodemailer = require('nodemailer');

const createTransporter = async () => {
  const user = (process.env.EMAIL_USER || process.env.SMTP_USER || '').trim();
  const rawPass = (process.env.EMAIL_PASS || process.env.SMTP_PASS || '');
  const pass = rawPass.replace(/\s+/g, ''); // strip spaces from Gmail App Password
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const isGmail = host.includes('gmail') || !process.env.SMTP_HOST;
  const targetHost = isGmail ? 'smtp.gmail.com' : host;
  const targetPort = isGmail ? 465 : parseInt(process.env.SMTP_PORT || '465', 10);
  const isSecure = targetPort === 465;

  // 1. Authenticate with Gmail/Custom SMTP service if credentials present
  if (user && pass && pass.length > 0) {
    return {
      transporter: nodemailer.createTransport({
        host: targetHost,
        port: targetPort,
        secure: isSecure,
        auth: {
          user: user,
          pass: pass
        },
        tls: {
          rejectUnauthorized: false
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000
      }),
      isEthereal: false
    };
  }

  // 2. Fallback Ethereal test account if credentials missing
  try {
    const testAccount = await nodemailer.createTestAccount();
    return {
      transporter: nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      }),
      isEthereal: true
    };
  } catch (err) {
    return {
      transporter: nodemailer.createTransport({
        streamTransport: true,
        newline: 'windows',
        buffer: true
      }),
      isEthereal: false
    };
  }
};

module.exports = { createTransporter };
