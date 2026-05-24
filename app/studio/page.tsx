import Link from "next/link";
import PublicBlackHeader from "@/components/PublicBlackHeader";

const services = [
  "Creative direction",
  "Social media management",
  "Content production",
  "Brand storytelling",
  "Editorial campaigns",
  "Visual strategy",
];

const approach = [
  {
    number: "01",
    title: "Atmosphere first",
    description:
      "We begin with the feeling a brand should leave behind, then translate it into image, language and rhythm.",
  },
  {
    number: "02",
    title: "Visual consistency",
    description:
      "Every frame, caption and campaign direction is built to feel connected, intentional and recognisable.",
  },
  {
    number: "03",
    title: "Content with memory",
    description:
      "We create systems that help brands stay present, not loud. Considered, calm and easy to remember.",
  },
];

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <PublicBlackHeader />

      <section className="mx-auto w-full max-w-[1680px] px-5 pb-10 pt-28 md:px-8">
        <header className="grid min-h-[calc(100vh-7rem)] content-between gap-16">
          <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div>
              <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/35">
                Bilik Concept / Studio
              </p>

              <h1 className="max-w-6xl text-6xl font-medium leading-[0.86] tracking-[-0.08em] md:text-[9rem]">
                Creative
                <br />
                studio.
              </h1>
            </div>

            <p className="max-w-md text-sm leading-6 text-black/50 md:pb-3">
              A concept-led creative studio shaping calm, intentional and
              memorable brand presence through visual direction, content and
              storytelling.
            </p>
          </div>

          <div className="border-t border-black pt-5">
            <p className="max-w-6xl text-4xl font-medium leading-[0.9] tracking-[-0.075em] md:text-7xl">
              We work where content meets taste, shaping how brands look, speak
              and stay remembered.
            </p>
          </div>
        </header>

        <section className="grid gap-12 border-t border-black py-16 md:grid-cols-[0.35fr_1fr] md:py-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.42em] text-black/35">
              About
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <p className="text-2xl font-medium leading-[1.02] tracking-[-0.055em] md:text-5xl">
              Bilik Concept builds visual worlds for brands that need more than
              content. They need atmosphere.
            </p>

            <div className="grid content-start gap-6 text-sm leading-6 text-black/55">
              <p>
                The studio works across creative direction, social media,
                content production and brand storytelling, creating visual
                systems that feel considered from the first impression.
              </p>

              <p>
                Our work is quiet, editorial and intentional. We look for
                rhythm, clarity and a sense of place, so every brand touchpoint
                feels part of the same story.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-12 border-t border-black py-16 md:grid-cols-[0.35fr_1fr] md:py-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.42em] text-black/35">
              What we do
            </p>
          </div>

          <div className="grid border-t border-black">
            {services.map((service) => (
              <div
                key={service}
                className="grid gap-4 border-b border-black py-5 md:grid-cols-[1fr_auto] md:items-center"
              >
                <h2 className="text-4xl font-medium leading-[0.9] tracking-[-0.07em] md:text-6xl">
                  {service}
                </h2>

                <span className="text-[10px] uppercase tracking-[0.32em] text-black/35">
                  Bilik Concept
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-12 border-t border-black py-16 md:grid-cols-[0.35fr_1fr] md:py-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.42em] text-black/35">
              Approach
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {approach.map((item) => (
              <article
                key={item.number}
                className="grid min-h-[360px] content-between border border-black p-5"
              >
                <p className="text-[10px] uppercase tracking-[0.32em] text-black/35">
                  {item.number}
                </p>

                <div>
                  <h2 className="mb-6 text-4xl font-medium leading-[0.9] tracking-[-0.07em]">
                    {item.title}
                  </h2>

                  <p className="text-sm leading-6 text-black/50">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-12 border-t border-black py-16 md:grid-cols-[1fr_1fr] md:py-24">
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/35">
              Studio note
            </p>

            <h2 className="max-w-3xl text-5xl font-medium leading-[0.86] tracking-[-0.08em] md:text-8xl">
              Less noise.
              <br />
              More memory.
            </h2>
          </div>

          <div className="grid content-between gap-10">
            <p className="max-w-lg text-sm leading-6 text-black/50">
              Bilik Concept is built for brands that want to communicate with
              restraint, taste and visual confidence. Every project starts with
              a simple question: what should people feel before they read
              anything?
            </p>

            <Link
              href="/contact"
              className="inline-flex w-fit border border-black px-5 py-4 text-[10px] uppercase tracking-[0.32em] transition hover:bg-black hover:text-white"
            >
              Start a conversation
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
