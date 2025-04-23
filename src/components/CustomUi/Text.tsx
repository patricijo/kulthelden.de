import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Probs = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

export const HeadingBig = ({ children, className, ...props }: Probs) => {
  return (
    <h1 className={cn("text-2xl md:text-3xl font-bold", className)} {...props}>
      {children}
    </h1>
  );
};

export const HeadingSmall = ({ children, className, ...props }: Probs) => {
  return (
    <h2 className={cn("text-md md:text-xl font-bold", className)} {...props}>
      {children}
    </h2>
  );
};

export const Text = ({ children, className, ...props }: Probs) => {
  return (
    <p className={cn("text-sm", className)} {...props}>
      {children}
    </p>
  );
};
