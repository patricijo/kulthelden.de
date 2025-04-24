import { CastCard } from "@/components/CustomUi/CastCard";
import { PaginationComponent } from "@/components/CustomUi/Pagination";
import { ReadMore } from "@/components/CustomUi/ReadMore";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getKultSchauspielerData,
  getRandomKultschauspieler,
} from "@/data/getData";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    page?: string;
  }>;
};

export default async function KultSchauspielerPage({ params }: Props) {
  return <KultSchauspielerPageContent params={params} />;
}

const KultSchauspielerPageContent = async ({ params }: Props) => {
  const page = (await params).page || "1";
  const numericPage = parseInt(page, 10);

  const kultSchauspielerData = await getKultSchauspielerData(numericPage);

  return (
    <>
      <Suspense fallback={<SpotlightSkeleton />}>
        <Spotlight />
      </Suspense>

      {kultSchauspielerData.results.length > 0 && (
        <>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
              {kultSchauspielerData.results.map((person) => {
                return <CastCard castMember={person} key={person.id} />;
              })}
            </div>

            <PaginationComponent
              href={`/kultschauspieler/`}
              pageNumber={numericPage}
              totalPages={Math.ceil(kultSchauspielerData.totalItems / 20)}
            />
          </div>
        </>
      )}
    </>
  );
};

const Spotlight = async () => {
  const randomSchauspieler = await getRandomKultschauspieler(1);

  return (
    <>
      <div className="flex gap-8">
        <div className="flex-1/4">
          <CastCard castMember={randomSchauspieler[0]} noName />
        </div>
        <div className="flex-3/4 flex flex-col gap-4">
          <div>
            <div className=" text-muted-foreground">Heute in Spotlight:</div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {randomSchauspieler[0].name}
            </h2>
          </div>
          <ReadMore maxLines={5} className="text-md max-w-2xl">
            {randomSchauspieler[0].biography}
          </ReadMore>
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
        <div>
          <Skeleton className="h-4 w-34 mb-2" />
          <Skeleton className="h-8 w-64" />
        </div>
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
