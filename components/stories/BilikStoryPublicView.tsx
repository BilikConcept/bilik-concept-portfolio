import type { ReactNode } from "react";
import type {
  BilikStory,
  BilikStoryBlock,
  StoryBlockContent,
} from "@/lib/bilik-stories";

type BilikStoryPublicViewProps = {
  story: BilikStory;
  blocks: BilikStoryBlock[];
};

function getStoryFontClass(fontPreset?: string) {
  if (fontPreset === "dm_serif_regular") {
    return "font-serif-display font-normal not-italic tracking-[-0.04em]";
  }

  if (fontPreset === "dm_serif_italic") {
    return "font-serif-display font-normal italic tracking-[-0.04em]";
  }

  if (fontPreset === "dm_sans_bold") {
    return "font-sans font-bold tracking-[-0.045em]";
  }

  if (fontPreset === "dm_sans_medium") {
    return "font-sans font-medium tracking-[-0.04em]";
  }

  return "font-sans font-normal tracking-[-0.04em]";
}

function getTextSizeClass(fontSize?: string) {
  if (fontSize === "small") {
    return "text-base md:text-xl";
  }

  if (fontSize === "large") {
    return "text-3xl md:text-5xl";
  }

  if (fontSize === "hero") {
    return "text-5xl md:text-8xl leading-[0.9]";
  }

  return "text-xl md:text-3xl";
}

function getStatementSizeClass(fontSize?: string) {
  if (fontSize === "small") {
    return "text-3xl md:text-5xl";
  }

  if (fontSize === "regular") {
    return "text-5xl md:text-8xl";
  }

  if (fontSize === "large") {
    return "text-6xl md:text-9xl";
  }

  if (fontSize === "hero") {
    return "text-7xl md:text-[11rem]";
  }

  return "text-5xl md:text-8xl";
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
      ) : (
        <div className="grid h-full w-full place-items-center px-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-black/35">
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function textToHtml(text?: string) {
  const value = text?.trim() || "Write a short editorial paragraph here.";

  return value
    .split("\n")
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

function MixedLead({ text }: { text: string }) {
  const cleanText =
    text.trim() ||
    "A collaboration built around atmosphere, rhythm and daily details.";

  const words = cleanText.replace(/\s+/g, " ").split(" ").filter(Boolean);
  const splitIndex = Math.max(3, Math.ceil(words.length / 2));
  const firstLine = words.slice(0, splitIndex);
  const secondLine = words.slice(splitIndex);

  function renderLine(lineWords: string[], serifIndex: number) {
    return lineWords.map((word, index) => {
      const isSerif = index === serifIndex;

      return (
        <span
          key={`${word}-${index}`}
          className={
            isSerif
              ? "font-serif-display italic font-normal tracking-[-0.03em]"
              : "font-sans font-medium tracking-[-0.015em]"
          }
        >
          {word}
          {index < lineWords.length - 1 ? " " : ""}
        </span>
      );
    });
  }

  const firstLineSerifIndex = Math.max(0, firstLine.length - 2);
  const secondLineSerifIndex = secondLine.length > 1 ? 1 : 0;

  return (
    <p className="mx-auto mt-5 max-w-xl text-center text-[14px] leading-[1.25] tracking-[-0.02em] md:text-[16px]">
      {renderLine(firstLine, firstLineSerifIndex)}
      <br />
      {renderLine(secondLine, secondLineSerifIndex)}
    </p>
  );
}

function RichTextBlock({ block }: { block: BilikStoryBlock }) {
  const html =
    block.content_json.richHtml ||
    textToHtml(block.content_json.text || "Write a short editorial paragraph here.");

  return (
    <section className="mx-auto max-w-3xl px-8 py-16">
      <div
        className={`outline-none [&_p]:mb-6 [&_p:last-child]:mb-0 leading-[1.45] text-black/75 ${getTextSizeClass(
          block.content_json.fontSize,
        )} ${getStoryFontClass(block.content_json.fontPreset)}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

function StatementBlock({ block }: { block: BilikStoryBlock }) {
  const html =
    block.content_json.richHtml ||
    textToHtml(block.content_json.text || "A visual story built around atmosphere.");

  return (
    <section className="mx-auto max-w-6xl px-8 py-24 text-center">
      <div
        className={`outline-none [&_p]:mb-6 [&_p:last-child]:mb-0 leading-[0.9] text-black ${getStatementSizeClass(
          block.content_json.fontSize,
        )} ${getStoryFontClass(block.content_json.fontPreset)}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

function FullImageBlock({ content }: { content: StoryBlockContent }) {
  return (
    <section className="px-5 py-5">
      <StoryImage
        src={content.imageUrl}
        label="Full image"
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
          className={`mx-auto mt-3 max-w-4xl text-center text-[10px] uppercase text-black/45 ${getStoryFontClass(
            content.fontPreset,
          )}`}
        >
          {content.caption}
        </p>
      ) : null}
    </section>
  );
}

function ImagePairBlock({ content }: { content: StoryBlockContent }) {
  return (
    <section className="grid gap-5 px-5 py-5 md:grid-cols-2">
      <StoryImage
        src={content.imageUrl}
        label="Image one"
        className="aspect-[4/5]"
      />

      <StoryImage
        src={content.imageUrlTwo}
        label="Image two"
        className="aspect-[4/5]"
      />

      {content.caption ? (
        <p
          className={`text-center text-[10px] uppercase text-black/45 md:col-span-2 ${getStoryFontClass(
            content.fontPreset,
          )}`}
        >
          {content.caption}
        </p>
      ) : null}
    </section>
  );
}

function ImageCaptionBlock({ content }: { content: StoryBlockContent }) {
  return (
    <section className="grid gap-8 px-8 py-16 md:grid-cols-[0.58fr_0.42fr] md:items-end">
      <StoryImage
        src={content.imageUrl}
        label="Image with caption"
        className="aspect-[4/5]"
      />

      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">
          Caption
        </p>

        <p
          className={`mt-6 leading-[0.95] text-black ${getTextSizeClass(
            content.fontSize,
          )} ${getStoryFontClass(content.fontPreset)}`}
        >
          {content.caption || "Add a caption to this image block."}
        </p>
      </div>
    </section>
  );
}

function RenderBlock({ block }: { block: BilikStoryBlock }) {
  let content: ReactNode = null;

  if (block.block_type === "text") {
    content = <RichTextBlock block={block} />;
  }

  if (block.block_type === "statement") {
    content = <StatementBlock block={block} />;
  }

  if (block.block_type === "full_image") {
    content = <FullImageBlock content={block.content_json} />;
  }

  if (block.block_type === "image_pair") {
    content = <ImagePairBlock content={block.content_json} />;
  }

  if (block.block_type === "image_caption") {
    content = <ImageCaptionBlock content={block.content_json} />;
  }

  if (block.block_type === "spacer") {
    content = <div className="h-28" />;
  }

  return <>{content}</>;
}

export default function BilikStoryPublicView({
  story,
  blocks,
}: BilikStoryPublicViewProps) {
  const displayTitle = story.title.trim() || "Untitled story";
  const displayEyebrow = story.eyebrow?.trim() || "Bilik Concept Updates";
  const displayLead = story.lead || "";
  const sortedBlocks = blocks.slice().sort((a, b) => a.sort_order - b.sort_order);

  return (
    <article className="min-h-full bg-white text-black">
      {story.layout_variant === "full_cover" ? (
        <section className="relative min-h-screen">
          <StoryImage
            src={story.hero_image_url}
            label="Hero image"
            className="absolute inset-0 h-full w-full"
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute inset-x-0 bottom-10 z-10 px-8 text-center text-white">
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em]">
              {displayEyebrow}
            </p>

            <h1 className="mx-auto max-w-4xl text-5xl leading-[0.9] tracking-[-0.08em] md:text-8xl">
              {displayTitle}
            </h1>

            <MixedLead text={displayLead} />
          </div>
        </section>
      ) : (
        <section className="grid min-h-screen md:grid-cols-2">
          <StoryImage
            src={story.hero_image_url}
            label="Hero image"
            className="min-h-screen"
          />

          <div className="grid min-h-screen content-center px-8 py-20 text-center">
            <p className="mb-8 text-[10px] uppercase tracking-[0.28em] text-black/45">
              {displayEyebrow}
            </p>

            <h1
              className={
                story.typography_variant === "serif_title"
                  ? "mx-auto max-w-2xl font-serif-display text-5xl italic leading-[0.95] tracking-[-0.05em] md:text-8xl"
                  : "mx-auto max-w-2xl text-5xl leading-[0.9] tracking-[-0.08em] md:text-8xl"
              }
            >
              {displayTitle}
            </h1>

            <MixedLead text={displayLead} />

            <p className="mt-16 text-[10px] uppercase tracking-[0.28em] text-black/45">
              Story / 2026
            </p>
          </div>
        </section>
      )}

      {sortedBlocks.length > 0 ? (
        sortedBlocks.map((block) => <RenderBlock key={block.id} block={block} />)
      ) : (
        <section className="mx-auto max-w-3xl px-8 py-20 text-center">
          <p className="text-lg leading-[1.45] tracking-[-0.04em] text-black/45 md:text-2xl">
            Add your first block to start building the article.
          </p>
        </section>
      )}
    </article>
  );
}
