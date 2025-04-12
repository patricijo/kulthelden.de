import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
    page: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function KultGenrePage({ params }: Props) {
  const { id } = await params;
  redirect(`/kultgenre/${id}/1`);
}
