import { supabase } from "@/lib/supabase";

export default async function SupabaseTestPage() {
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("id")
    .limit(1);

  return (
    <main className="min-h-screen bg-white px-5 py-28 text-[#111111] md:px-8 md:py-36">
      <section className="mx-auto max-w-[1440px]">
        <h1 className="mb-8 text-5xl tracking-[-0.07em] md:text-8xl">
          Supabase test
        </h1>

        {error ? (
          <pre className="whitespace-pre-wrap text-sm text-red-600">
            {JSON.stringify(error, null, 2)}
          </pre>
        ) : (
          <pre className="whitespace-pre-wrap text-sm text-[#555]">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </section>
    </main>
  );
}
