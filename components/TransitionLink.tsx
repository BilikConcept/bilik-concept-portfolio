"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type TransitionLinkProps = {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
};

export default function TransitionLink({
  href,
  label,
  className,
  children,
}: TransitionLinkProps) {
  const router = useRouter();

  function handleClick() {
    document.body.classList.remove("page-has-entered");
    document.body.classList.add("page-is-transitioning");

    const event = new CustomEvent("bilik-page-transition", {
      detail: {
        label,
      },
    });

    window.dispatchEvent(event);

    window.setTimeout(() => {
      router.push(href);
    }, 560);
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
