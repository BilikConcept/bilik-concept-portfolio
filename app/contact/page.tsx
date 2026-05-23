export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-28 text-[#111111] md:px-8 md:py-36">
      <section className="mx-auto max-w-[1440px]">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.55fr_1fr]">
          <p className="text-sm tracking-[-0.02em] text-[#555]">
            Contact
          </p>

          <h1 className="max-w-5xl text-5xl font-normal leading-[0.95] tracking-[-0.07em] md:text-8xl">
            Let’s build a visual presence with direction.
          </h1>
        </div>

        <div className="grid gap-10 border-y border-[#d9d9d4] py-12 md:grid-cols-[0.55fr_1fr] md:py-16">
          <p className="text-sm tracking-[-0.02em] text-[#555]">
            New projects
          </p>

          <div>
            <a
              href="mailto:office@wiktorbilik.pl"
              className="break-words text-5xl leading-[0.95] tracking-[-0.07em] hover:opacity-60 md:text-8xl"
            >
              office@wiktorbilik.pl
            </a>

            <p className="mt-10 max-w-xl text-xl leading-[1.25] tracking-[-0.045em] text-[#444] md:text-2xl">
              For collaborations, social media management, content production,
              campaign concepts and creative direction.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
