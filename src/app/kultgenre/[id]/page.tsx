import { ReactNode, Suspense } from "react";
import { getGenreData } from "./layout";
import { MovieCard } from "@/components/CustomUi/MovieCard";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
    page: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function KultGenrePage({ params, children }: Props) {
  return (
    <Suspense>
      <KultGenrePageContent params={params}>{children}</KultGenrePageContent>
    </Suspense>
  );
}

const KultGenrePageContent = async ({
  params,
}: {
  params: Props["params"];
  children: ReactNode;
}) => {
  const id = (await params).id.split("_")[0];
  const page = parseInt((await params).page, 10) || 1;

  const genreData = await getGenreData(id, page);

  return (
    <>
      {genreData.results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-8 mt-8">
          {genreData.results.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </>
  );
};
