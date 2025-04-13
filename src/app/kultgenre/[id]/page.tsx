import { Suspense } from "react";
import { KultGenrePageContent } from "./[page]/page";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function KultGenrePage({ params }: Props) {
  return (
    <Suspense>
      <KultGenrePageContent params={params} />
    </Suspense>
  );
}
