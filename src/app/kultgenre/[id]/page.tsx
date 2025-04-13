import { Suspense } from "react";
import { KultGenrePageContent } from "./[page]/page";

type Props = {
  params: Promise<{
    id: string;
    page: string;
  }>;
};

export default async function KultGenrePage({ params }: Props) {
  <Suspense>
    <KultGenrePageContent params={params} />
  </Suspense>;
}
