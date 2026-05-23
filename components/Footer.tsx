export default function Footer() {
  return (
    <footer className="border-t border-[#d9d9d4] bg-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-10 md:grid-cols-[1fr_auto] md:px-8 md:py-12">
        <div>
          <p className="mb-4 text-sm tracking-[-0.02em] text-[#555]">
            Let’s build your visual presence.
          </p>

          <a
            href="mailto:office@bilikconcept.com"
            className="break-words text-4xl leading-[0.95] tracking-[-0.06em] hover:opacity-60 md:text-7xl"
          >
            office@bilikconcept.com
          </a>
        </div>

        <div className="flex items-end text-sm tracking-[-0.02em] text-[#555]">
          <p>
            Bilik Concept
            <br />
            Creative Studio
            <br />© 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
