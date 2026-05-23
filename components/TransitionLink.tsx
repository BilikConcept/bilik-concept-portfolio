"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type TransitionLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function TransitionLink({
  href,
  label,
  children,
  className = "",
  onClick,
}: TransitionLinkProps) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();

    onClick?.();

    document.documentElement.classList.add("page-is-leaving");

    window.setTimeout(() => {
      router.push(href);
      document.documentElement.classList.remove("page-is-leaving");
    }, 380);
  }

  return (
    <Link
      href={href}
      aria-label={label}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}
