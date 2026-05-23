import CaseStudyGallery from "@/components/CaseStudyGallery";
import { getProjectBySlug, getProjectMedia } from "@/lib/workspace";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const media = await getProjectMedia(project.id);

  const galleryItems =
    media.length > 0
      ? media.map((item) => ({
          label: item.alt ?? "Project image",
          orientation: item.orientation ?? "landscape",
          caption: item.caption ?? undefined,
          imageUrl: item.image_url,
        }))
      : [
          {
            label: "Full width campaign visual",
            orientation: "wide" as const,
          },
          {
            label: "Editorial image 01",
            orientation: "portrait" as const,
          },
          {
            label: "Detail image",
            orientation: "portrait" as const,
            caption:
              "A visual rhythm built around atmosphere, composition and quiet brand moments.",
          },
          {
            label: "Behind the scenes",
            orientation: "square" as const,
          },
          {
            label: "Final visual direction",
            orientation: "landscape" as const,
          },
        ];

  return (
    <main className="min-h-screen bg-white px-5 py-28 text-[#111111] md:px-8 md:py-36">
      <section className="mx-auto max-w-[1440px]">
        <div className="mb-14 grid gap-8 md:grid-cols-[0.55fr_1fr]">
          <div>
            <p className="mb-4 text-sm tracking-[-0.02em] text-[#555]">
              Case study
            </p>
            <p className="text-sm tracking-[-0.02em] text-[#777]">
              {project.category}
            </p>
          </div>

          <h1 className="max-w-5xl text-6xl font-normal leading-[0.9] tracking-[-0.08em] md:text-9xl">
            {project.title}
          </h1>
        </div>

        <div className="mb-16 aspect-[16/8] bg-[#f1f1ef]">
          <div className="flex h-full items-center justify-center px-6 text-center">
            <p className="text-sm tracking-[-0.02em] text-[#777]">
              Hero project image
            </p>
          </div>
        </div>

        <div className="grid gap-12 border-y border-[#d9d9d4] py-12 md:grid-cols-[0.55fr_1fr] md:py-16">
          <p className="text-sm tracking-[-0.02em] text-[#555]">
            Project note
          </p>

          <p className="max-w-5xl text-3xl leading-[1.02] tracking-[-0.06em] md:text-6xl">
            {project.full_description ?? project.short_description}
          </p>
        </div>

        <div className="grid gap-10 py-16 md:grid-cols-[0.55fr_1fr] md:py-24">
          <div>
            <p className="mb-5 text-sm tracking-[-0.02em] text-[#555]">
              Scope
            </p>

            <div className="grid gap-2 text-sm tracking-[-0.02em] text-[#555]">
              {(project.services ?? []).map((service) => (
                <p key={service}>{service}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-6 text-xl leading-[1.3] tracking-[-0.045em] text-[#333] md:grid-cols-2 md:text-2xl">
            <p>{project.short_description}</p>

            <p>
              {project.client_name
                ? `Created for ${project.client_name}${
                    project.year ? ` in ${project.year}` : ""
                  }.`
                : "Created as part of the Bilik Concept visual direction archive."}
            </p>
          </div>
        </div>

        <CaseStudyGallery items={galleryItems} />
      </section>
    </main>
  );
}
