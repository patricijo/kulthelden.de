import { KultSchauspielerPageContent } from "./[page]/page";

type Props = {
  params: Promise<object>;
};

export default async function KultGenrePage({ params }: Props) {
  return <KultSchauspielerPageContent params={params} />;
}
