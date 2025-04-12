import { BackdropImage } from "@/components/CustomUi/BackdropImage";
import { ContentContainer } from "@/components/CustomUi/ContentContainer";
import { tmdbFetch } from "@/lib/tmdb";
import { ListResponse } from "@/lib/tmdbTypes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ReactNode, Suspense } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
    page: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function KulgGenreLayout({ params, children }: Props) {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Suspense>
          <KultGenreHeader params={params}>{children}</KultGenreHeader>
        </Suspense>
      </div>
    </>
  );
}

const KultGenreHeader = async ({
  params,
  children,
}: {
  params: Props["params"];
  children: ReactNode;
}) => {
  const id = (await params).id.split("_")[0];
  const page = parseInt((await params).page, 10) || 1;

  const genreData = await getGenreData(id, page);

  if (genreData.results.length === 0 && page > 1) {
    notFound();
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/";

  // Prepare image URLs
  const backdropUrl = genreData.backdrop_path
    ? `${imageBaseUrl}original${genreData.backdrop_path}`
    : null;

  return (
    <>
      <BackdropImage image={backdropUrl} name={genreData.name} />
      <ContentContainer>
        <div className="flex w-full flex-row gap-4 md:gap-8">
          <div className="hidden md:block flex-1/3">
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
          </div>
          <div className="flex-2/3">
            <article className="prose dark:prose-invert max-w-full">
              <ReactMarkdown>{genreData.description}</ReactMarkdown>
            </article>
          </div>
        </div>
        {children}
      </ContentContainer>
    </>
  );
};

export const getGenreData = async (id: string, page: number = 1) => {
  "use cache";

  const genreData = await tmdbFetch<ListResponse>(
    `/list/${id}?page=${page}`,
    {},
    true
  );

  return genreData;
};
