import ReactMarkdown from "react-markdown";

import fs from "fs";
import path from "path";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    md: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { md } = await params;

  const metadata: Metadata = {
    title: `${md.charAt(0).toUpperCase() + md.slice(1)} | KultHelden.de`,
  };

  return metadata;
}

export default async function MdPage({ params }: Props) {
  return <MdPageContent params={params} />;
}

async function MdPageContent({ params }: Props) {
  const { md } = await params;

  const markdownPath = path.join(process.cwd(), "content", `${md}.md`);
  const content = fs.readFileSync(markdownPath, "utf8");
  return (
    <article className="prose dark:prose-invert max-w-full">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
