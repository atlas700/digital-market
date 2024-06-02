import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

interface VerifyEmailPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmailPage = ({ searchParams }: VerifyEmailPageProps) => {
  const { token, email } = searchParams;

  return (
    <div className="container flex relative flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:max-w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col justify-center items-center space-y-1">
            <div className="relative w-60 h-60 mb-4 text-muted-foreground">
              <Image fill alt="email-sent-image" src="/hippo-email-sent.png" />
            </div>

            <h3 className="text-2xl font-semibold">Check your email</h3>
            {email ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email{" "}
                <span className="font-semibold">{email}</span>
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
