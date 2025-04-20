import { getPersonData } from "@/data/getData";

import Image from "next/image";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SchauspielerPage({ params }: Props) {
  const { id } = await params;
  const numericId = parseInt(id.split("_")[0], 10);

  if (isNaN(numericId)) {
    return <div>Film nicht gefunden</div>;
  }

  const schauspielerData = await getPersonData(numericId);
  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const profileUrl = schauspielerData.profile_path
    ? `${imageBaseUrl}w300${schauspielerData.profile_path}`
    : null;

  return (
    <>
      <div className="flex gap-4 md:gap-8 items-center sm:items-start">
        <div className="flex-1/3">
          <div className=" rounded-md overflow-hidden shadow-lg">
            {profileUrl && (
              <Image
                src={profileUrl}
                alt={`${schauspielerData.name} poster`}
                width={256}
                height={384}
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>
        <div className="flex-2/3 space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold">
            {schauspielerData.name}
          </h1>

          <p className="text-md md:text-lg max-w-2xl">
            {schauspielerData.biography}
          </p>
        </div>
      </div>
    </>
  );
}
