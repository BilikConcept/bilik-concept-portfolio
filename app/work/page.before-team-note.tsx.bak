export const dynamic = "force-dynamic";
export const revalidate = 0;

import PublicBlackHeader from "@/components/PublicBlackHeader";
import {
  PublicArchiveGrid,
  PublicArchiveHeader,
  PublicArchiveShell,
} from "@/components/PublicArchive";
import { getPublishedGalleries } from "@/lib/public-galleries";

export default async function WorkPage() {
  const galleries = await getPublishedGalleries("work");

  const items = galleries.map((gallery) => ({
    id: gallery.id,
    href: `/work/${gallery.slug}`,
    title: gallery.title,
    eyebrow: "Work / Gallery",
    description: gallery.description,
    imageUrl: gallery.cover_image_url,
  }));

  return (
    <main className="min-h-screen bg-white text-black">
      <PublicBlackHeader />

      <PublicArchiveShell>
        <PublicArchiveHeader
          eyebrow="Bilik Concept / Work"
          titleTop="Selected"
          titleBottom="work."
          description="A composed index of selected projects, visual systems, campaigns and content direction shaped for brands with atmosphere."
        />

        <PublicArchiveGrid
          variant="work"
          items={items}
          emptyLabel="No published work galleries yet."
        />
      </PublicArchiveShell>
    </main>
  );
}
