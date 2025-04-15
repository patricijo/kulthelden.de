import { Metadata } from "next";

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
      title: "Movie Details | Movie Explorer",
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

    return <div className="min-h-screen bg-background">sss</div>;
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

/* const queryMovie = cache(async ({ id }: { id: number }) => {
  const movie = await Promise.all([
    fetchMovie(id),
    fetchMovieCredits(id),
    fetchMovieVideos(id),
  ]);

  return movie;
}); */
