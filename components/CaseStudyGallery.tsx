"use client";

import { useEffect, useState } from "react";

type GalleryItem = {
  label: string;
  orientation?: "wide" | "landscape" | "portrait" | "square";
  caption?: string;
  imageUrl?: string;
};

type CaseStudyGalleryProps = {
  items: GalleryItem[];
};

function getFrameClass(item: GalleryItem) {
  if (item.orientation === "wide") {
    return "aspect-[16/7.5]";
  }

  if (item.orientation === "landscape") {
    return "aspect-[16/10]";
  }

  if (item.orientation === "portrait") {
    return "aspect-[4/5]";
  }

  if (item.orientation === "square") {
    return "aspect-square";
  }

  return "aspect-[16/10]";
}

function getWrapperClass(index: number, item: GalleryItem) {
  if (item.orientation === "wide" || index === 0) {
    return "w-full md:mx-auto md:w-[86%]";
  }

  if (item.orientation === "portrait") {
    return index % 2 === 0
      ? "w-full md:ml-auto md:w-[40%]"
      : "w-full md:w-[40%]";
  }

  if (item.orientation === "square") {
    return index % 2 === 0
      ? "w-full md:w-[34%]"
      : "w-full md:ml-auto md:w-[34%]";
  }

  return index % 2 === 0
    ? "w-full md:w-[62%]"
    : "w-full md:ml-auto md:w-[62%]";
}

export default function CaseStudyGallery({ items }: CaseStudyGalleryProps) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    }

    if (activeItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  return (
    <>
      <section className="pb-10 md:pb-20">
        <div className="grid gap-10 md:gap-20">
          {items.map((item, index) => (
            <article
              key={`${item.imageUrl || item.label}-${index}`}
              className={getWrapperClass(index, item)}
            >
              <button
                type="button"
                onClick={() => {
                  console.log("LIGHTBOX CLICK", item);
                  setActiveItem(item);
                }}
                className="block w-full cursor-zoom-in text-left"
              >
                <div
                  className={`${getFrameClass(
                    item,
                  )} group overflow-hidden bg-[#f1f1ef]`}
                >
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={item.label}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.012]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center transition-transform duration-700 group-hover:scale-[1.012]">
                      <div>
                        <p className="text-sm tracking-[-0.02em] text-[#777]">
                          {item.label}
                        </p>

                        <p className="mt-3 text-sm tracking-[-0.02em] text-[#999] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          View full image
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </button>

              {item.caption ? (
                <p className="mt-4 max-w-sm text-sm leading-[1.35] tracking-[-0.02em] text-[#555]">
                  {item.caption}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[999] bg-white/90 backdrop-blur-2xl"
          onClick={() => setActiveItem(null)}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveItem(null);
            }}
            className="fixed right-5 top-5 z-[1000] rounded-full bg-white px-4 py-2 text-sm tracking-[-0.02em] text-[#555] shadow-sm transition-opacity hover:opacity-60 md:right-8"
          >
            Close
          </button>

          <div className="flex h-dvh w-full items-center justify-center px-5 py-20 md:px-8">
            <div
              onClick={(event) => event.stopPropagation()}
              className="grid w-full max-w-[1120px] gap-5 animate-[lightbox-enter_700ms_cubic-bezier(0.22,1,0.36,1)_both]"
            >
              <div className="flex max-h-[72dvh] min-h-[260px] items-center justify-center bg-[#f1f1ef]">
                {activeItem.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeItem.imageUrl}
                    alt={activeItem.label}
                    className="max-h-[72dvh] max-w-full object-contain"
                  />
                ) : (
                  <div className="flex min-h-[320px] items-center justify-center px-6 text-center">
                    <div>
                      <p className="text-sm tracking-[-0.02em] text-[#777]">
                        {activeItem.label}
                      </p>

                      <p className="mt-3 text-sm tracking-[-0.02em] text-[#999]">
                        Full image preview
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-3 text-sm tracking-[-0.02em] text-[#555] md:grid-cols-[0.4fr_0.6fr]">
                <p>{activeItem.label}</p>

                {activeItem.caption ? (
                  <p className="max-w-xl leading-[1.35] md:justify-self-end md:text-right">
                    {activeItem.caption}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
