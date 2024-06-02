import dotenv from "dotenv";
import path from "path";
import generateEmailHTML from "./generateEmailHTML";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const generateVerificationEmail = async (args: any): Promise<string> => {
  const { user, token } = args;

  return generateEmailHTML({
    headline: "Verify your account",
    content: `<p>Hi${
      user.name ? " " + user.name : ""
    }! Validate your account by clicking the button below.</p>`,
    cta: {
      // TODO: create a verification page for email callback verify-link.
      buttonLabel: "Verify",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}&email=${user.email}`,
    },
  });
};

export default generateVerificationEmail;
