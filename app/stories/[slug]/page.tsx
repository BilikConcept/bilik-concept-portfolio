import PublicBlackHeader from "@/components/PublicBlackHeader";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPublishedStoryBySlug,
  getStoryBlocks,
  type BilikStoryBlock,
  type StoryBlockContent,
} from "@/lib/bilik-stories";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getFontClass(content: StoryBlockContent) {
  if (content.fontPreset === "dm_serif_regular") {
    return "font-serif-display font-normal not-italic tracking-[-0.04em]";
  }

  if (content.fontPreset === "dm_serif_italic") {
    return "font-serif-display font-normal italic tracking-[-0.04em]";
  }

  if (content.fontPreset === "dm_sans_bold") {
    return "font-sans font-bold tracking-[-0.045em]";
  }

  if (content.fontPreset === "dm_sans_medium") {
    return "font-sans font-medium tracking-[-0.04em]";
  }

  return "font-sans font-normal tracking-[-0.04em]";
}

function getTextSizeClass(content: StoryBlockContent) {
  if (content.fontSize === "small") return "text-base md:text-xl";
  if (content.fontSize === "large") return "text-3xl md:text-5xl";
  if (content.fontSize === "hero") return "text-5xl md:text-8xl leading-[0.9]";
  return "text-xl md:text-3xl";
}

function StoryImage({
  src,
  label,
  className = "",
}: {
  src?: string | null;
  label: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden bg-[#efefec] ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} className="h-full w-full object-cover" />
      ) : null}
    </div>
  );
}

function RichText({ block }: { block: BilikStoryBlock }) {
  const content = block.content_json;
  const html =
    content.richHtml ||
    `<p>${content.text || "A visual story built around atmosphere."}</p>`;

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <div
        className={`leading-[1.45] text-black/75 [&_p]:mb-6 [&_p:last-child]:mb-0 ${getTextSizeClass(
          content,
        )} ${getFontClass(content)}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

function StatementBlock({ block }: { block: BilikStoryBlock }) {
  const content = block.content_json;
  const html =
    content.richHtml ||
    `<p>${content.text || "A visual story built around atmosphere."}</p>`;

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 text-center md:px-8">
      <div
        className={`text-5xl leading-[0.9] text-black md:text-8xl ${getFontClass(
          content,
        )}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

function FullImageBlock({ block }: { block: BilikStoryBlock }) {
  const content = block.content_json;

  return (
    <section className="px-5 py-5">
      <StoryImage
        src={content.imageUrl}
        label={content.caption || "Story image"}
        className={
          content.ratio === "portrait"
            ? "mx-auto aspect-[9/14] max-w-3xl"
            : content.ratio === "square"
              ? "mx-auto aspect-square max-w-4xl"
              : "aspect-[16/9] w-full"
        }
      />

      {content.caption ? (
        <p
          className={`mx-auto mt-3 max-w-4xl text-center text-[10px] uppercase text-black/45 ${getFontClass(
            content,
          )}`}
        >
          {content.caption}
        </p>
      ) : null}
    </section>
  );
}

function ImagePairBlock({ block }: { block: BilikStoryBlock }) {
  const content = block.content_json;

  return (
    <section className="grid gap-5 px-5 py-5 md:grid-cols-2">
      <StoryImage src={content.imageUrl} label="Story image one" className="aspect-[4/5]" />
      <StoryImage src={content.imageUrlTwo} label="Story image two" className="aspect-[4/5]" />

      {content.caption ? (
        <p
          className={`text-center text-[10px] uppercase text-black/45 md:col-span-2 ${getFontClass(
            content,
          )}`}
        >
          {content.caption}
        </p>
      ) : null}
    </section>
  );
}

function ImageCaptionBlock({ block }: { block: BilikStoryBlock }) {
  const content = block.content_json;

  return (
    <section className="grid gap-8 px-5 py-16 md:grid-cols-[0.58fr_0.42fr] md:items-end md:px-8">
      <StoryImage
        src={content.imageUrl}
        label={content.caption || "Story image"}
        className="aspect-[4/5]"
      />

      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">
          Caption
        </p>

        <p
          className={`mt-6 leading-[0.95] text-black ${getTextSizeClass(
            content,
          )} ${getFontClass(content)}`}
        >
          {content.caption || "Add a caption to this image block."}
        </p>
      </div>
    </section>
  );
}

function RenderBlock({ block }: { block: BilikStoryBlock }) {
  if (block.block_type === "text") return <RichText block={block} />;
  if (block.block_type === "statement") return <StatementBlock block={block} />;
  if (block.block_type === "full_image") return <FullImageBlock block={block} />;
  if (block.block_type === "image_pair") return <ImagePairBlock block={block} />;
  if (block.block_type === "image_caption") return <ImageCaptionBlock block={block} />;
  if (block.block_type === "spacer") return <div className="h-28" />;

  return null;
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = await getPublishedStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const blocks = await getStoryBlocks(story.id);

  return (
    <main className="min-h-screen bg-white text-black">
      <PublicBlackHeader />



      <article>
        <section className="grid min-h-screen md:grid-cols-2">
          <StoryImage
            src={story.hero_image_url}
            label={story.title}
            className="min-h-screen"
          />

          <div className="grid min-h-screen content-center px-5 py-20 text-center md:px-8">
            <Link
              href="/stories"
              className="mb-10 text-[10px] uppercase tracking-[0.28em] text-black/45 transition hover:text-black"
            >
              Stories
            </Link>

            <p className="mb-8 text-[10px] uppercase tracking-[0.28em] text-black/45">
              {story.eyebrow || "Bilik Concept Story"}
            </p>

            <h1 className="mx-auto max-w-2xl text-5xl font-medium leading-[0.9] tracking-[-0.08em] md:text-8xl">
              {story.title}
            </h1>

            {story.lead ? (
              <p className="mx-auto mt-8 max-w-xl text-base leading-[1.35] tracking-[-0.03em] text-black/55">
                {story.lead}
              </p>
            ) : null}

            <p className="mt-16 text-[10px] uppercase tracking-[0.28em] text-black/35">
              Story / Bilik Concept
            </p>
          </div>
        </section>

        {blocks.length > 0 ? (
          blocks.map((block) => <RenderBlock key={block.id} block={block} />)
        ) : (
          <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
            <p className="text-lg leading-[1.45] tracking-[-0.04em] text-black/45 md:text-2xl">
              This story has no blocks yet.
            </p>
          </section>
        )}
      </article>
    </main>
  );
}
