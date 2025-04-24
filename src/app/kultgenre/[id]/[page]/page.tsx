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
  const id = (await params).id.split("_")[0];
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return notFound();
  }

  const pageParam = (await params).page;
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const genreData = await getGenreData(numericId, page);

  return (
    <>
      {genreData.results.length > 0 && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {genreData.results.map(
              (movie) =>
                movie.media_type === "movie" && (
                  <MovieCard movie={movie} key={movie.id} />
                )
            )}
          </div>

          <PaginationComponent
            href={`/kultgenre/${id}/`}
            pageNumber={page}
            totalPages={genreData.total_pages}
          />
        </div>
      )}
    </>
  );
};
