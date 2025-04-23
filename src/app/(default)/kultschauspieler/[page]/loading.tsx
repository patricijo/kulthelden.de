import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingKultschauspieler() {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <Skeleton className="aspect-[2/3] h-full w-full rounded-md" />
            <Skeleton className="h-5 w-3/4 " />
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Previous button */}
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Page 1 */}
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Current page */}
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Next page */}
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Next button */}
        </div>
      </div>
    </div>
  );
}
