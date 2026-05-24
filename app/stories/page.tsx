export const dynamic = "force-dynamic";
export const revalidate = 0;

import PublicBlackHeader from "@/components/PublicBlackHeader";
import {
  PublicArchiveGrid,
  PublicArchiveHeader,
  PublicArchiveShell,
} from "@/components/PublicArchive";
import { getPublishedStories } from "@/lib/bilik-stories";

export default async function StoriesPage() {
  const stories = await getPublishedStories();

  const items = stories.map((story) => ({
    id: story.id,
    href: `/stories/${story.slug}`,
    title: story.title,
    eyebrow: story.eyebrow || "Stories Update",
    description: story.lead,
    imageUrl: story.hero_image_url,
  }));

  return (
    <main className="min-h-screen bg-white text-black">
      <PublicBlackHeader />

      <PublicArchiveShell>
        <PublicArchiveHeader
          eyebrow="Bilik Concept / Stories"
          titleTop="Stories"
          titleBottom="updates."
          description="Editorial articles, visual updates, collaborations and studio notes from Bilik Concept."
        />

        <PublicArchiveGrid
          variant="stories"
          items={items}
          emptyLabel="No published stories yet."
        />
      </PublicArchiveShell>
    </main>
  );
}
