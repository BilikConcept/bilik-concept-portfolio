export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import PublicBlackHeader from "@/components/PublicBlackHeader";
import { getPublishedStories } from "@/lib/bilik-stories";

export default async function StoriesPage() {
  const stories = await getPublishedStories();

  return (
    <main className="min-h-screen bg-white text-black">
      <PublicBlackHeader />

      <section className="mx-auto grid min-h-screen w-full max-w-[1680px] content-between px-5 pb-10 pt-28 md:px-8">
        <div>
          <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/35">
            Bilik Concept / Stories
          </p>

          <h1 className="max-w-5xl text-6xl font-medium leading-[0.86] tracking-[-0.08em] md:text-[9rem]">
            Stories
            <br />
            Updates.
          </h1>

          <p className="mt-8 max-w-md text-sm leading-6 text-black/50">
            Editorial articles, visual updates, collaborations and studio notes
            from Bilik Concept.
          </p>
        </div>

        {stories.length > 0 ? (
          <section className="grid gap-5 border-t border-black pt-5 md:grid-cols-3">
            {stories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group grid gap-4"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#efefec]">
                  {story.hero_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={story.hero_image_url}
                      alt={story.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>

                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-black/35">
                    {story.eyebrow || "Stories Update"}
                  </p>

                  <h2 className="text-4xl font-medium leading-[0.88] tracking-[-0.07em]">
                    {story.title}
                  </h2>

                  {story.lead ? (
                    <p className="mt-4 max-w-md text-sm leading-5 text-black/50">
                      {story.lead}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <section className="border-t border-black pt-8">
            <p className="text-sm text-black/45">
              No published stories yet.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}
