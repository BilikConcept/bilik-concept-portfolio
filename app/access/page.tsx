import Link from "next/link";

export default function AccessPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 text-black">
      <div className="text-center">
        <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-black/35">
          Bilik Concept
        </p>

        <Link
          href="/"
          className="inline-flex border border-black px-5 py-4 text-[10px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-white"
        >
          Enter site
        </Link>
      </div>
    </main>
  );
}
