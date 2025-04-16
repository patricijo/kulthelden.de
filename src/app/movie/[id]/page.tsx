import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getFilmData } from "@/data/getData";

// Define the type for page props
type Props = {
  params: Promise<{
    id: string;
  }>;
};

// Generate metadata for SEO

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return {
      title: "Movie Not Found",
      description: "The requested movie could not be found.",
    };
  }

  try {
    // Fetch movie data
    const movie = await getFilmData(numericId);

    // Construct metadata
    return {
      title: `${movie.title} (${
        movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : "Unknown"
      }) | Movie Explorer`,
      description: movie.overview || "No overview available for this movie.",
      openGraph: {
        title: movie.title,
        description: movie.overview || "No overview available for this movie.",
        images: movie.poster_path
          ? [
              {
                url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                width: 500,
                height: 750,
                alt: `${movie.title} poster`,
              },
            ]
          : [],
        type: "website",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Movie Details | Movie jnExplorer",
      description: "View details about this movie.",
    };
  }
}

// Define the default function to fetch and display movie details
export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  // Get the movie ID from params

  // Validate ID
  if (isNaN(numericId)) {
    notFound();
  }

  try {
    // Fetch movie data, credits, videos, recommendations, and similar movies in parallel
    const movie = await getFilmData(numericId);

    // Extract cast from credits

    // Base URL for images
    const imageBaseUrl = "https://image.tmdb.org/t/p/";

    // Prepare image URLs
    const posterUrl = movie.poster_path
      ? `${imageBaseUrl}w500${movie.poster_path}`
      : "/placeholder-poster.jpg";

    const backdropUrl = movie.backdrop_path
      ? `${imageBaseUrl}original${movie.backdrop_path}`
      : null;

    // Format dates and other display data
    const releaseYear = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : "Unknown";

    return (
      <div className="min-h-screen bg-background">
        <div className="relative h-[60vh] w-full ">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src={backdropUrl || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-20 mx-auto h-full flex items-center justify-center pb-32 px-8">
            <h1 className="text-white/90 text-4xl md:text-5xl font-bold drop-shadow-xl">
              {movie.title}
            </h1>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32 ">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl ">
            <div className="p-6 md:p-8">
              <div className="mx-auto flex pb-8">
                <div className="flex flex-row gap-6 items-start">
                  <div className="block w-46 md:w-64 flex-shrink-0">
                    <div className=" rounded-md overflow-hidden shadow-lg">
                      <Image
                        src={posterUrl || "/placeholder.svg"}
                        alt={`${movie.title} poster`}
                        width={256}
                        height={384}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Trailer Button */}
                  </div>
                  <div className="flex-1 text-primary">
                    <h1 className="text-3xl md:text-4xl font-bold">
                      {movie.title}
                      {releaseYear !== "Unknown" && (
                        <span className="text-2xl font-normal">
                          ({releaseYear})
                        </span>
                      )}
                    </h1>
                    {movie.tagline && (
                      <p className="text-lg italic text-gray-600 dark:text-gray-300 mt-2">
                        {movie.tagline}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {movie.genres?.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-lg max-w-2xl">{movie.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading movie details:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-red-500 text-xl mb-4">
          Failed to load movie details. Please try again later.
        </div>
        <Link
          href="/"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Back to Home
        </Link>
      </div>
    );
  }
}

// Generate static params for popular movies to pre-render
// export async function generateStaticParams() {
//   try {
//     const data = await fetchPopularMovies();
//     return data.results.slice(0, 20).map((movie) => ({
//       id: movie.id.toString(),
//     }));
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     return [];
//   }
// }

/* const queryMovie = cache(async ({ id }: { id: number }) => {
  const movie = await Promise.all([
    fetchMovie(id),
    fetchMovieCredits(id),
    fetchMovieVideos(id),
  ]);

  return movie;
}); */
