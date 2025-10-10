/*import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: true,
  debug: true,
});

async function sendMail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"HealthGrid" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("Email error:", err);
    return false;
  }
}

export default sendMail;     */

/* import sgMail from "@sendgrid/mail";
import "dotenv/config";

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail({ to, subject, html }) {
  try {
    const msg = {
      to, // recipient email
      from: process.env.SENDGRID_SENDER_EMAIL, // verified sender
      subject,
      html,
    };

    const info = await sgMail.send(msg);

    console.log("Email sent:", info[0].statusCode); // logs status code
    return true;
  } catch (err) {
    console.error("Email error:", err);
    return false;
  }
}

export default sendMail; */

import brevo from "@getbrevo/brevo";
import "dotenv/config";

// Initialize Brevo API client
const client = new brevo.TransactionalEmailsApi();
client.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_HEALTHGRID_API_KEY
);

// Send Mail Function
async function sendMail({ to, subject, html }) {
  try {
    const sendSmtpEmail = {
      sender: { name: "HealthGrid", email: process.env.SENDER_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };

    const response = await client.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent:", response.messageId || response);
    return true;
  } catch (err) {
    console.error("❌ Email error:", err);
    return false;
  }
}

export default sendMail;
