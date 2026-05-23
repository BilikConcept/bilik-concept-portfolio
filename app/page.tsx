import TransitionLink from "@/components/TransitionLink";
import { services } from "@/lib/content";
import {
  getLatestArticle,
  getPublishedProjects,
  getSiteSetting,
} from "@/lib/workspace";

function VisualBlock({
  label,
  imageUrl,
  className = "",
}: {
  label: string;
  imageUrl?: string | null;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden bg-[#f2f2f0] ${className}`}>
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={label}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center px-6 text-center">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[#777]">
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

function SerifWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-serif-display italic tracking-[-0.045em]">
      {children}
    </span>
  );
}

export default async function Home() {
  const [latestArticle, projects, homepageHeroImageUrl] = await Promise.all([
    getLatestArticle(),
    getPublishedProjects(),
    getSiteSetting("homepage_hero_image_url"),
  ]);

  const featuredProjects = projects.slice(0, 3);
  const heroProject = featuredProjects[0];
  const secondProject = featuredProjects[1];
  const thirdProject = featuredProjects[2];

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <section className="mx-auto h-svh max-w-[1760px] overflow-hidden px-5 pb-6 pt-20 md:px-8 md:pb-8 md:pt-24">
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-5 md:gap-6">
          <div />

          <div className="relative grid items-center">
            <VisualBlock
              label="Campaign visual 9:16"
              imageUrl={homepageHeroImageUrl || heroProject?.hero_image_url}
              className="mx-auto aspect-[10.5/16] h-[50svh] max-h-[620px] w-auto md:h-[54svh]"
            />

            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-full max-w-[1180px] -translate-x-1/2 -translate-y-1/2 px-2 text-center">
              <h1 className="text-[18vw] font-normal leading-[0.84] tracking-[-0.095em] md:text-[11vw] xl:text-[150px]">
                Visual presence
                <br />
                with <SerifWord>atmosphere</SerifWord>.
              </h1>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-[0.5fr_1fr_0.5fr] md:items-end">
            <p className="text-[13px] uppercase tracking-[0.16em] text-[#777]">
              Bilik Concept / 2026
            </p>

            <p className="mx-auto max-w-2xl text-center text-lg leading-[1.15] tracking-[-0.045em] text-[#333] md:text-2xl">
              A creative studio shaping content, campaigns and social presence
              for brands with a strong visual point of view.
            </p>

            <p className="text-[13px] uppercase tracking-[0.16em] text-[#777] md:text-right">
              Scroll
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1760px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 md:grid-cols-[0.55fr_0.45fr] md:items-end">
          <div>
            <VisualBlock
              label="Wide editorial visual 16:9"
              imageUrl={secondProject?.hero_image_url}
              className="aspect-video w-full"
            />

            <p className="mt-5 max-w-xl text-[13px] uppercase leading-[1.35] tracking-[0.16em] text-[#777]">
              Brand atmosphere / visual rhythm / campaign feeling
            </p>
          </div>

          <div className="md:pb-10">
            <p className="mb-8 text-[13px] uppercase tracking-[0.16em] text-[#777]">
              Studio direction
            </p>

            <p className="max-w-4xl text-4xl leading-[0.98] tracking-[-0.065em] md:text-7xl">
              Content should feel like the brand already knows who it is.
            </p>

            <p className="mt-8 max-w-xl text-xl leading-[1.25] tracking-[-0.04em] text-[#444] md:text-2xl">
              We build visual systems around feeling, pacing and memory, so
              every post, campaign and image belongs to one clear world.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1760px] px-5 pb-24 md:px-8 md:pb-40">
        <div className="mb-14 flex items-end justify-between gap-8 border-b border-[#d9d9d4] pb-5">
          <p className="text-[13px] uppercase tracking-[0.16em] text-[#777]">
            Selected campaigns
          </p>

          <TransitionLink
            href="/work"
            label="Work"
            className="text-[13px] uppercase tracking-[0.16em] text-[#555] transition-opacity hover:opacity-60"
          >
            View all work →
          </TransitionLink>
        </div>

        <div className="grid gap-24 md:gap-36">
          {featuredProjects.map((project, index) => {
            const variant = index % 3;

            if (variant === 0) {
              return (
                <TransitionLink
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  label={project.title}
                  className="group block text-left"
                >
                  <article className="relative min-h-[78vh]">
                    <VisualBlock
                      label="Project visual 16:9"
                      imageUrl={project.hero_image_url}
                      className="aspect-video w-full md:w-[72%]"
                    />

                    <div className="relative z-10 mt-6 md:-mt-24 md:ml-auto md:w-[52%]">
                      <p className="mb-4 text-[13px] uppercase tracking-[0.16em] text-[#777]">
                        {String(index + 1).padStart(2, "0")} / {project.category}
                      </p>

                      <h3 className="max-w-5xl text-5xl font-normal leading-[0.9] tracking-[-0.075em] transition-opacity group-hover:opacity-70 md:text-8xl">
                        {project.title}
                      </h3>

                      <p className="mt-6 max-w-xl text-xl leading-[1.25] tracking-[-0.04em] text-[#333] md:text-2xl">
                        {project.short_description}
                      </p>

                      <p className="mt-8 text-[13px] uppercase tracking-[0.16em] text-[#555] transition-transform duration-500 group-hover:translate-x-2">
                        View project →
                      </p>
                    </div>
                  </article>
                </TransitionLink>
              );
            }

            if (variant === 1) {
              return (
                <TransitionLink
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  label={project.title}
                  className="group block text-left"
                >
                  <article className="grid gap-8 md:grid-cols-[0.42fr_0.58fr] md:items-center">
                    <div className="md:pr-8">
                      <p className="mb-4 text-[13px] uppercase tracking-[0.16em] text-[#777]">
                        {String(index + 1).padStart(2, "0")} / {project.category}
                      </p>

                      <h3 className="max-w-4xl text-5xl font-normal leading-[0.9] tracking-[-0.075em] transition-opacity group-hover:opacity-70 md:text-8xl">
                        {project.title}
                      </h3>

                      <p className="mt-6 max-w-xl text-xl leading-[1.25] tracking-[-0.04em] text-[#333] md:text-2xl">
                        {project.short_description}
                      </p>

                      <p className="mt-8 text-[13px] uppercase tracking-[0.16em] text-[#555] transition-transform duration-500 group-hover:translate-x-2">
                        View project →
                      </p>
                    </div>

                    <div className="grid grid-cols-[0.48fr_0.52fr] gap-5 md:gap-6">
                      <VisualBlock
                        label="Project visual 9:16"
                        imageUrl={project.hero_image_url}
                        className="aspect-[9/16] w-full"
                      />

                      <VisualBlock
                        label="Project visual 9:16 detail"
                        imageUrl={project.hero_image_url}
                        className="mt-16 aspect-[9/16] w-full md:mt-28"
                      />
                    </div>
                  </article>
                </TransitionLink>
              );
            }

            return (
              <TransitionLink
                key={project.slug}
                href={`/work/${project.slug}`}
                label={project.title}
                className="group block text-left"
              >
                <article className="relative grid gap-8 md:grid-cols-[0.55fr_0.45fr] md:items-end">
                  <div className="md:order-2">
                    <VisualBlock
                      label="Project visual 16:9"
                      imageUrl={project.hero_image_url}
                      className="aspect-video w-full"
                    />
                  </div>

                  <div className="md:order-1 md:pb-10">
                    <p className="mb-4 text-[13px] uppercase tracking-[0.16em] text-[#777]">
                      {String(index + 1).padStart(2, "0")} / {project.category}
                    </p>

                    <h3 className="max-w-4xl text-5xl font-normal leading-[0.9] tracking-[-0.075em] transition-opacity group-hover:opacity-70 md:text-8xl">
                      {project.title}
                    </h3>

                    <p className="mt-6 max-w-xl text-xl leading-[1.25] tracking-[-0.04em] text-[#333] md:text-2xl">
                      {project.short_description}
                    </p>

                    <p className="mt-8 text-[13px] uppercase tracking-[0.16em] text-[#555] transition-transform duration-500 group-hover:translate-x-2">
                      View project →
                    </p>
                  </div>
                </article>
              </TransitionLink>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1760px] px-5 pb-24 md:px-8 md:pb-40">
        <div className="grid gap-10 border-y border-[#d9d9d4] py-14 md:grid-cols-[0.32fr_1fr] md:py-20">
          <div>
            <p className="mb-6 text-[13px] uppercase tracking-[0.16em] text-[#777]">
              What we do
            </p>

            <p className="max-w-xs text-[13px] uppercase leading-[1.35] tracking-[0.16em] text-[#777]">
              Creative direction / Content production / Social presence
            </p>
          </div>

          <div>
            <p className="max-w-6xl text-5xl leading-[0.92] tracking-[-0.08em] md:text-8xl">
              We shape the way a brand looks, speaks and stays remembered.
            </p>

            <div className="mt-14 grid gap-6 md:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Direction",
                  text: "The visual idea, feeling and point of view behind the brand.",
                },
                {
                  number: "02",
                  title: "Content",
                  text: "Photo, video, reels, stories and campaign assets created with intention.",
                },
                {
                  number: "03",
                  title: "Social",
                  text: "Ongoing presence, rhythm, planning and visual consistency.",
                },
                {
                  number: "04",
                  title: "Campaigns",
                  text: "Concepts for launches, seasonal stories and brand moments.",
                },
              ].map((item) => (
                <article key={item.title} className="border-t border-[#d9d9d4] pt-5">
                  <p className="mb-10 text-[13px] uppercase tracking-[0.16em] text-[#777]">
                    {item.number}
                  </p>

                  <h3 className="text-4xl leading-[0.95] tracking-[-0.065em] md:text-5xl">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-base leading-[1.35] tracking-[-0.03em] text-[#555]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1760px] px-5 pb-24 md:px-8 md:pb-36">
        <div className="grid gap-10 border-y border-[#d9d9d4] py-14 md:grid-cols-[0.32fr_1fr] md:py-20">
          <p className="text-[13px] uppercase tracking-[0.16em] text-[#777]">
            About Bilik Concept
          </p>

          <div>
            <p className="max-w-6xl text-4xl leading-[1] tracking-[-0.065em] md:text-7xl">
              A creative studio for brands that want their content to feel
              considered, consistent and visually memorable.
            </p>

            <div className="mt-10 grid gap-8 text-lg leading-[1.4] tracking-[-0.04em] text-[#555] md:grid-cols-2">
              <p>
                We work across creative direction, social media, content
                production and visual storytelling.
              </p>

              <p>
                Our role is to translate the character of a brand into a visual
                rhythm, something people can recognise before they even read the
                name.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
