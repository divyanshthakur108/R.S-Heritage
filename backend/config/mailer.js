const nodemailer = require('nodemailer');

const createTransporter = async () => {
  const user = process.env.EMAIL_USER || process.env.SMTP_USER || 'divyanshthakur327@gmail.com';
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  // 1. Authenticate with Gmail SMTP service using EMAIL_USER and EMAIL_PASS
  if (user && pass && pass.trim().length > 0) {
    return {
      transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: user.trim(),
          pass: pass.trim()
        }
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
