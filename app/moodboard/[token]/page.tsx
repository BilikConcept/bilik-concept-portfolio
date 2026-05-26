export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import PublicBlackHeader from "@/components/PublicBlackHeader";
import { notFound } from "next/navigation";
import BilikStoryPublicView from "@/components/stories/BilikStoryPublicView";
import {
  getMoodboardStoryByToken,
  getStoryBlocks,
} from "@/lib/bilik-stories";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function MoodboardPage({ params }: PageProps) {
  const { token } = await params;
  const story = await getMoodboardStoryByToken(token);

  if (!story) {
    notFound();
  }

  const blocks = await getStoryBlocks(story.id);

  return (
    <main className="min-h-screen bg-white text-black">
      <PublicBlackHeader />
      <BilikStoryPublicView story={story} blocks={blocks} />
    </main>
  );
}
