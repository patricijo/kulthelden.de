import { Suspense } from "react";

import {
  getFilmCastData,
  getFilmCollectionData,
  getFilmData,
  getFilmTrailerData,
} from "@/data/getData";
import { BackdropImage } from "@/components/CustomUi/BackdropImage";
import { ContentContainer } from "@/components/CustomUi/ContentContainer";
import Image from "next/image";
import { Clock, Play, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CastCard } from "@/components/CustomUi/CastCard";
import { Metadata } from "next";
import { MovieCard } from "@/components/CustomUi/MovieCard";
import { TrailerDialog } from "@/components/TrailerDialog";

import { SkeletonCustom } from "@/components/CustomUi/SkeletonCustom";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return {
      title: "Film nicht gefunden | KultHelden.de",
      description: "Der angeforderte Film wurde nicht gefunden.",
    };
  }

  try {
    const filmData = await getFilmData(numericId);

    return {
      title: `${filmData.title} (${
        filmData.release_date
          ? new Date(filmData.release_date).getFullYear()
          : "Unknown"
      }) | KultHelden.de`,
      description:
        filmData.overview.substring(0, 160) +
          (filmData.overview.length > 160 ? "..." : "") ||
        "Keine Beschreibung verfügbar für diesen Film.",
      openGraph: {
        title: filmData.title,
        description:
          filmData.overview.substring(0, 160) +
            (filmData.overview.length > 160 ? "..." : "") ||
          "Keine Beschreibung verfügbar für diesen Film.",
        siteName: "Kulthelden.de",
        images: filmData.poster_path
          ? [
              {
                url: `https://image.tmdb.org/t/p/w500${filmData.poster_path}`,
                width: 500,
                height: 750,
                alt: `${filmData.title} poster`,
              },
            ]
          : [],
        type: "website",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Film Details | KultHelden.de",
      description: "Fehler beim Laden der Film-Details.",
    };
  }
}

export default async function FilmPage({ params }: Props) {
  return <FilmPageContent params={params} />;
}

const FilmPageContent = async ({ params }: Props) => {
  const id = (await params).id.split("_")[0];
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return <div>Film nicht gefunden</div>;
  }

  const filmData = await getFilmData(numericId);

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
                src={posterUrl}
                alt={`${filmData.title} poster`}
                width={256}
                height={384}
                className="object-cover w-full h-full"
              />
            </div>
            <Suspense
              fallback={
                <Button className="gap-2 w-full mt-2" disabled>
                  <Play className="h-4 w-4" />
                  <span>Lade Trailer...</span>
                </Button>
              }
            >
              <FilmTrailer id={filmData.id} />
            </Suspense>
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
        <div>
          <h2 className="text-xl mb-2 font-bold">Schauspieler</h2>
          <Suspense
            fallback={
              <SkeletonCustom
                rows={7}
                className="basis-1/1 md:basis-1/3 lg:basis-1/7 pr-4"
              />
            }
          >
            <FilmCast id={numericId} />
          </Suspense>
        </div>

        {filmData.belongs_to_collection && (
          <div>
            <h2 className="text-xl mb-2 font-bold">
              {filmData.belongs_to_collection.name}
            </h2>
            <Suspense
              fallback={
                <SkeletonCustom
                  rows={7}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/4 pr-4"
                />
              }
            >
              <FilmCollection id={filmData.belongs_to_collection.id} />
            </Suspense>
          </div>
        )}
      </ContentContainer>
    </>
  );
};

const FilmCast = async ({ id }: { id: number }) => {
  const castData = await getFilmCastData(id);
  //await delay(5000);

  return (
    <>
      <Carousel className="max-w-full w-full" opts={{ slidesToScroll: "auto" }}>
        <div className="flex absolute -top-10 right-0 gap-2 overflow-hidden">
          <CarouselPrevious className="relative top-auto left-auto -translate-0" />
          <CarouselNext className="relative top-auto left-auto right-auto -translate-0" />
        </div>
        <CarouselContent>
          {castData.cast.map((person) => (
            <CarouselItem
              className="basis-1/1 md:basis-1/3 lg:basis-1/7 "
              key={person.cast_id}
            >
              <CastCard castMember={person} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

const FilmCollection = async ({ id }: { id: number }) => {
  const collectionData = await getFilmCollectionData(id);
  //await delay(5000);

  collectionData.parts.sort((a, b) => {
    return a.release_date.localeCompare(b.release_date);
  });

  return (
    <>
      <Carousel opts={{ slidesToScroll: "auto" }} className="max-w-full w-full">
        <div className="flex absolute -top-10 right-0 gap-2">
          <CarouselPrevious className="relative top-auto left-auto -translate-0" />
          <CarouselNext className="relative top-auto left-auto right-auto -translate-0" />
        </div>
        <CarouselContent>
          {collectionData.parts.map((movie) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/4 lg:basis-1/4"
              key={movie.id}
            >
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

const FilmTrailer = async ({ id }: { id: number }) => {
  const trailerData = await getFilmTrailerData(id);
  //await delay(5000);

  return (
    <>
      {trailerData.results.some(
        (video) => video.type.toLowerCase() === "trailer"
      ) && (
        <TrailerDialog
          trailerKey={
            trailerData.results.find(
              (video) => video.type.toLowerCase() === "trailer"
            )?.key
          }
        />
      )}
    </>
  );
};
