import type { ReactNode } from "react";
import Link from "next/link";

type ArchiveVariant = "work" | "stories" | "editorial";

type ArchiveItem = {
  id: string;
  href: string;
  title: string;
  eyebrow: string;
  description?: string | null;
  teamNote?: string | null;
  imageUrl?: string | null;
};

type ArchiveHeaderProps = {
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  description?: string;
};

type ArchiveGridProps = {
  variant: ArchiveVariant;
  items: ArchiveItem[];
  emptyLabel: string;
};

export function PublicArchiveShell({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto grid min-h-screen w-full max-w-[1680px] content-between px-5 pb-10 pt-28 md:px-8">
      {children}
    </section>
  );
}

export function PublicArchiveHeader({
  eyebrow,
  titleTop,
  titleBottom,
  description,
}: ArchiveHeaderProps) {
  return (
    <header className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
      <div>
        <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/35">
          {eyebrow}
        </p>

        <h1 className="max-w-5xl text-6xl font-medium leading-[0.86] tracking-[-0.08em] md:text-[9rem]">
          {titleTop}
          <br />
          {titleBottom}
        </h1>
      </div>

      {description ? (
        <p className="max-w-md text-sm leading-6 text-black/50 md:pb-3">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function PublicArchiveGrid({
  variant,
  items,
  emptyLabel,
}: ArchiveGridProps) {
  if (items.length === 0) {
    return (
      <section className="mt-16 border-t border-black pt-8">
        <p className="text-sm text-black/45">{emptyLabel}</p>
      </section>
    );
  }

  if (variant === "stories") {
    return (
      <section className="mt-16 grid gap-5 border-t border-black pt-5 md:grid-cols-12">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={
              index % 5 === 0
                ? "md:col-span-7"
                : index % 5 === 1
                  ? "md:col-span-5 md:pt-24"
                  : index % 5 === 2
                    ? "md:col-span-4"
                    : index % 5 === 3
                      ? "md:col-span-4 md:pt-16"
                      : "md:col-span-4"
            }
          >
            <ArchiveCard
              item={item}
              imageAspect={index % 5 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}
            />
          </div>
        ))}
      </section>
    );
  }

  if (variant === "editorial") {
    const [featured, second, third, ...rest] = items;

    return (
      <section className="mt-16 border-t border-black pt-5">
        <div className="grid gap-5 md:grid-cols-12">
          <div className="md:col-span-8">
            <ArchiveCard
              item={featured}
              imageAspect="aspect-[16/10]"
              titleSize="large"
            />
          </div>

          <div className="grid gap-5 md:col-span-4">
            {second ? (
              <ArchiveCard item={second} imageAspect="aspect-[4/5]" />
            ) : null}

            {third ? (
              <ArchiveCard item={third} imageAspect="aspect-[4/3]" />
            ) : null}
          </div>
        </div>

        {rest.length > 0 ? (
          <div className="mt-14 grid gap-x-5 gap-y-12 border-t border-black pt-5 md:grid-cols-4">
            {rest.map((item, index) => (
              <div
                key={item.id}
                className={index % 2 === 1 ? "md:pt-20" : ""}
              >
                <ArchiveCard item={item} imageAspect="aspect-[4/5]" />
              </div>
            ))}
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <section className="mt-16 grid gap-5 border-t border-black pt-5 md:grid-cols-3">
      {items.map((item, index) => (
        <ArchiveCard
          key={item.id}
          item={item}
          imageAspect={index === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}
        />
      ))}
    </section>
  );
}

function ArchiveCard({
  item,
  imageAspect,
  titleSize = "default",
}: {
  item: ArchiveItem;
  imageAspect: string;
  titleSize?: "default" | "large";
}) {
  return (
    <Link href={item.href} className="group grid gap-4">
      <div className={`${imageAspect} overflow-hidden bg-[#efefec]`}>
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>

      <article>
        <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-black/35">
          {item.eyebrow}
        </p>

        <h2
          className={
            titleSize === "large"
              ? "max-w-4xl text-5xl font-medium leading-[0.86] tracking-[-0.08em] md:text-7xl"
              : "text-4xl font-medium leading-[0.88] tracking-[-0.07em]"
          }
        >
          {item.title}
        </h2>

        {item.description ? (
          <p className="mt-4 max-w-md text-sm leading-5 text-black/50">
            {item.description}
          </p>
        ) : null}
      </article>
    </Link>
  );
}
