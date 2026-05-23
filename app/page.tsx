import HomeCatalogueNav from "@/components/HomeCatalogueNav";
import {
  getLatestArticle,
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
}: {
  id: string;
  label: string;
  leftImageUrl?: string | null;
  rightImageUrl?: string | null;
  title?: string;
}) {
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

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 mx-auto grid max-w-[1500px] -translate-y-1/2 px-5 text-center text-white md:px-8">
        <h2 className="text-[13vw] font-bold leading-[0.9] tracking-[-0.075em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)] md:text-[7vw] xl:text-[104px]">
          {title || "Bilik Concept Updates"}
        </h2>

        <p className="mx-auto mt-6 max-w-5xl text-[4.7vw] font-bold uppercase leading-[1.15] tracking-[-0.045em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:mt-8 md:text-[2.2vw] xl:text-[34px]">
          The latest visual notes for the{" "}
          <span className="font-serif-display italic font-normal normal-case tracking-[-0.04em]">
            brand world
          </span>{" "}
          and for the{" "}
          <span className="font-serif-display italic font-normal normal-case tracking-[-0.04em]">
            community
          </span>
          .
        </p>
      </div>
    </section>
  );
}

export default async function Home() {
  const [latestArticle, projects, homepageHeroImageUrl, updatesSideImageUrl] =
    await Promise.all([
      getLatestArticle(),
      getPublishedProjects(),
      getSiteSetting("homepage_hero_image_url"),
      getSiteSetting("updates_side_image_url"),
    ]);

  const featuredProjects = projects.slice(0, 4);
  const heroProject = featuredProjects[0];
  const secondProject = featuredProjects[1];
  const thirdProject = featuredProjects[2];

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
          title={latestArticle.title || "Bilik Concept Updates"}
          leftImageUrl={
            latestArticle.hero_image_url ||
            heroProject?.hero_image_url ||
            homepageHeroImageUrl
          }
          rightImageUrl={
            updatesSideImageUrl ||
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
