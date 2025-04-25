// Removed import: import { getFilmData } from "@/data/getData";
// Removed import: import { Metadata } from "next";
import { Film } from "./components/Film";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// Removed const: const imageBaseUrl = "https://image.tmdb.org/t/p/";

// --- generateMetadata function removed from here ---

export default async function FilmPage({ params }: Props) {
  return <Film params={params} />;
}
