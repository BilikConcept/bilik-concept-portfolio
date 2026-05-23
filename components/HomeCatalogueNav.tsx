"use client";

import { useEffect, useState } from "react";

const items = [
  { id: "intro", label: "Intro" },
  { id: "updates", label: "APPLE HOUR" },
  { id: "editorial", label: "Editorial" },
  { id: "index", label: "Index" },
];

type HomeCatalogueNavProps = {
  forceBlack?: boolean;
};

export default function HomeCatalogueNav({
  forceBlack = false,
}: HomeCatalogueNavProps) {
  const [activeId, setActiveId] = useState(items[0].id);

  const navTone = forceBlack ? "text-black" : "text-white";
  const inactiveTone = forceBlack ? "opacity-50" : "opacity-70";
  const activeStroke = forceBlack
    ? "0.9px rgba(0,0,0,1)"
    : "0.9px rgba(255,255,255,1)";

  useEffect(() => {
    const scrollRoot = document.querySelector("[data-home-scroll]");

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        root: scrollRoot,
        threshold: [0.5, 0.65, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <nav className="pointer-events-none fixed bottom-8 left-0 right-0 z-[9999] hidden px-5 md:block md:px-8">
      <div
        className={`mx-auto flex max-w-[1760px] items-center justify-center gap-12 ${navTone}`}
      >
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`pointer-events-auto font-sans text-[16px] uppercase tracking-[0.16em] ${navTone} transition-all duration-300 ${
                isActive
                  ? "scale-[1.16] font-[2000] opacity-100"
                  : `font-semibold ${inactiveTone} hover:opacity-100`
              }`}
              style={{
                textShadow: "none",
                WebkitTextStroke: isActive ? activeStroke : "0px transparent",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
