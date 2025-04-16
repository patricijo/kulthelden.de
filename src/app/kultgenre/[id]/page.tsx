import KultGenrePage from "./[page]/page";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function KultGenrePageBase({ params }: Props) {
  return <KultGenrePage params={params} />;
}
