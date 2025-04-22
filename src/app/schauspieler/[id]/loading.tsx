import { Skeleton } from "@/components/ui/skeleton";

import { SkeletonCustom } from "@/components/CustomUi/SkeletonCustom";

export default function Loading() {
  return (
    <>
      {/* Top section skeleton */}
      <div className="flex gap-4 md:gap-8 items-center sm:items-start">
        <div className="flex-1/3">
          <div className=" rounded-md overflow-hidden ">
            <Skeleton className="aspect-[2/3] items-center flex justify-center text-center w-full "></Skeleton>
          </div>
        </div>
        <div className="flex-2/3 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-secondary/10 rounded-lg">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">
                <Skeleton className="h-4 w-1/3" />
              </span>
              <span className="font-medium">
                <Skeleton className="h-6 w-1/2" />
              </span>
            </div>

            <div className="flex flex-col  space-y-2">
              <span className="text-sm text-muted-foreground">
                <Skeleton className="h-4 w-1/3" />
              </span>
              <span className="font-medium">
                <Skeleton className="h-6 w-1/2" />
              </span>
            </div>

            <div className="flex flex-col  space-y-2">
              <span className="text-sm text-muted-foreground">
                <Skeleton className="h-4 w-1/3" />
              </span>
              <Skeleton className="h-6 w-1/2" />
            </div>

            <div className="flex flex-col  space-y-2">
              <span className="text-sm text-muted-foreground">
                <Skeleton className="h-4 w-1/3" />
              </span>
              <span className="font-medium">
                <Skeleton className="h-6 w-1/2" />
              </span>
            </div>
          </div>
          <div className="hidden md:block space-y-2">
            <Skeleton className="h-8 w-2/5" />

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
      <div className="md:hidden space-y-2">
        <Skeleton className="h-8 w-2/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <CreditsSkeleton />
    </>
  );
}


export function CreditsSkeleton() {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3" />
  
          <SkeletonCustom
            rows={4}
            className="basis-1/2 md:basis-1/4 lg:basis-1/4 pr-4"
          />
        </div>
  
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-64 w-full rounded-md" />
        </div>
      </div>
    );
  }