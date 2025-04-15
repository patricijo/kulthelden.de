import { SkeletonCustom } from "@/components/CustomUi/SkeletonCustom";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingKultGenre() {
  return (
    <>
      <SkeletonCustom
        rows={4}
        className="basis-1/2 md:basis-1/4 lg:basis-1/4 pr-4"
      ></SkeletonCustom>
      <SkeletonCustom
        rows={4}
        className="basis-1/2 md:basis-1/4 lg:basis-1/4 pr-4"
      ></SkeletonCustom>
      <SkeletonCustom
        rows={4}
        className="basis-1/2 md:basis-1/4 lg:basis-1/4 pr-4"
      ></SkeletonCustom>
      <SkeletonCustom
        rows={4}
        className="basis-1/2 md:basis-1/4 lg:basis-1/4 pr-4"
      ></SkeletonCustom>

      <div className="mt-4 md:mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </>
  );
}
