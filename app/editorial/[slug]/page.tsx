import { getArticleBySlug } from "@/lib/workspace";

type EditorialDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function splitContent(content: string | null) {
  if (!content) {
    return [];
  }

  return content
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default async function EditorialDetailPage({
  params,
}: EditorialDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const paragraphs = splitContent(article.content);

  return (
    <main className="min-h-screen bg-white px-5 py-28 text-[#111111] md:px-8 md:py-36">
      <article className="mx-auto max-w-[1440px]">
        <div className="mb-14 grid gap-8 md:grid-cols-[0.55fr_1fr]">
          <div>
            <p className="mb-4 text-sm tracking-[-0.02em] text-[#555]">
              Editorial
            </p>
            <p className="text-sm tracking-[-0.02em] text-[#777]">
              {article.category}
            </p>
          </div>

          <h1 className="max-w-5xl text-5xl font-normal leading-[0.95] tracking-[-0.075em] md:text-8xl">
            {article.title}
          </h1>
        </div>

        <div className="mb-16 aspect-[16/8] bg-[#f1f1ef]">
          <div className="flex h-full items-center justify-center px-6 text-center">
            <p className="text-sm tracking-[-0.02em] text-[#777]">
              Editorial hero image
            </p>
          </div>
        </div>

        <div className="grid gap-12 border-y border-[#d9d9d4] py-12 md:grid-cols-[0.55fr_1fr] md:py-16">
          <p className="text-sm tracking-[-0.02em] text-[#555]">
            Studio note
          </p>

          <p className="max-w-5xl text-3xl leading-[1.02] tracking-[-0.06em] md:text-6xl">
            {article.excerpt}
          </p>
        </div>

        <div className="grid gap-10 py-16 md:grid-cols-[0.55fr_1fr] md:py-24">
          <div>
            <p className="text-sm tracking-[-0.02em] text-[#555]">
              Written as a visual note
            </p>
          </div>

          <div className="max-w-3xl space-y-7 text-xl leading-[1.35] tracking-[-0.045em] text-[#333] md:text-2xl">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
