import { Suspense } from "react";
import { KultGenrePageContent } from "./[page]/page";
import { SkeletonCustom } from "@/components/CustomUi/SkeletonCustom";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function KultGenrePage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <>
          <SkeletonCustom
            rows={4}
            className="basis-1/2 md:basis-1/4 lg:basis-1/4 pr-4"
          ></SkeletonCustom>
          <SkeletonCustom
            rows={4}
            className="basis-1/2 md:basis-1/4 lg:basis-1/4 pr-4"
          ></SkeletonCustom>
        </>
      }
    >
      <KultGenrePageContent params={params} />
    </Suspense>
  );
}
