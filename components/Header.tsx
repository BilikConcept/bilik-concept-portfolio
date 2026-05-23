"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Editorial", href: "/editorial" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState("");

  useEffect(() => {
    document.body.classList.add("page-has-entered");

    const timeout = window.setTimeout(() => {
      setIsTransitioning(false);
      setTransitionLabel("");
      document.body.classList.remove("page-is-transitioning");
    }, 950);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    function handlePageTransition(event: Event) {
      const customEvent = event as CustomEvent<{ label: string }>;

      setTransitionLabel(customEvent.detail.label);
      setIsTransitioning(true);
    }

    window.addEventListener("bilik-page-transition", handlePageTransition);

    return () => {
      window.removeEventListener("bilik-page-transition", handlePageTransition);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function handleNavigation(href: string, label: string) {
    if (href === pathname) {
      setIsMenuOpen(false);
      return;
    }

    setTransitionLabel(label);
    setIsTransitioning(true);
    setIsMenuOpen(false);

    document.body.classList.remove("page-has-entered");
    document.body.classList.add("page-is-transitioning");

    window.setTimeout(() => {
      router.push(href);
    }, 560);
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-8">
          <button
            type="button"
            onClick={() => handleNavigation("/", "Bilik Concept")}
            className="text-sm font-medium tracking-[-0.02em]"
          >
            Bilik Concept
          </button>

          <nav className="hidden items-center gap-7 text-sm tracking-[-0.02em] text-[#555] md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavigation(item.href, item.label)}
                className="transition-colors hover:text-black"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="text-sm tracking-[-0.02em] text-[#555] md:hidden"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-[70] bg-white transition-all duration-700 md:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="flex min-h-screen flex-col justify-between px-5 pb-8 pt-24"
        >
          <nav className="grid gap-3">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavigation(item.href, item.label)}
                className={`grid grid-cols-[48px_1fr] border-t border-[#d9d9d4] pt-4 text-left transition-all duration-700 ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 70}ms` : "0ms",
                }}
              >
                <span className="text-sm tracking-[-0.02em] text-[#777]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-5xl leading-[0.95] tracking-[-0.07em] text-[#111]">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div
            className={`border-t border-[#d9d9d4] pt-5 transition-all duration-700 ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: isMenuOpen ? "420ms" : "0ms",
            }}
          >
            <p className="max-w-xs text-sm leading-[1.35] tracking-[-0.02em] text-[#555]">
              Creative direction, content production and social media for visual
              brands.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-white/75 backdrop-blur-2xl transition-all duration-700 ${
          isTransitioning
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`transition-all duration-700 ${
            isTransitioning
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-3 opacity-0 blur-sm"
          }`}
        >
          <p className="text-sm tracking-[-0.02em] text-[#111]">
            Bilik Concept / {transitionLabel}
          </p>
        </div>
      </div>
    </>
  );
}
