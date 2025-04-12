import { Suspense } from "react";

import { getFilmData } from "@/data/getData";
import { BackdropImage } from "@/components/CustomUi/BackdropImage";
import { ContentContainer } from "@/components/CustomUi/ContentContainer";
import Image from "next/image";
import { Clock, Star } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FilmPage({ params }: Props) {
  return (
    <Suspense>
      <FilmPageContent params={params} />
    </Suspense>
  );
}

const FilmPageContent = async ({ params }: { params: Props["params"] }) => {
  const id = (await params).id.split("_")[0];

  const filmData = await getFilmData(id);

  const imageBaseUrl = "https://image.tmdb.org/t/p/";

  const posterUrl = filmData.poster_path
    ? `${imageBaseUrl}w500${filmData.poster_path}`
    : "/placeholder-poster.jpg";

  const backdropUrl = filmData.backdrop_path
    ? `${imageBaseUrl}original${filmData.backdrop_path}`
    : null;

  const releaseYear = filmData.release_date
    ? new Date(filmData.release_date).getFullYear()
    : "Unbekannt";

  const formattedDate = filmData.release_date
    ? new Date(filmData.release_date).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown release date";

  return (
    <>
      <BackdropImage image={backdropUrl} name={filmData.title} />
      <ContentContainer>
        <div className="flex gap-4 md:gap-8 items-center sm:items-start">
          <div className="flex-1/3">
            <div className=" rounded-md overflow-hidden shadow-lg">
              <Image
                src={posterUrl || "/placeholder.svg"}
                alt={`${filmData.title} poster`}
                width={256}
                height={384}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex-2/3 space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold">
              {filmData.title}
              {releaseYear !== "Unbekannt" && (
                <span className="text-2xl font-normal"> ({releaseYear})</span>
              )}
            </h1>
            {filmData.tagline && (
              <p className="text-md md:text-lg italic text-muted-foreground">
                {filmData.tagline}
              </p>
            )}

            <div className="flex flex-wrap gap-1 md:gap-4 items-center text-xs sm:text-lg">
              <div className="flex items-center gap-1">
                <Star className="fill-yellow-400 text-yellow-400 h-4 w-4 md:h-5 md-w-5" />
                <span className="font-semibold">
                  {filmData.vote_average.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                <span>{filmData.runtime} min</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="">{formattedDate}</span>
            </div>

            <p className="hidden sm:block text-md md:text-lg max-w-2xl">
              {filmData.overview}
            </p>
          </div>
        </div>

        <p className="sm:hidden text-md md:text-lg max-w-2xl">
          {filmData.overview}
        </p>
      </ContentContainer>
    </>
  );
};
