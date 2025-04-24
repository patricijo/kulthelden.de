import { getFilmData } from "@/data/getData";

import { Metadata } from "next";

import { ReactNode, Suspense } from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

const imageBaseUrl = "https://image.tmdb.org/t/p/";

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

    const description = `Details zum Film Handlung, Besetzung und mehr auf KultHelden.de.`;

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

export default async function KultGenreLayout({ children, params }: Props) {
  return (
    <Suspense fallback={<>jhkhk</>}>
      <KultGenreContent params={params}>{children}</KultGenreContent>
    </Suspense>
  );
}

const KultGenreContent = async ({
  params,
  children,
}: {
  params: Props["params"];
  children: ReactNode;
}) => {
  const id = (await params).id.split("_")[0];

  const numericId = parseInt(id, 10);

  const genreData = await getFilmData(numericId);

  return (
    <>
      zfzfzf
      {JSON.stringify(genreData)}
      {children}
    </>
  );
};
