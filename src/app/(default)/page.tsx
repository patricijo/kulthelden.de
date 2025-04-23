import { CastCard } from "@/components/CustomUi/CastCard";
import { MovieCard } from "@/components/CustomUi/MovieCard";
import { SkeletonCustom } from "@/components/CustomUi/SkeletonCustom";
import { HeadingBig, HeadingSmall } from "@/components/CustomUi/Text";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { getNowPlaying, getRandomKultschauspieler } from "@/data/getData";
import { kultGenres } from "@/data/kultGenres";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div className="space-y-2">
        <HeadingBig>Willkommen bei KultHelden.de</HeadingBig>
        <p className="text-muted-foreground">
          Entdecke die Welt der Kultfilme und legendären Schauspieler! Stöbere
          durch unsere Genres, finde spannende Hintergrundinfos und lass dich
          von unseren Kulthelden der Woche inspirieren.
        </p>
      </div>
      <Suspense
        fallback={
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <SkeletonCustom
              rows={7}
              className="basis-1/2 md:basis-1/4 lg:basis-1/6 pr-4"
            />
          </div>
        }
      >
        <AktuelleFilme />
      </Suspense>
      <div className="space-y-2">
        <HeadingSmall>Unsere Kult-Genres</HeadingSmall>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kultGenres.map((genre, index) => (
            <Link
              key={index}
              href={"/kultgenre/" + genre.id + "_" + genre.url + "#start"}
            >
              <div className="bg-accent p-4 rounded-lg h-full">
                <HeadingSmall>{genre.name}</HeadingSmall>
                <p>{genre.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Suspense
        fallback={
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <SkeletonCustom
              rows={7}
              className="basis-1/2 md:basis-1/3 lg:basis-1/7 pr-4"
            />
          </div>
        }
      >
        <KultHelden />
      </Suspense>
    </>
  );
}

const KultHelden = async () => {
  const kultschauspieler = await getRandomKultschauspieler(7);

  return (
    <div className="space-y-2">
      <HeadingSmall>Kulthelden der Woche</HeadingSmall>
      <Carousel className="max-w-full w-full" opts={{ slidesToScroll: "auto" }}>
        <div className="flex absolute -top-10 right-0 gap-2 overflow-hidden">
          <CarouselPrevious className="relative top-auto left-auto -translate-0" />
          <CarouselNext className="relative top-auto left-auto right-auto -translate-0" />
        </div>
        <CarouselContent>
          {kultschauspieler.map((schauspieler, index) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/3 lg:basis-1/7 "
              key={index}
            >
              <CastCard castMember={schauspieler} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

const AktuelleFilme = async () => {
  const aktuelleFilme = await getNowPlaying();

  return (
    <div className="space-y-2">
      <HeadingSmall>Aktuelle Filme</HeadingSmall>
      <Carousel className="max-w-full w-full" opts={{ slidesToScroll: "auto" }}>
        <div className="flex absolute -top-10 right-0 gap-2 overflow-hidden">
          <CarouselPrevious className="relative top-auto left-auto -translate-0" />
          <CarouselNext className="relative top-auto left-auto right-auto -translate-0" />
        </div>
        <CarouselContent>
          {aktuelleFilme.results.map((movie, index) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/4 lg:basis-1/6 "
              key={index}
            >
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
