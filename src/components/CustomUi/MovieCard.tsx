import Image from "next/image";
import Link from "next/link";

import { Star } from "lucide-react";
import { Movie } from "@/lib/tmdbTypes";

interface MovieCardProps {
  movie: Movie;
  imageSize?: string;
}

export function MovieCard({ movie, imageSize = "w185" }: MovieCardProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${imageSize}${movie.poster_path}`
    : "/placeholder-poster.jpg";

  const titleSlug = movie.title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  return (
    <>
      <Link href={`/film/${movie.id}_${titleSlug}`} className="group">
        <div className="rounded-md overflow-hidden">
          <Image
            src={posterUrl || "/placeholder.svg"}
            alt={movie.title}
            width={200}
            height={300}
            className="object-cover w-full aspect-[2/3] group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <Star className="fill-yellow-400 text-yellow-400 h-4 w-4" />
            <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
          </div>
          <p className="font-medium mt-1">{movie.title}</p>
          <p className="text-sm text-muted-foreground text-right">
            {movie.release_date
              ? new Date(movie.release_date).toLocaleDateString("de-DE")
              : ""}
          </p>
        </div>
      </Link>
    </>
  );
}
