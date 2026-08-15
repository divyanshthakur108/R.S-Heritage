const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { createTransporter } = require('../config/mailer');
const { query } = require('../config/db');

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, location, eventDate, guestCount, eventType, message } = req.body;

    // Basic Validation
    if (!name || !email || !phone || !eventDate || !eventType) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields: Name, Email, Phone, Event Date, and Event Type.'
      });
    }

    // Save booking inquiry to PostgreSQL database
    await query(
      'INSERT INTO bookings (name, email, phone, location, event_date, guest_count, event_type, message) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [name, email, phone, location, eventDate, guestCount, eventType, message]
    );

    // Attempt email notification dispatch
    try {
      const { transporter, isEthereal } = await createTransporter();
      const receiver = process.env.ADMIN_EMAIL || process.env.RECEIVER_EMAIL || 'divyanshthakur327@gmail.com';
      const senderEmail = process.env.EMAIL_USER || process.env.SMTP_USER || 'no-reply@rsheritage.com';

      const mailOptions = {
        from: `"R.S Heritage Web Inquiry" <${senderEmail}>`,
        to: receiver,
        replyTo: email,
        subject: `👑 New R.S Heritage Venue Booking Request from ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Venue Booking Request</title>
          </head>
          <body style="margin: 0; padding: 20px; background-color: #f4f1ea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #d4af37; box-shadow: 0 10px 30px rgba(6, 44, 36, 0.15);">
              
              <!-- Royal Banner Header -->
              <div style="background-color: #062C24; background-image: linear-gradient(135deg, #031E18 0%, #062C24 50%, #0A4237 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #D4AF37;">
                <div style="display: inline-block; width: 44px; height: 44px; margin-bottom: 8px;">
                  <span style="font-size: 28px;">👑</span>
                </div>
                <h1 style="margin: 0; color: #D4AF37; font-family: 'Times New Roman', Georgia, serif; font-size: 28px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">R.S HERITAGE</h1>
                <p style="margin: 6px 0 0; color: #f3e5ab; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Marriage & Event Venue</p>
              </div>

              <!-- Body Container -->
              <div style="padding: 32px 28px; background-color: #faf9f6;">
                
                <!-- Badge Header -->
                <div style="text-align: center; margin-bottom: 24px;">
                  <span style="background-color: #062C24; color: #D4AF37; padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; border: 1px solid #D4AF37;">
                    New Customer Booking Request
                  </span>
                </div>

                <!-- Customer Details Card -->
                <div style="background-color: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #eae5d9; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #f2eee5;">
                      <td style="padding: 12px 0; color: #062C24; font-weight: bold; font-size: 13px; width: 38%;">👤 Client Name:</td>
                      <td style="padding: 12px 0; color: #111111; font-size: 14px; font-weight: 600;">${name}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f2eee5;">
                      <td style="padding: 12px 0; color: #062C24; font-weight: bold; font-size: 13px;">📧 Email Address:</td>
                      <td style="padding: 12px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #0056b3; font-weight: 600; text-decoration: none;">${email}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f2eee5;">
                      <td style="padding: 12px 0; color: #062C24; font-weight: bold; font-size: 13px;">📞 Phone Number:</td>
                      <td style="padding: 12px 0; font-size: 14px;"><a href="tel:${phone}" style="color: #062C24; font-weight: bold; text-decoration: none;">${phone}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f2eee5;">
                      <td style="padding: 12px 0; color: #062C24; font-weight: bold; font-size: 13px;">📍 Customer Location:</td>
                      <td style="padding: 12px 0; color: #333333; font-size: 14px;">${location || 'Not specified'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f2eee5;">
                      <td style="padding: 12px 0; color: #062C24; font-weight: bold; font-size: 13px;">🎉 Function Type:</td>
                      <td style="padding: 12px 0; font-size: 14px;"><span style="color: #8B0000; font-weight: bold; background-color: #fff0f0; padding: 3px 8px; border-radius: 6px;">${eventType}</span></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f2eee5;">
                      <td style="padding: 12px 0; color: #062C24; font-weight: bold; font-size: 13px;">📅 Date of Function:</td>
                      <td style="padding: 12px 0; color: #062C24; font-size: 14px; font-weight: bold;">${eventDate}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; color: #062C24; font-weight: bold; font-size: 13px;">👥 Number of Guests:</td>
                      <td style="padding: 12px 0; color: #333333; font-size: 14px; font-weight: 600;">${guestCount || 'Not specified'}</td>
                    </tr>
                  </table>
                </div>

                ${message ? `
                  <!-- Special Message Section -->
                  <div style="margin-top: 20px; background-color: #ffffff; padding: 18px; border-left: 4px solid #D4AF37; border-radius: 8px; border: 1px solid #eae5d9; border-left-width: 4px;">
                    <p style="margin: 0 0 6px; font-weight: bold; color: #062C24; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">💬 Special Requirements / Message:</p>
                    <p style="margin: 0; color: #444444; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                ` : ''}

                <!-- Direct Call & Reply Action Buttons for Admin Phone -->
                <div style="margin-top: 24px; text-align: center;">
                  <a href="tel:${phone}" style="display: inline-block; background-color: #062C24; color: #D4AF37; padding: 12px 24px; border-radius: 30px; font-weight: bold; text-decoration: none; font-size: 13px; border: 1px solid #D4AF37; margin-right: 8px;">
                    📞 Call Client Now (${phone})
                  </a>
                </div>

              </div>

              <!-- Royal Footer -->
              <div style="background-color: #062C24; color: #a0a0a0; padding: 16px; text-align: center; font-size: 12px; border-top: 1px solid #D4AF37;">
                <p style="margin: 0 0 4px; color: #D4AF37; font-weight: 600;">R.S HERITAGE MARRIAGE & EVENT VENUE</p>
                <p style="margin: 0; color: #888888; font-size: 11px;">This enquiry was submitted automatically from the R.S Heritage website.</p>
              </div>

            </div>
          </body>
          </html>
        `
      };

      const info = await transporter.sendMail(mailOptions);

      if (isEthereal) {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log('=======================================================');
        console.log('📩 [Instant Live Email Preview URL Generated]');
        console.log(`🔗 Click/Open this link to see the email formatted in browser:`);
        console.log(`👉 ${previewUrl}`);
        console.log('=======================================================');
      } else {
        console.log(`[Nodemailer] Email successfully dispatched to ${receiver}: ${info.messageId}`);
      }
    } catch (mailError) {
      console.error('⚠️ [Nodemailer] Failed to dispatch email notification, but booking was saved in database:', mailError);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your inquiry has been sent to R.S Heritage. Our team will contact you shortly.'
    });
  } catch (error) {
    console.error('Error handling contact form API request:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process inquiry. Please try again later or call us directly.'
    });
  }
});

module.exports = router;
