import HomeCatalogueNav from "@/components/HomeCatalogueNav";
import {
  getLatestArticle,
  getPortfolioProjectById,
  getPublishedProjects,
  getSiteSetting,
} from "@/lib/workspace";

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
          {title || "Bilik Concept Updates"}
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
          Read the story
        </a>
      </div>
    </section>
  );
}


export default async function Home() {
  const [
    latestArticle,
    projects,
    homepageHeroImageUrl,
    updatesSideImageUrl,
    updatesProjectId,
  ] = await Promise.all([
    getLatestArticle(),
    getPublishedProjects(),
    getSiteSetting("homepage_hero_image_url"),
    getSiteSetting("updates_side_image_url"),
    getSiteSetting("updates_project_id"),
  ]);

  const featuredProjects = projects.slice(0, 4);
  const heroProject = featuredProjects[0];
  const secondProject = featuredProjects[1];
  const thirdProject = featuredProjects[2];

  const updatesProject = updatesProjectId
    ? await getPortfolioProjectById(updatesProjectId)
    : heroProject;

  return (
    <>
      <HomeCatalogueNav />

      <main
        data-home-scroll
        className="h-svh snap-y snap-mandatory overflow-y-auto scroll-smooth bg-white text-[#111111]"
      >
        <FullScreenImage
          id="intro"
          label="Bilik Concept homepage visual"
          imageUrl={homepageHeroImageUrl || heroProject?.hero_image_url}
        />

        <FullScreenCollage
          id="updates"
          label="Bilik Concept latest update"
          title={updatesProject?.title || latestArticle.title}
          description={updatesProject?.short_description}
          href={updatesProject?.slug ? `/work/${updatesProject.slug}` : "/work"}
          leftImageUrl={
            latestArticle.hero_image_url ||
            heroProject?.hero_image_url ||
            homepageHeroImageUrl
          }
          rightImageUrl={
            updatesSideImageUrl ||
            updatesProject?.hero_image_url ||
            secondProject?.hero_image_url ||
            heroProject?.hero_image_url ||
            homepageHeroImageUrl
          }
        />

        <FullScreenImage
          id="editorial"
          label="Bilik Concept editorial visual"
          imageUrl={
            latestArticle.hero_image_url ||
            secondProject?.hero_image_url ||
            homepageHeroImageUrl
          }
        />

        <FullScreenImage
          id="index"
          label="Bilik Concept index visual"
          imageUrl={
            thirdProject?.hero_image_url ||
            secondProject?.hero_image_url ||
            homepageHeroImageUrl
          }
        />
      </main>
    </>
  );
}
