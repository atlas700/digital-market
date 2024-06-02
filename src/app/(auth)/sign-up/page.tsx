"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

const SignUpPage = () => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter();

  const { mutate: createPayloadUser, isLoading } =
    trpc.auth.createPayloadUser.useMutation({
      onSuccess: ({sentToEmail}) => {
         toast.success("Successfully created the account");
        return router.push(`/verify-email?email=${sentToEmail}`);
      },
      onError: (error) =>{
        if(error.data?.code === "CONFLICT")
          return toast.error("There was already a user with the same email Sign in instead");

          if(error instanceof ZodError)
            return toast.error(error.issues[0].message);

        return toast.error("Cannot create an account please try again")
         
      }
    });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    createPayloadUser({ email, password });
  };

  return (
    <>
      <div className=" container relative flex flex-col items-center justify-center mt-20 lg:px-0">
        <div className=" w-full mx-auto flex flex-col justify-center space-y-6 sm:w-[350px]">
          <div className=" flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create an account</h1>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "link" })}
            >
              Already have an account? Sign-in
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4">
            <form onSubmit={handleFormSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                    id="email"
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className="text-red-600 text-sm">
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                    id="password"
                    {...register("password")}
                  />
                  {errors.password ? (
                    <p className="text-red-600 text-sm">
                      {errors.password.message}
                    </p>
                  ) : null}
                </div>

                <Button disabled={isLoading}>Sign Up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
