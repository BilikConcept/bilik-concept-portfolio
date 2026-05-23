import Link from "next/link";
import PublicBlackHeader from "@/components/PublicBlackHeader";

export default function AccessPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <PublicBlackHeader />

      <section className="mx-auto grid min-h-screen w-full max-w-[1680px] content-center px-5 py-28 md:px-8">
        <div className="max-w-4xl">
          <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/35">
            Bilik Concept / Access
          </p>

          <h1 className="text-6xl font-medium leading-[0.86] tracking-[-0.08em] md:text-[9rem]">
            Access
            <br />
            open.
          </h1>

          <p className="mt-8 max-w-md text-sm leading-6 text-black/50">
            The site is now available without a PIN.
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex border border-black px-5 py-4 text-[10px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-white"
          >
            Go to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
