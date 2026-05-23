import PublicBlackHeader from "@/components/PublicBlackHeader";
export default function StudioPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-28 text-[#111111] md:px-8 md:py-36">
      <PublicBlackHeader />
      <section className="mx-auto max-w-[1440px]">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.55fr_1fr]">
          <p className="text-sm tracking-[-0.02em] text-[#555]">
            Studio
          </p>

          <h1 className="max-w-5xl text-5xl font-normal leading-[0.95] tracking-[-0.07em] md:text-8xl">
            A creative studio building calm, intentional and memorable brand presence.
          </h1>
        </div>

        <div className="grid gap-12 border-y border-[#d9d9d4] py-12 md:grid-cols-[0.55fr_1fr] md:py-16">
          <p className="text-sm tracking-[-0.02em] text-[#555]">
            About Bilik Concept
          </p>

          <div>
            <p className="max-w-5xl text-3xl leading-[1.02] tracking-[-0.06em] md:text-6xl">
              We work where content meets taste — shaping how brands look,
              speak and stay remembered.
            </p>

            <div className="mt-10 grid gap-6 text-lg leading-[1.35] tracking-[-0.035em] text-[#444] md:grid-cols-2">
              <p>
                Bilik Concept works across creative direction, social media,
                content production and brand storytelling.
              </p>

              <p>
                The studio focuses on visual consistency, atmosphere and rhythm,
                creating content systems that feel considered from the first
                impression.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 py-16 md:grid-cols-3 md:py-24">
          <div className="aspect-[4/5] bg-[#f1f1ef]">
            <div className="flex h-full items-center justify-center px-6 text-center">
              <p className="text-sm tracking-[-0.02em] text-[#777]">
                Studio visual 01
              </p>
            </div>
          </div>

          <div className="aspect-[4/5] bg-[#eeeeeb]">
            <div className="flex h-full items-center justify-center px-6 text-center">
              <p className="text-sm tracking-[-0.02em] text-[#777]">
                Studio visual 02
              </p>
            </div>
          </div>

          <div className="aspect-[4/5] bg-[#f1f1ef]">
            <div className="flex h-full items-center justify-center px-6 text-center">
              <p className="text-sm tracking-[-0.02em] text-[#777]">
                Studio visual 03
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
