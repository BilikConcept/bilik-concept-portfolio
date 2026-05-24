export const dynamic = "force-dynamic";
export const revalidate = 0;

import PublicBlackHeader from "@/components/PublicBlackHeader";
import {
  PublicArchiveGrid,
  PublicArchiveHeader,
  PublicArchiveShell,
} from "@/components/PublicArchive";
import { getPublishedGalleries } from "@/lib/public-galleries";

export default async function EditorialPage() {
  const galleries = await getPublishedGalleries("editorial");

  const items = galleries.map((gallery) => ({
    id: gallery.id,
    href: `/editorial/${gallery.slug}`,
    title: gallery.title,
    eyebrow: "Editorial / Gallery",
    description: gallery.description,
    imageUrl: gallery.cover_image_url,
  }));

  return (
    <main className="min-h-screen bg-white text-black">
      <PublicBlackHeader />

      <PublicArchiveShell>
        <PublicArchiveHeader
          eyebrow="Bilik Concept / Editorial"
          titleTop="Editorial"
          titleBottom="archive."
          description="A visual archive of editorials, portraits, atmosphere studies and quiet image-led stories."
        />

        <PublicArchiveGrid
          variant="editorial"
          items={items}
          emptyLabel="No published editorial galleries yet."
        />
      </PublicArchiveShell>
    </main>
  );
}
