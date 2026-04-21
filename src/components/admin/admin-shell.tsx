import Image from "next/image";
import Link from "next/link";
import { adminNavItems } from "@/lib/site";
import { signOutAction } from "@/app/admin/(dashboard)/actions";

export function AdminShell({
  children,
  userEmail
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  return (
    <main className="min-h-screen bg-[#f7fbff]">
      <div className="container-wide grid gap-6 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[8px] border border-[var(--line)] bg-white p-4 lg:sticky lg:top-24 lg:h-fit">
          <Link href="/admin" className="focus-ring inline-flex">
            <Image
              src="/brand/wright-coast-aviation-logo.svg"
              alt="Wright Coast Aviation"
              width={190}
              height={98}
              className="h-[72px] w-auto"
            />
          </Link>
          <p className="mt-3 text-sm text-[var(--muted)]">{userEmail}</p>
          <nav className="mt-5 grid gap-2" aria-label="Admin">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-[8px] px-3 py-3 text-sm font-bold text-[var(--muted)] hover:bg-[#e8f4fb] hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={signOutAction} className="mt-5">
            <button
              type="submit"
              className="focus-ring min-h-11 w-full rounded-[8px] border border-[var(--line)] px-4 py-2 text-sm font-bold hover:bg-[#fff0ed]"
            >
              Sign out
            </button>
          </form>
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}
