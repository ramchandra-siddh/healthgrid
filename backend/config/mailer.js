import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_HEALTHGRID_API_KEY);

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   logger: true,
//   debug: true,
// });

async function sendMail({ to, subject, html }) {
  try {
    const info = await resend.emails.send({
      from: "HealthGrid <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("Email sent:", info?.id || "No ID");
    return true;
  } catch (err) {
    console.error("Email error:", err);
    return false;
  }
}

export default sendMail;
