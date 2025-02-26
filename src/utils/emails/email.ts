import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { resend } from "./resend.config.js";

export async function sendVerificationEmail(
  email: string,
  verificationCode: string
) {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your Account",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ),
    });

    console.log("email send", response);
  } catch (err) {
    console.log(err);
  }
}
