import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Skeleton } from "../ui/skeleton";

type Probs = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  rows: number;
};

export const SkeletonCustom = ({ rows, className, ...props }: Probs) => {
  return (
    <div className="flex flex-nowrap overflow-hidden" {...props}>
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className={cn("min-w-0 shrink-0 grow-0 overflow-hidden", className)}
        >
          <Skeleton className="w-full aspect-[2/3] rounded-md mb-2" />
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
};
