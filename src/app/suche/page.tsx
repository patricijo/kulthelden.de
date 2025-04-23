import Link from "next/link";
import { searchMovie, searchPerson } from "@/data/getData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CastCard } from "@/components/CustomUi/CastCard";
import { PaginationComponent } from "@/components/CustomUi/Pagination";
import { MovieCard } from "@/components/CustomUi/MovieCard";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (await searchParams).query || "";
  const currentPage = Number((await searchParams).page) || 1;

  if (!query) {
    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-6">Filmsuche</h1>
          <p className="text-muted-foreground mb-4">
            Bitte geben Sie einen Suchbegriff ein, um Filme zu finden.
          </p>
        </div>
      </div>
    );
  }

  try {
    const movieResults = await searchMovie(query, currentPage);

    const personResults = await searchPerson(query, 1);

    return (
      <>
        <h1 className="text-2xl font-bold">
          Suchergebnisse für &quot;{query}&quot;
        </h1>

        {personResults.total_results > 0 && (
          <div className="space-y-2">
            <div className=" items-center">
              <h2 className="text-xl font-bold">Personen</h2>
              <span className="text-sm text-muted-foreground">
                {personResults.total_results} gefunden
              </span>
            </div>
            <Carousel
              className="max-w-full w-full"
              opts={{ slidesToScroll: "auto" }}
            >
              <div className="flex absolute -top-10 right-0 gap-2 overflow-hidden">
                <CarouselPrevious className="relative top-auto left-auto -translate-0" />
                <CarouselNext className="relative top-auto left-auto right-auto -translate-0" />
              </div>
              <CarouselContent>
                {personResults.results.map((person) => (
                  <CarouselItem
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/7 "
                    key={person.id}
                  >
                    <CastCard castMember={person} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}

        {/* Movies Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Filme</h2>
            {movieResults.total_results > 0 && (
              <span className="text-sm text-muted-foreground">
                {movieResults.total_results} gefunden (Seite {currentPage} von{" "}
                {movieResults.total_pages})
              </span>
            )}
          </div>
          {movieResults.results.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {movieResults.results.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>

              {movieResults.total_pages > 1 && (
                <PaginationComponent
                  href={`/suche?query=${encodeURIComponent(query)}&page=`}
                  pageNumber={currentPage}
                  totalPages={movieResults.total_pages}
                />
              )}
            </>
          ) : (
            <p className="text-muted-foreground">
              Keine Filme für &quot;{query}&quot; auf dieser Seite gefunden.
            </p>
          )}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error searching movies:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-red-500 text-xl mb-4">
          Fehler beim Laden der Suchergebnisse. Bitte versuchen Sie es später
          erneut.
        </div>
        <Link
          href="/"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Zurück zur Startseite
        </Link>
      </div>
    );
  }
}
