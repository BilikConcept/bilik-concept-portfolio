import PublicBlackHeader from "@/components/PublicBlackHeader";
"use client";

import { FormEvent, useState } from "react";

export default function AccessPage() {
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage("");

    const response = await fetch("/api/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pin }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setMessage("Wrong PIN.");
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const from = searchParams.get("from") || "/";

    window.location.href = from;
  }

  return (
    <main className="grid min-h-svh place-items-center bg-white px-5 text-black">
      <PublicBlackHeader />
      <section className="w-full max-w-sm text-center">
        <div className="mb-14 flex justify-center">
          <span
            aria-label="Bilik Concept"
            className="block h-5 w-[150px] bg-black"
            style={{
              WebkitMaskImage: "url('/bilik-logo.svg')",
              maskImage: "url('/bilik-logo.svg')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        </div>

        <p className="mb-8 text-[11px] uppercase tracking-[0.22em] text-[#777]">
          Private preview
        </p>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <input
            type="password"
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            placeholder="Enter PIN"
            className="h-14 w-full border border-black bg-white px-5 text-center text-[13px] uppercase tracking-[0.22em] outline-none placeholder:text-[#999]"
            autoFocus
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-14 border border-black bg-black text-[11px] uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black disabled:opacity-50"
          >
            {isSubmitting ? "Checking" : "Enter"}
          </button>

          {message ? (
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#777]">
              {message}
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
