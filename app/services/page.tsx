import PublicBlackHeader from "@/components/PublicBlackHeader";
const services = [
  {
    title: "Creative direction",
    description:
      "Defining the visual feeling, tone and direction of a brand before production begins.",
  },
  {
    title: "Social media management",
    description:
      "Planning, managing and shaping a consistent social presence across selected platforms.",
  },
  {
    title: "Content production",
    description:
      "Photo, video and short-form content created with a clear visual concept and brand rhythm.",
  },
  {
    title: "Brand storytelling",
    description:
      "Translating brand character into language, ideas, campaigns and content narratives.",
  },
  {
    title: "Campaign concepts",
    description:
      "Creative ideas for launches, seasonal communication, announcements and brand moments.",
  },
  {
    title: "Photo and video direction",
    description:
      "Direction for shoots, styling, composition, mood, pacing and visual consistency.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-28 text-[#111111] md:px-8 md:py-36">
      <PublicBlackHeader />
      <section className="mx-auto max-w-[1440px]">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.55fr_1fr]">
          <p className="text-sm tracking-[-0.02em] text-[#555]">Services</p>

          <h1 className="max-w-5xl text-5xl font-normal leading-[0.95] tracking-[-0.07em] md:text-8xl">
            Direction, production and presence for visual brands.
          </h1>
        </div>

        <div className="grid border-t border-[#d9d9d4]">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="grid gap-5 border-b border-[#d9d9d4] py-7 md:grid-cols-[0.2fr_0.8fr_1fr] md:py-9"
            >
              <p className="text-sm text-[#555]">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h2 className="text-3xl font-normal tracking-[-0.05em] md:text-5xl">
                {service.title}
              </h2>

              <p className="max-w-2xl text-xl leading-[1.18] tracking-[-0.045em] text-[#333] md:text-2xl">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
