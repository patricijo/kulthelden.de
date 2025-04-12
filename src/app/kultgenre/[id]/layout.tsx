import { tmdbFetch } from "@/lib/tmdb";
import { ListResponse } from "@/lib/tmdbTypes";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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
  const { id } = await params;
  return (
    <>
      <div className="min-h-screen bg-background">
        <Suspense>
          <KultGenreHeader params={params} />
        </Suspense>
      </div>
      {children}
      {id}
    </>
  );
}

const KultGenreHeader = async ({ params }: { params: Props["params"] }) => {
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
      <div className="relative h-[60vh] w-full ">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {backdropUrl !== null && (
          <Image
            src={backdropUrl}
            alt={genreData.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-20 mx-auto h-full flex flex-col items-center justify-center pb-32 px-8">
          <h1 className="text-white/90 text-4xl md:text-5xl font-bold drop-shadow-xl">
            {genreData.name}
          </h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4 md:p-8 lg:px-8 relative z-20 -mt-32 bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-row gap-8 items-start ">
        <div className="block w-46 md:w-64 flex-shrink-0">
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
        <article className="max-w-full prose dark:prose-invert">
          <ReactMarkdown>{genreData.description}</ReactMarkdown>
        </article>
      </div>
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
