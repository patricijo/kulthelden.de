import { ReadMore } from "@/components/CustomUi/ReadMore";
import { MovieTable } from "@/components/CustomUi/MovieTable";
import { getPersonCredits, getPersonData } from "@/data/getData";

import Image from "next/image";
import { MovieCard } from "@/components/CustomUi/MovieCard";

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

  const formattedDate = schauspielerData.birthday
    ? new Date(schauspielerData.birthday).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unbekannt";

  const getGender = (genderValue: number): string => {
    switch (genderValue) {
      case 0:
        return "Nicht angegeben";
      case 1:
        return "Weiblich";
      case 2:
        return "Männlich";
      case 3:
        return "Nichtbinär";
      default:
        return "Nicht angegeben";
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-secondary/10 rounded-lg">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Geschlecht</span>
              <span className="font-medium">
                {getGender(schauspielerData.gender)}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Bekannt für</span>
              <span className="font-medium">
                {schauspielerData.known_for_department || "Nicht angegeben"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                Geburtsdatum
              </span>
              <span className="font-medium">{formattedDate}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Geburtsort</span>
              <span className="font-medium">
                {schauspielerData.place_of_birth || "Nicht angegeben"}
              </span>
            </div>
          </div>
          <div className="hidden md:block space-y-2">
            <h2 className="text-md md:text-xl font-bold">Biografie</h2>
            <ReadMore maxLines={5} className="text-md max-w-2xl">
              {schauspielerData.biography}
            </ReadMore>
          </div>
        </div>
      </div>
      <div className="md:hidden space-y-2">
        <h2 className="text-md md:text-xl font-bold">Biografie</h2>
        <ReadMore maxLines={5} className="text-md max-w-2xl">
          {schauspielerData.biography}
        </ReadMore>
      </div>
      <SchauspielerCredits id={numericId} />
    </>
  );
}

const SchauspielerCredits = async ({ id }: { id: number }) => {
  const credits = await getPersonCredits(id);

  const bestMovies = [...credits.cast]
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 4);

  return (
    <>
      <div>
        <h1 className="text-md md:text-xl font-bold mb-4">Die besten Filme</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {bestMovies.length > 0 &&
            bestMovies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
        </div>
      </div>
      <div>
        <h1 className="text-md md:text-xl font-bold mb-4">Alle Filme</h1>
        <MovieTable data={credits.cast} />
      </div>
    </>
  );
};
