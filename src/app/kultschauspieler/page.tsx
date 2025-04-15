import KultSchauspielerPage from "./[page]/page";

type Props = {
  params: Promise<object>;
};

export default async function KultSchauspielerPageBase({ params }: Props) {
  return <KultSchauspielerPage params={params} />;
}
