import { BackdropImage } from "@/components/CustomUi/BackdropImage";
import { ContentContainer } from "@/components/CustomUi/ContentContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { getGenreData } from "@/data/getData";
import { ListResponse } from "@/lib/tmdbTypes";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ReactNode, Suspense } from "react";
import ReactMarkdown from "react-markdown";

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
      title: "Kult-Genre nicht gefunden | KultHelden.de",
      description: "Die angeforderte Genre wurde nicht gefunden.",
    };
  }

  try {
    const genreData = await getGenreData(numericId);

    return {
      title: `${genreData.name} | KultHelden.de`,
      description:
        genreData.description ||
        "Keine Beschreibung verfügbar für dieses Genre.",
      openGraph: {
        title: genreData.name,
        description:
          genreData.description ||
          "Keine Beschreibung verfügbar für dieses Genre.",
        siteName: "KultHelden.de",
        images: genreData.backdrop_path
          ? [
              {
                url: `${imageBaseUrl}original${genreData.backdrop_path}`,
                width: 500,
                height: 300,
                alt: `${genreData.name} Poster`,
              },
            ]
          : [],
        type: "website",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Genre Details | KultHelden.de",
      description: "Fehler beim Laden der Genre-Details.",
    };
  }
}

export default async function KultGenreLayout({ params, children }: Props) {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Layout>{children}</Layout>}>
        <KultGenreContent params={params}>{children}</KultGenreContent>
      </Suspense>
    </div>
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

  if (isNaN(numericId)) {
    notFound();
  }

  const genreData = await getGenreData(numericId);

  if (genreData.results.length === 0) {
    notFound();
  }

  return <Layout genreData={genreData}>{children}</Layout>;
};

export const Layout = async ({
  children,
  genreData,
}: {
  children: ReactNode;
  genreData?: ListResponse;
}) => {
  return (
    <>
      {genreData ? (
        <BackdropImage
          image={`${imageBaseUrl}original${genreData?.backdrop_path}`}
          name={genreData?.name}
        />
      ) : (
        <BackdropImage name={null} />
      )}
      <ContentContainer>
        <div className="flex w-full flex-row gap-4 md:gap-8">
          <div className="hidden md:block flex-1/3 aspect-[2/3]">
            {genreData ? (
              <div className="grid grid-cols-2 grid-rows-2 gap-0 w-full max-w-2xl mx-auto rounded-md overflow-hidden shadow-lg">
                {genreData.results.slice(0, 4).map((src, index) => (
                  <div key={index} className="relative  aspect-[2/3] ">
                    <Image
                      src={imageBaseUrl + "w500" + src.poster_path}
                      alt={genreData.name + " poster " + (index + 1)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </div>
          <div className="flex-2/3">
            <article className="prose dark:prose-invert max-w-full">
              {genreData ? (
                <ReactMarkdown>{genreData.description}</ReactMarkdown>
              ) : (
                <>
                  <Skeleton className="w-2/3 h-8 mb-8" />

                  <Skeleton className="w-full h-4 mb-4" />

                  <Skeleton className="w-full h-4 mb-4" />

                  <Skeleton className="w-full h-4 mb-4" />

                  <Skeleton className="w-1/2 h-4 mb-4" />
                </>
              )}
            </article>
          </div>
        </div>
        {children}
      </ContentContainer>
    </>
  );
};
