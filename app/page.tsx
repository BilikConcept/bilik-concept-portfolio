export const dynamic = "force-dynamic";
export const revalidate = 0;

import HomeCatalogueNav from "@/components/HomeCatalogueNav";
import {
  getPortfolioProjectById,
  getPublishedProjects,
  getSiteSetting,
} from "@/lib/workspace";
import { getPublishedGalleries } from "@/lib/public-galleries";
import { getPublishedStories } from "@/lib/bilik-stories";

function FullScreenImage({
  id,
  label,
  imageUrl,
}: {
  id: string;
  label: string;
  imageUrl?: string | null;
}) {
  return (
    <section
      id={id}
      className="relative h-svh snap-start overflow-hidden bg-[#efefec]"
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={label}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-[#efefec]" />
      )}
    </section>
  );
}

function FullScreenSingleImageUpdate({
  id,
  label,
  imageUrl,
  title,
  description,
  href,
}: {
  id: string;
  label: string;
  imageUrl?: string | null;
  title?: string | null;
  description?: string | null;
  href?: string;
}) {
  const cleanDescription =
    description?.trim() ||
    "Stories, collaborations and visual notes from the studio.";

  const descriptionWords = cleanDescription
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean);

  const splitIndex = Math.max(3, Math.ceil(descriptionWords.length / 2));
  const firstLine = descriptionWords.slice(0, splitIndex);
  const secondLine = descriptionWords.slice(splitIndex);

  function renderMixedLine(words: string[], serifIndex: number) {
    return words.map((word, index) => {
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
          {index < words.length - 1 ? " " : ""}
        </span>
      );
    });
  }

  const firstLineSerifIndex = Math.max(0, firstLine.length - 2);
  const secondLineSerifIndex = secondLine.length > 1 ? 1 : 0;

  return (
    <section
      id={id}
      className="relative h-svh snap-start overflow-hidden bg-[#efefec]"
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={label}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-[#efefec]" />
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-black/25" />

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 mx-auto grid max-w-[900px] -translate-y-1/2 px-5 text-center text-white md:px-8">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/70 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          Bilik Concept / Updates
        </p>

        <h2 className="text-[38px] font-semibold leading-[0.9] tracking-[-0.06em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] md:text-[62px] xl:text-[76px]">
          {title || "Latest update"}
        </h2>

        <p className="mx-auto mt-5 max-w-[780px] text-[13px] leading-[1.25] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:text-[15px] xl:text-[16px]">
          {renderMixedLine(firstLine, firstLineSerifIndex)}
          <br />
          {renderMixedLine(secondLine, secondLineSerifIndex)}
        </p>

        <a
          href={href || "/stories"}
          className="pointer-events-auto mx-auto mt-8 inline-flex text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-60"
        >
          Read update
        </a>
      </div>
    </section>
  );
}

function FullScreenCollage({
  id,
  label,
  leftImageUrl,
  rightImageUrl,
  title,
  description,
  href,
}: {
  id: string;
  label: string;
  leftImageUrl?: string | null;
  rightImageUrl?: string | null;
  title?: string | null;
  description?: string | null;
  href?: string;
}) {
  const cleanDescription =
    description?.trim() ||
    "Visual direction and content production for brands with atmosphere.";

  const descriptionWords = cleanDescription
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean);

  const splitIndex = Math.max(3, Math.ceil(descriptionWords.length / 2));
  const firstLine = descriptionWords.slice(0, splitIndex);
  const secondLine = descriptionWords.slice(splitIndex);

  function renderMixedLine(words: string[], serifIndex: number) {
    return words.map((word, index) => {
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
          {index < words.length - 1 ? " " : ""}
        </span>
      );
    });
  }

  const firstLineSerifIndex = Math.max(0, firstLine.length - 2);
  const secondLineSerifIndex = secondLine.length > 1 ? 1 : 0;

  return (
    <section
      id={id}
      className="relative grid h-svh snap-start overflow-hidden bg-[#efefec] md:grid-cols-2"
    >
      <div className="relative h-[50svh] overflow-hidden md:h-svh">
        {leftImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={leftImageUrl}
            alt={`${label} left image`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[#efefec]" />
        )}
      </div>

      <div className="relative h-[50svh] overflow-hidden md:h-svh">
        {rightImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={rightImageUrl}
            alt={`${label} right image`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[#efefec]" />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-black/10" />

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 mx-auto grid max-w-[900px] -translate-y-1/2 px-5 text-center text-white md:px-8">
        <h2 className="text-[30px] font-semibold leading-[1] tracking-[-0.045em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] md:text-[36px] xl:text-[40px]">
          {title || "Selected work"}
        </h2>

        <p className="mx-auto mt-4 max-w-[720px] text-[13px] leading-[1.25] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:text-[15px] xl:text-[16px]">
          {renderMixedLine(firstLine, firstLineSerifIndex)}
          <br />
          {renderMixedLine(secondLine, secondLineSerifIndex)}
        </p>

        <a
          href={href || "/work"}
          className="pointer-events-auto mx-auto mt-7 inline-flex text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-60"
        >
          View project
        </a>
      </div>
    </section>
  );
}

function ProjectIndexSection({
  projects,
  imageUrl,
}: {
  projects: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    cover_image_url: string | null;
  }[];
  imageUrl?: string | null;
}) {
  const featuredProjects = projects.slice(0, 3);
  const firstProject = featuredProjects[0];
  const secondProject = featuredProjects[1] || featuredProjects[0];

  const cleanDescription =
    "A quiet archive of selected projects, visual direction and content production created by Bilik Concept.";

  const descriptionWords = cleanDescription
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean);

  const splitIndex = Math.max(3, Math.ceil(descriptionWords.length / 2));
  const firstLine = descriptionWords.slice(0, splitIndex);
  const secondLine = descriptionWords.slice(splitIndex);

  function renderMixedLine(words: string[], serifIndex: number) {
    return words.map((word, index) => {
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
          {index < words.length - 1 ? " " : ""}
        </span>
      );
    });
  }

  const firstLineSerifIndex = Math.max(0, firstLine.length - 2);
  const secondLineSerifIndex = secondLine.length > 1 ? 1 : 0;

  return (
    <section
      id="index"
      className="relative grid h-svh snap-start overflow-hidden bg-[#efefec] md:grid-cols-2"
    >
      <div className="relative h-[50svh] overflow-hidden md:h-svh">
        {firstProject?.cover_image_url || imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={firstProject?.cover_image_url || imageUrl || ""}
            alt={firstProject?.title || "Bilik Concept work archive"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[#efefec]" />
        )}
      </div>

      <div className="relative h-[50svh] overflow-hidden md:h-svh">
        {secondProject?.cover_image_url || imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={secondProject?.cover_image_url || imageUrl || ""}
            alt={secondProject?.title || "Bilik Concept selected project"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[#efefec]" />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-black/20" />

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 mx-auto grid max-w-[980px] -translate-y-1/2 px-5 text-center text-white md:px-8">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/70 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          Bilik Concept / Work archive
        </p>

        <h2 className="text-[38px] font-semibold leading-[0.9] tracking-[-0.06em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] md:text-[62px] xl:text-[76px]">
          Selected work.
        </h2>

        <p className="mx-auto mt-5 max-w-[780px] text-[13px] leading-[1.25] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:text-[15px] xl:text-[16px]">
          {renderMixedLine(firstLine, firstLineSerifIndex)}
          <br />
          {renderMixedLine(secondLine, secondLineSerifIndex)}
        </p>

        <a
          href={firstProject?.slug ? `/work/${firstProject.slug}` : "/work"}
          className="pointer-events-auto mx-auto mt-8 inline-flex text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-60"
        >
          View latest work
        </a>
      </div>

    </section>
  );
}

export default async function Home() {
  const [
    projects,
    workGalleries,
    editorialGalleries,
    stories,
    homepageHeroImageUrl,
    updatesSideImageUrl,
    updatesProjectId,
  ] = await Promise.all([
    getPublishedProjects(),
    getPublishedGalleries("work"),
    getPublishedGalleries("editorial"),
    getPublishedStories(),
    getSiteSetting("homepage_hero_image_url"),
    getSiteSetting("updates_side_image_url"),
    getSiteSetting("updates_project_id"),
  ]);

  const heroProject = projects[0];
  const secondProject = projects[1];
  const thirdProject = projects[2];

  const updatesProject =
    projects.find(
      (project) =>
        "id" in project &&
        typeof project.id === "string" &&
        project.id === updatesProjectId,
    ) ||
    (updatesProjectId ? await getPortfolioProjectById(updatesProjectId) : null) ||
    heroProject;

  const latestWork = workGalleries[0];
  const latestEditorial = editorialGalleries[0];

  const homepageStories = stories
    .filter((story) => story.show_on_homepage)
    .sort(
      (a, b) =>
        (a.homepage_sort_order || 10) - (b.homepage_sort_order || 10),
    );

  const visibleHomepageStories =
    homepageStories.length > 0 ? homepageStories : stories.slice(0, 1);

  const homepageStoryNavItems = visibleHomepageStories.map((story, index) => ({
    id: `story-${story.slug || index}`,
    label: story.homepage_nav_label?.trim() || story.title || "Stories Update",
  }));

  const latestWorkProjects = workGalleries.map((gallery) => ({
    id: gallery.id,
    title: gallery.title,
    slug: gallery.slug,
    description: gallery.description,
    cover_image_url: gallery.cover_image_url,
  }));

  const latestWorkImage =
    latestWork?.cover_image_url ||
    updatesSideImageUrl ||
    updatesProject?.hero_image_url ||
    secondProject?.hero_image_url ||
    homepageHeroImageUrl;

  return (
    <>
      <HomeCatalogueNav storyItems={homepageStoryNavItems} />

      <main
        data-home-scroll
        className="h-svh snap-y snap-mandatory overflow-y-auto bg-black"
      >
        <FullScreenImage
          id="intro"
          label="Bilik Concept homepage visual"
          imageUrl={
            heroProject?.hero_image_url ||
            latestWork?.cover_image_url ||
            homepageHeroImageUrl
          }
        />

        {visibleHomepageStories.map((story, index) => (
          <FullScreenSingleImageUpdate
            key={story.id}
            id={`story-${story.slug || index}`}
            label={story.title || "Bilik Concept story"}
            title={story.title || "Latest update"}
            description={
              story.lead ||
              "Stories, collaborations and visual notes from the studio."
            }
            href={story.slug ? `/stories/${story.slug}` : "/stories"}
            imageUrl={
              story.hero_image_url ||
              getProjectHeroImage(updatesProject) ||
              homepageHeroImageUrl
            }
          />
        ))}

        <FullScreenSingleImageUpdate
          id="editorial"
          label="Bilik Concept latest editorial"
          title={latestEditorial?.title || "Editorial archive"}
          description={
            latestEditorial?.description ||
            "Visual essays, image stories and editorial atmospheres from Bilik Concept."
          }
          href={
            latestEditorial?.slug
              ? `/editorial/${latestEditorial.slug}`
              : "/editorial"
          }
          imageUrl={
            latestEditorial?.cover_image_url ||
            secondProject?.hero_image_url ||
            latestWork?.cover_image_url ||
            homepageHeroImageUrl
          }
        />

        <ProjectIndexSection
          projects={latestWorkProjects}
          imageUrl={
            thirdProject?.hero_image_url ||
            latestWork?.cover_image_url ||
            secondProject?.hero_image_url ||
            homepageHeroImageUrl
          }
        />
      </main>
    </>
  );
}
