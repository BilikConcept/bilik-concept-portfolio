export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import PublicBlackHeader from "@/components/PublicBlackHeader";
import { getPublishedGalleries } from "@/lib/public-galleries";

export default async function EditorialPage() {
  const galleries = await getPublishedGalleries("editorial");

  return (
    <main className="min-h-screen bg-white text-black">
      <PublicBlackHeader />

      <section className="mx-auto grid min-h-screen w-full max-w-[1680px] content-between px-5 pb-10 pt-28 md:px-8">
        <div>
          <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/35">
            Bilik Concept / Editorial
          </p>

          <h1 className="max-w-5xl text-6xl font-medium leading-[0.86] tracking-[-0.08em] md:text-[9rem]">
            Editorial
            <br />
            archive.
          </h1>
        </div>

        {galleries.length > 0 ? (
          <section className="grid gap-5 border-t border-black pt-5 md:grid-cols-3">
            {galleries.map((gallery) => (
              <Link
                key={gallery.id}
                href={`/editorial/${gallery.slug}`}
                className="group grid gap-4"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#efefec]">
                  {gallery.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={gallery.cover_image_url}
                      alt={gallery.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>

                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-black/35">
                    Editorial / Gallery
                  </p>

                  <h2 className="text-4xl font-medium leading-[0.88] tracking-[-0.07em]">
                    {gallery.title}
                  </h2>

                  {gallery.description ? (
                    <p className="mt-4 max-w-md text-sm leading-5 text-black/50">
                      {gallery.description}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <section className="border-t border-black pt-8">
            <p className="text-sm text-black/45">
              No published editorial galleries yet.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}
