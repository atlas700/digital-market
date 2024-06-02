import dotenv from "dotenv";
import path from "path";
import type { EmailOptions } from "payload/config";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

let email: EmailOptions | undefined;

if (process.env.NODE_ENV !== "test")
  email = {
    transportOptions: {
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false (the default) for 587 and others
      requireTLS: true,
    },
    fromName: "Digital Marketplace",
    fromAddress: "onboarding@resend.dev",
  };
else
  email = {
    fromName: "Ethereal Email",
    fromAddress: "example@ethereal.com",
    logMockCredentials: true,
  };

export default email;
