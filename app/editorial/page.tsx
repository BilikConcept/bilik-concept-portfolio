import TransitionLink from "@/components/TransitionLink";
import { getPublishedArticles } from "@/lib/workspace";

export default async function EditorialPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="min-h-screen bg-white px-5 py-28 text-[#111111] md:px-8 md:py-36">
      <section className="mx-auto max-w-[1440px]">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.55fr_1fr]">
          <p className="text-sm tracking-[-0.02em] text-[#555]">
            Editorial
          </p>

          <h1 className="max-w-5xl text-5xl font-normal leading-[0.95] tracking-[-0.07em] md:text-8xl">
            Notes on visual direction, content and brand atmosphere.
          </h1>
        </div>

        <div className="grid gap-14 md:gap-20">
          {articles.map((article, index) => (
            <TransitionLink
              key={article.slug}
              href={`/editorial/${article.slug}`}
              label="Editorial"
              className="group grid w-full gap-5 border-t border-[#d9d9d4] pt-6 text-left md:grid-cols-[0.2fr_0.8fr_1fr]"
            >
              <p className="text-sm text-[#555]">
                {String(index + 1).padStart(2, "0")}
              </p>

              <div>
                <h2 className="text-3xl font-normal leading-[1] tracking-[-0.05em] transition-opacity group-hover:opacity-60 md:text-5xl">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm tracking-[-0.02em] text-[#555]">
                  {article.category}
                </p>
              </div>

              <div>
                <div className="mb-5 aspect-[16/9] bg-[#f1f1ef]">
                  <div className="flex h-full items-center justify-center px-6 text-center">
                    <p className="text-sm tracking-[-0.02em] text-[#777]">
                      Editorial image
                    </p>
                  </div>
                </div>

                <p className="max-w-xl text-xl leading-[1.18] tracking-[-0.045em] text-[#222] md:text-2xl">
                  {article.excerpt}
                </p>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>
    </main>
  );
}
