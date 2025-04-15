import { Suspense } from "react";
import { MovieCard } from "@/components/CustomUi/MovieCard";
import { PaginationComponent } from "@/components/CustomUi/Pagination";
import { getGenreData } from "@/data/getData";
import { SkeletonCustom } from "@/components/CustomUi/SkeletonCustom";

type Props = {
  params: Promise<{
    id: string;
    page?: string;
  }>;
};

//const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

export const KultGenrePageContent = async ({
  params,
}: {
  params: Props["params"];
}) => {
  const id = (await params).id.split("_")[0];

  const pageParam = (await params).page;
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const genreData = await getGenreData(numericId, page);

  return (
    <>
      {genreData.results.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-8">
            {genreData.results.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          <PaginationComponent
            href={`/kultgenre/${id}/`}
            pageNumber={page}
            totalPages={genreData.total_pages}
          />
        </>
      )}
    </>
  );
};
