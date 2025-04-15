import { MovieCard } from "@/components/CustomUi/MovieCard";
import { PaginationComponent } from "@/components/CustomUi/Pagination";
import { getGenreData } from "@/data/getData";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
    page?: string;
  }>;
};

export default async function KultGenrePage({ params }: Props) {
  return <KultGenrePageContent params={params} />;
}

const KultGenrePageContent = async ({
  params,
}: {
  params: Props["params"];
}) => {
  const { id, page } = await params;
  const numericId = parseInt(id.split("_")[0], 10);
  const numericPage = page ? parseInt(page, 10) : 1;

  if (isNaN(numericId)) {
    return notFound();
  }

  const genreData = await getGenreData(numericId, numericPage);

  return (
    <>
      {genreData.results.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-8">
            {genreData.results.map(
              (movie) =>
                movie.media_type === "movie" && (
                  <MovieCard movie={movie} key={movie.id} />
                )
            )}
          </div>

          <PaginationComponent
            href={`/kultgenre/${id}/`}
            pageNumber={numericPage}
            totalPages={genreData.total_pages}
          />
        </>
      )}
    </>
  );
};
