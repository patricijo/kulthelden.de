import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Probs = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

export const ContentContainer = ({ children, className, ...props }: Probs) => {
  return (
    <div
      className={cn(
        "max-w-6xl mx-auto p-4 md:p-8 relative z-20 bg-card rounded-lg shadow-xl gap-4 md:gap-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
