import Link from "next/link";
import { notFound } from "next/navigation";
import PublicBlackHeader from "@/components/PublicBlackHeader";
import {
  getGalleryImages,
  getPublishedGalleryBySlug,
} from "@/lib/public-galleries";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getImageClass(orientation: string | null) {
  if (orientation === "wide") return "md:col-span-2 aspect-[16/9]";
  if (orientation === "landscape") return "aspect-[4/3]";
  if (orientation === "square") return "aspect-square";
  return "aspect-[4/5]";
}

export default async function EditorialGalleryPage({ params }: PageProps) {
  const { slug } = await params;
  const gallery = await getPublishedGalleryBySlug("editorial", slug);

  if (!gallery) {
    notFound();
  }

  const images = await getGalleryImages(gallery.id);

  return (
    <main className="min-h-screen bg-white text-black">
      <PublicBlackHeader />

      <article>
        <section className="grid min-h-screen content-end px-5 pb-10 pt-28 md:px-8">
          <div className="mx-auto grid w-full max-w-[1680px] gap-8 md:grid-cols-[0.42fr_0.58fr] md:items-end">
            <div>
              <Link
                href="/editorial"
                className="mb-8 inline-flex text-[10px] uppercase tracking-[0.28em] text-black/45 transition hover:text-black"
              >
                Editorial
              </Link>

              <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/35">
                Gallery / Editorial
              </p>

              <h1 className="text-6xl font-medium leading-[0.86] tracking-[-0.08em] md:text-[8rem]">
                {gallery.title}
              </h1>

              {gallery.description ? (
                <p className="mt-8 max-w-md text-base leading-[1.35] tracking-[-0.03em] text-black/55">
                  {gallery.description}
                </p>
              ) : null}
            </div>

            <div className="aspect-[4/5] overflow-hidden bg-[#efefec]">
              {gallery.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={gallery.cover_image_url}
                  alt={gallery.title}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </section>

        {images.length > 0 ? (
          <section className="grid gap-5 px-5 pb-10 md:grid-cols-2 md:px-8">
            {images.map((image) => (
              <figure key={image.id} className="grid gap-3">
                <div className={`overflow-hidden bg-[#efefec] ${getImageClass(image.orientation)}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.image_url}
                    alt={image.alt || image.caption || gallery.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {image.caption ? (
                  <figcaption className="text-[10px] uppercase tracking-[0.22em] text-black/40">
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </section>
        ) : (
          <section className="mx-auto max-w-[1680px] px-5 pb-16 md:px-8">
            <p className="border-t border-black pt-8 text-sm text-black/45">
              This gallery has no images yet.
            </p>
          </section>
        )}
      </article>
    </main>
  );
}
