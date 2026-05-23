import TransitionLink from "@/components/TransitionLink";
import { getPublishedProjects } from "@/lib/workspace";

export default async function WorkPage() {
  const projects = await getPublishedProjects();

  return (
    <main className="min-h-screen bg-white px-5 py-28 text-[#111111] md:px-8 md:py-36">
      <section className="mx-auto max-w-[1440px]">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.55fr_1fr]">
          <p className="text-sm tracking-[-0.02em] text-[#555]">Work</p>

          <h1 className="max-w-5xl text-5xl font-normal leading-[0.95] tracking-[-0.07em] md:text-8xl">
            Selected visual work, content systems and brand stories.
          </h1>
        </div>

        <div className="grid gap-14 md:gap-20">
          {projects.map((project, index) => (
            <TransitionLink
              key={project.slug}
              href={`/work/${project.slug}`}
              label={project.title}
              className="group grid w-full gap-5 border-t border-[#d9d9d4] pt-6 text-left md:grid-cols-[0.2fr_0.8fr_1fr]"
            >
              <p className="text-sm text-[#555]">
                {String(index + 1).padStart(2, "0")}
              </p>

              <div>
                <h2 className="text-3xl font-normal tracking-[-0.05em] transition-opacity group-hover:opacity-60 md:text-5xl">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm tracking-[-0.02em] text-[#555]">
                  {project.category}
                </p>
              </div>

              <div>
                <div className="mb-5 aspect-[16/9] bg-[#f1f1ef]">
                  <div className="flex h-full items-center justify-center px-6 text-center">
                    <p className="text-sm tracking-[-0.02em] text-[#777]">
                      Project visual
                    </p>
                  </div>
                </div>

                <p className="max-w-xl text-xl leading-[1.18] tracking-[-0.045em] text-[#222] md:text-2xl">
                  {project.short_description}
                </p>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>
    </main>
  );
}
