"use client";

import { useState } from "react";
import Link from "next/link";

const menuItems = [
  ["Home", "/"],
  ["Work", "/work"],
  ["Stories", "/stories"],
];

export default function StoriesHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-[100] w-full">
        <div className="relative flex items-center justify-between px-5 py-5 md:px-8">
          <Link
            href="/"
            aria-label="Bilik Concept"
            className="absolute left-1/2 top-1/2 block h-5 w-[92px] -translate-x-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
          >
            <span
              className="block h-full w-full bg-black"
              style={{
                WebkitMaskImage: "url('/bilik-logo.svg')",
                maskImage: "url('/bilik-logo.svg')",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "left center",
                maskPosition: "left center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
          </Link>

          <div className="h-11 w-11" />

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-black bg-white/10 backdrop-blur-xl transition hover:bg-black/5"
          >
            <span className="grid gap-1.5">
              <span className="block h-px w-5 bg-black transition" />
              <span className="block h-px w-5 bg-black transition" />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[105] bg-black/20 backdrop-blur-[2px] transition duration-300 ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`fixed left-0 top-16 z-[110] h-[calc(100svh-4rem)] w-full bg-white text-black transition-all duration-500 md:top-20 md:h-[calc(100svh-5rem)] md:w-[420px] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between border-r border-black px-5 py-6 md:px-8">
          <nav className="grid gap-4">
            {menuItems.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="group border-b border-black pb-4"
              >
                <span className="mb-2 block text-[10px] uppercase tracking-[0.32em] text-black/35">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="block text-5xl font-medium leading-[0.9] tracking-[-0.07em] transition group-hover:translate-x-2 md:text-6xl">
                  {label}
                </span>
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 inline-flex border border-black px-5 py-4 text-[10px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-white"
          >
            Close
          </button>
        </div>
      </aside>
    </>
  );
}
