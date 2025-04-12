import { Suspense } from "react";

import { MovieCard } from "@/components/CustomUi/MovieCard";
import { PaginationComponent } from "@/components/CustomUi/Pagination";
import { getGenreData } from "../layout";

type Props = {
  params: Promise<{
    id: string;
    page: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function KultGenrePage({ params }: Props) {
  return (
    <Suspense>
      <KultGenrePageContent params={params} />
    </Suspense>
  );
}

const KultGenrePageContent = async ({
  params,
}: {
  params: Props["params"];
}) => {
  const id = (await params).id.split("_")[0];
  const page = parseInt((await params).page, 10) || 1;

  const genreData = await getGenreData(id, page);

  return (
    <>
      {genreData.results.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-8 mt-8">
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
