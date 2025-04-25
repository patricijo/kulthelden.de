import { getFilmData } from "@/data/getData";
import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const imageBaseUrl = "https://image.tmdb.org/t/p/";

// --- Moved generateMetadata function ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseInt(id.split("_")[0], 10);

  if (isNaN(numericId)) {
    return {
      title: "Film nicht gefunden | KultHelden.de",
      description: "Der angeforderte Film wurde nicht gefunden.",
    };
  }

  try {
    const filmData = await getFilmData(numericId);

    const releaseYear = filmData.release_date
      ? new Date(filmData.release_date).getFullYear()
      : null;

    let description = `Details zum Film ${filmData.title}${
      releaseYear ? ` (${releaseYear})` : ""
    }. ${
      filmData.tagline ? filmData.tagline + "." : ""
    } Handlung, Besetzung und mehr auf KultHelden.de.`;

    // Add a fallback if the constructed description is minimal or empty
    if (!description || description.trim().length < 20) { // Example threshold
        description = `Erfahre mehr über den Film ${filmData.title} auf KultHelden.de. Handlung, Besetzung und weitere Details.`;
    }

    return {
      title: `${filmData.title} | KultHelden.de`,
      description: description,
      openGraph: {
        title: `${filmData.title} | KultHelden.de`,
        description: description,
        siteName: "KultHelden.de",
        images: filmData.poster_path
          ? [
              {
                url: `${imageBaseUrl}original${filmData.poster_path}`,
                width: 500,
                height: 300,
                alt: `${filmData.title} Poster`,
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

// --- Basic Layout Component ---
export default function FilmLayout({ children }: { children: ReactNode }) {
  // This layout doesn't need to add any extra structure,
  // it just renders the page content passed to it.
  return <>{children}</>;
}