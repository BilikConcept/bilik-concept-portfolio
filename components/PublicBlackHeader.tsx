"use client";

import { useEffect, useState } from "react";
import TransitionLink from "@/components/TransitionLink";

const menuItems = [
  ["Work", "/work"],
  ["Stories", "/stories"],
  ["Editorial", "/editorial"],
  ["Studio", "/studio"],
  ["Services", "/services"],
  ["Contact", "/contact"],
];

export default function PublicBlackHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("public-black-header-page");
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.classList.remove("public-black-header-page");
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body.public-black-header-page [data-main-header] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
          `,
        }}
      />

      <div
        data-public-black-header
        onMouseLeave={() => setIsOpen(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2147483640,
        }}
      >
        <header
          className={`relative transition-colors duration-300 ${
            isOpen ? "bg-white text-black" : "bg-transparent text-black"
          }`}
        >
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-5 md:h-20 md:px-8">
            <button
              type="button"
              onMouseEnter={() => setIsOpen(true)}
              onClick={() => setIsOpen((current) => !current)}
              className="group flex h-10 w-10 items-center justify-start"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <span className="grid w-7 gap-[5px]">
                <span className="h-px w-7 bg-black transition-colors duration-300" />
                <span className="h-px w-7 bg-black transition-colors duration-300" />
                <span className="h-px w-7 bg-black transition-colors duration-300" />
              </span>
            </button>

            <TransitionLink
              href="/"
              label="Home"
              className="flex justify-center"
              onClick={() => setIsOpen(false)}
            >
              <span
                aria-label="Bilik Concept"
                className="block h-4 w-[120px] bg-current text-black transition-colors duration-300 md:h-5 md:w-[150px]"
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
            </TransitionLink>

            <div className="justify-self-end text-[11px] uppercase tracking-[0.24em] text-black">
              2026
            </div>
          </div>
        </header>
      </div>

      <div
        style={{
          position: "fixed",
          top: "4rem",
          left: 0,
          zIndex: 2147483639,
          height: "calc(100svh - 4rem)",
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`w-full bg-white text-black transition-all duration-500 md:top-20 md:h-[calc(100svh-5rem)] md:w-[420px] ${
          isOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-full opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-5 pb-6 pt-8 md:px-8 md:pb-8 md:pt-10">
          <nav className="grid gap-5">
            {menuItems.map(([label, href], index) => (
              <TransitionLink
                key={href}
                href={href}
                label={label}
                onClick={() => setIsOpen(false)}
                className="group grid grid-cols-[40px_1fr] items-end border-b border-[#d9d9d4] pb-5"
              >
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#777]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-4xl uppercase leading-[0.9] tracking-[-0.075em] transition-opacity group-hover:opacity-50 md:text-5xl">
                  {label}
                </span>
              </TransitionLink>
            ))}
          </nav>

          <div className="mt-10 grid gap-6">
            <p className="max-w-xs text-[11px] uppercase leading-[1.45] tracking-[0.22em] text-[#777]">
              Visual direction / Content production / Social presence
            </p>

            <TransitionLink
              href="/contact"
              label="Contact"
              onClick={() => setIsOpen(false)}
              className="text-[11px] uppercase tracking-[0.22em] text-[#555] transition-opacity hover:opacity-60"
            >
              Contact →
            </TransitionLink>
          </div>
        </div>
      </div>
    </>
  );
}
