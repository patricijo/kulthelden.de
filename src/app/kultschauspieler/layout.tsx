import { CastCard } from "@/components/CustomUi/CastCard";
import { ContentContainer } from "@/components/CustomUi/ContentContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandomKultschauspieler } from "@/data/getData";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export default async function KultSchauspielerLayout({ children }: Props) {
  return (
    <>
      <ContentContainer className="md:mt-32 pt-16 md:pt-8">
        <Suspense fallback={<SpotlightSkeleton />}>
          <Spotlight />
        </Suspense>
        {children}
      </ContentContainer>
    </>
  );
}

const Spotlight = async () => {
  const randomSchauspieler = await getRandomKultschauspieler(1);

  return (
    <>
      <div className="flex gap-8">
        <div className="flex-1/4">
          <CastCard castMember={randomSchauspieler[0]} noName />
        </div>
        <div className="flex-3/4 flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            {randomSchauspieler[0].name}
          </h2>
          {randomSchauspieler[0].biography}
        </div>
      </div>
    </>
  );
};
const SpotlightSkeleton = () => {
  return (
    <div className="flex gap-8">
      <div className="flex-1/4">
        <Skeleton className="aspect-[2/3] w-full rounded-md" />
      </div>
      <div className="flex-3/4 flex flex-col gap-5">
        <Skeleton className="h-8 w-64" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
};
