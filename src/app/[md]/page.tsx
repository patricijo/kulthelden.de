import ReactMarkdown from "react-markdown";

import fs from "fs";
import { Suspense } from "react";
import path from "path";

type Props = {
  params: Promise<{
    md: string;
  }>;
};

export default async function MdPage({ params }: Props) {
  return (
    <Suspense>
      <MdPageContent params={params} />
    </Suspense>
  );
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
