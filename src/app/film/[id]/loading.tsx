import { Skeleton } from "@/components/ui/skeleton";
import { ContentContainer } from "@/components/CustomUi/ContentContainer";
import { Clock, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkeletonCustom } from "@/components/CustomUi/SkeletonCustom";
import { BackdropImage } from "@/components/CustomUi/BackdropImage";

export default function Loading() {
  return (
    <>
      <BackdropImage name={<div className=" opacity-25">Lade...</div>} />

      <ContentContainer>
        <div className="flex gap-4 md:gap-8 items-center sm:items-start">
          <div className="flex-1/3">
            <div className="rounded-md overflow-hidden shadow-lg aspect-[2/3]">
              <Skeleton className="w-full h-full" />
            </div>

            <Button className="gap-2 w-full mt-2" disabled>
              <Play className="h-4 w-4" />
              <span>Lade Trailer...</span>
            </Button>
          </div>

          <div className="flex-2/3 space-y-5">
            {/* Title skeleton */}
            <Skeleton className="h-10 w-3/4" />

            {/* Tagline skeleton */}
            <Skeleton className="h-6 w-1/2" />

            {/* Rating and info skeleton */}
            <div className="flex flex-wrap gap-1 md:gap-4 items-center">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                <Skeleton className="h-5 w-8" />
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                <Skeleton className="h-5 w-16" />
              </div>
              <span className="text-muted-foreground">•</span>
              <Skeleton className="h-5 w-32" />
            </div>

            {/* Overview skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        {/* Mobile overview skeleton */}
        <div className="sm:hidden mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Cast section skeleton */}
        <div className="mt-8">
          <Skeleton className="h-8 w-40 mb-2" />
          <SkeletonCustom
            rows={7}
            className="basis-1/1 md:basis-1/3 lg:basis-1/7 pr-4"
          />
        </div>

        {/* Collection section skeleton */}
        <div className="mt-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <SkeletonCustom
            rows={4}
            className="basis-1/2 md:basis-1/4 lg:basis-1/4 pr-4"
          />
        </div>
      </ContentContainer>
    </>
  );
}
