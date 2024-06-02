import generateEmailHTML from "./generateEmailHTML";

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const generateForgotPasswordEmail = async ({ token }: any): Promise<string> =>
  generateEmailHTML({
    headline: "Locked out?",
    content: "<p>Let&apos;s get you back in.</p>",
    cta: {
      buttonLabel: "Reset your password",
      url: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/reset-password?token=${token}`,
    },
  });

export default generateForgotPasswordEmail;
