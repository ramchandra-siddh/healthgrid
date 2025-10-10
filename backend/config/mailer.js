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
