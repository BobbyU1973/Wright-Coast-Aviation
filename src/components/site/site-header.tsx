"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur">
      <div className="container-wide flex min-h-[84px] items-center justify-between gap-4">
        <Link
          href="/"
          className="focus-ring flex min-w-0 items-center"
          aria-label="Wright Coast Aviation home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/wright-coast-aviation-logo.svg"
            alt="Wright Coast Aviation"
            width={184}
            height={96}
            priority
            className="h-[66px] w-auto sm:h-[76px]"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring rounded-[8px] px-3 py-2 text-sm font-bold text-[var(--muted)] transition hover:bg-[#e8f4fb] hover:text-[var(--foreground)]",
                pathname === item.href && "bg-[#e8f4fb] text-[var(--foreground)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[var(--line)] bg-white text-[var(--foreground)] lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--line)] bg-white lg:hidden">
          <nav className="container-wide grid gap-2 py-4" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring rounded-[8px] px-3 py-3 text-base font-bold text-[var(--muted)]",
                  pathname === item.href &&
                    "bg-[#e8f4fb] text-[var(--foreground)]"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
