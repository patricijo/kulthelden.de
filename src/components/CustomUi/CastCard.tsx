import Image from "next/image";
import Link from "next/link";
import { Person, PersonDetails } from "@/lib/tmdbTypes";

interface CastCardProps {
  castMember: Person | PersonDetails;
  imageSize?: string;
  noName?: boolean;
}

export function CastCard({
  castMember,
  imageSize = "w300",
  noName,
}: CastCardProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const profileUrl = castMember.profile_path
    ? `${imageBaseUrl}${imageSize}${castMember.profile_path}`
    : null;

  const castSlug = castMember.name
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  return (
    <>
      <Link href={`/cast/${castMember.id}_${castSlug}`} className="group">
        <div className="rounded-md overflow-hidden relative">
          {castMember.kult === true && (
            <div className="absolute top-2 right-2 z-10 bg-red-600 px-2 py-0.5 rounded text-white text-xs font-medium">
              <em>Kult</em>
            </div>
          )}

          {profileUrl ? (
            <Image
              src={profileUrl}
              alt={castMember.name}
              width={300}
              height={450}
              className="object-cover w-full aspect-[2/3] group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="object-cover w-full aspect-[2/3] group-hover:scale-105 transition-transform items-center flex bg-accent p-4 justify-center text-center">
              Kein Bild vorhanden
            </div>
          )}
        </div>
        {!noName && (
          <div className="mt-2">
            <h3 className="font-medium text-sm">{castMember.name}</h3>
            <p className="text-sm text-muted-foreground">
              {"character" in castMember ? castMember.character : ""}
            </p>
          </div>
        )}
      </Link>
    </>
  );
}
