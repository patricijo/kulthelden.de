import { CastCard } from "@/components/CustomUi/CastCard";
import { PaginationComponent } from "@/components/CustomUi/Pagination";
import { getKultSchauspielerData } from "@/data/getData";

type Props = {
  params: Promise<{
    page?: string;
  }>;
};

export default async function KultSchauspielerPage({ params }: Props) {
  return <KultSchauspielerPageContent params={params} />;
}

const KultSchauspielerPageContent = async ({ params }: Props) => {
  const page = (await params).page || "1";
  const numericPage = parseInt(page, 10);

  const kultSchauspielerData = await getKultSchauspielerData(numericPage);

  return (
    <>
      {kultSchauspielerData.results.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
            {kultSchauspielerData.results.map((person) => {
              return <CastCard castMember={person} key={person.id} />;
            })}
          </div>

          <PaginationComponent
            href={`/kultschauspieler/`}
            pageNumber={numericPage}
            totalPages={Math.ceil(kultSchauspielerData.totalItems / 20)}
          />
        </>
      )}
    </>
  );
};
