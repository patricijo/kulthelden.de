import { getFilmData } from "@/data/getData";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id.split("_")[0];
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return {
      title: "Film nicht gefunden | KultHelden.de",
      description: "Der angeforderte Film wurde nicht gefunden.",
    };
  }

  try {
    const filmData = await getFilmData(numericId);

    let description = "Keine Beschreibung verfügbar für diesen Film.";
    if (filmData.overview) {
      description =
        filmData.overview.length > 160
          ? filmData.overview.substring(0, 157) + "..."
          : filmData.overview;
    }

    return {
      title: `${filmData.title} | KultHelden.de`,
      description: description,
      openGraph: {
        title: filmData.title,
        description: description,
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

export default async function FilmLayout({ params, children }: Props) {
  const id = (await params).id.split("_")[0];
  const numericId = parseInt(id, 10);

  try {
    const filmData = await getFilmData(numericId);

    return (
      <>
        {filmData.title}
        {children}
      </>
    );
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Film Details | KultHelden.de",
      description: "Fehler beim Laden der Film-Details.",
    };
  }
}
