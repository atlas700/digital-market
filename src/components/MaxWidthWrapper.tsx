import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type MaxWidthWrapperTypes = {
  children: ReactNode;
  className?: string;
};

const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperTypes) => {
  return (
    <div
      className={cn(
        "mx-auto max-w-screen-xl px-2.5 md:px-20 w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
