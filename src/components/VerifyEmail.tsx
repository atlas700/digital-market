"use client";

import { trpc } from "@/trpc/client";
import { Loader2, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { isLoading, isError, data } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-2">
        <XCircleIcon className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold">There was an error</h3>
        <p className="text-muted-foreground text-sm">
          This token is not valid or might be expired. Please try again
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/hippo-email-sent.png" alt="email sent image" fill />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set</h3>
        <p className="text-muted-foreground mt-1 text-center">
          Thank you for verifying your email
        </p>
        <Link href="/sign-in" className={buttonVariants({ className: "mt-4" })}>
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-2">
        <Loader2 className="text-zinc-300 animate-spin w-8 h-8" />
        <h3 className="text-semibold">Verifying...</h3>
        <p className="text-muted-foreground text-sm">
          Please wait a moment to verifying your account. It won&apos;t take so
          long.
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
