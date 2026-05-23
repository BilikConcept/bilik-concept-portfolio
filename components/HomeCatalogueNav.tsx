"use client";

import { useEffect, useMemo, useState } from "react";

type NavItem = {
  id?: string;
  href?: string;
  label: string;
};

type HomepageStoryNavItem = {
  id: string;
  label: string;
};

type HomeCatalogueNavProps = {
  forceBlack?: boolean;
  storyItems?: HomepageStoryNavItem[];
};

export default function HomeCatalogueNav({
  forceBlack = false,
  storyItems = [],
}: HomeCatalogueNavProps) {
  const items = useMemo<NavItem[]>(
    () => [
      { id: "intro", label: "Intro" },
      ...storyItems.map((item) => ({
        id: item.id,
        label: item.label,
      })),
      { id: "editorial", label: "Editorial" },
      { id: "index", label: "Selected Works©" },
    ],
    [storyItems],
  );

  const scrollItems = items.filter((item) => item.id) as {
    id: string;
    label: string;
  }[];

  const [activeId, setActiveId] = useState(scrollItems[0]?.id || "intro");

  const navTone = forceBlack ? "text-black" : "text-white";
  const inactiveTone = forceBlack ? "opacity-50" : "opacity-70";
  const activeStroke = forceBlack
    ? "0.9px rgba(0,0,0,1)"
    : "0.9px rgba(255,255,255,1)";

  useEffect(() => {
    const scrollRoot = document.querySelector("[data-home-scroll]");

    const sections = scrollItems
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
  }, [scrollItems]);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <nav className="pointer-events-none fixed bottom-8 left-0 right-0 z-[9999] hidden px-5 md:block md:px-8">
      <div
        className={`mx-auto flex max-w-[1760px] flex-wrap items-center justify-center gap-x-10 gap-y-3 ${navTone}`}
      >
        {items.map((item) => {
          const isActive = item.id ? activeId === item.id : false;

          const className = `pointer-events-auto font-sans text-[16px] uppercase tracking-[0.16em] ${navTone} transition-all duration-300 ${
            isActive
              ? "scale-[1.16] font-[2000] opacity-100"
              : `font-semibold ${inactiveTone} hover:opacity-100`
          }`;

          const style = {
            textShadow: "none",
            WebkitTextStroke: isActive ? activeStroke : "0px transparent",
          };

          if (item.href) {
            return (
              <a
                key={item.href}
                href={item.href}
                className={className}
                style={style}
              >
                {item.label}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => item.id && scrollToSection(item.id)}
              className={className}
              style={style}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
