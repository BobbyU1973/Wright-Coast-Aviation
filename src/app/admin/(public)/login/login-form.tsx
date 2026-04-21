"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "not-owner"
      ? "This email is not listed in ADMIN_EMAILS."
      : null
  );
  const [pending, startTransition] = useTransition();
  const configured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  function onSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { error: signInError } =
          await supabase.auth.signInWithPassword({
            email: String(formData.get("email") || ""),
            password: String(formData.get("password") || "")
          });

        if (signInError) {
          setError(signInError.message);
          return;
        }

        router.refresh();
        router.push("/admin");
      } catch (caught) {
        setError(
          caught instanceof Error
            ? caught.message
            : "Unable to sign in. Check Supabase configuration."
        );
      }
    });
  }

  return (
    <div className="mx-auto max-w-md rounded-[8px] border border-[var(--line)] bg-white p-6 soft-shadow">
      <div className="text-center">
        <Image
          src="/brand/wright-coast-aviation-logo.svg"
          alt="Wright Coast Aviation"
          width={220}
          height={116}
          className="mx-auto h-[94px] w-auto"
          priority
        />
        <h1 className="mt-4 text-3xl font-bold">Owner login</h1>
        <p className="mt-2 text-[var(--muted)]">
          Manage photos, services, reviews, leads, homepage content, and the
          FlightCircle booking link.
        </p>
      </div>

      {!configured ? (
        <p className="mt-5 rounded-[8px] bg-[#fff8df] p-4 text-sm font-bold text-[#7a5a00]">
          Add Supabase environment variables before using the dashboard.
        </p>
      ) : null}

      {error ? (
        <p className="mt-5 rounded-[8px] bg-[#fff0ed] p-4 text-sm font-bold text-[#9a2d18]">
          {error}
        </p>
      ) : null}

      <form action={onSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-bold">Email</span>
          <input
            required
            type="email"
            name="email"
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold">Password</span>
          <input
            required
            type="password"
            name="password"
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
        </label>
        <button
          disabled={pending || !configured}
          type="submit"
          className="focus-ring min-h-12 rounded-[8px] bg-[var(--navy)] px-5 py-3 font-bold text-white transition hover:bg-[#0b4a80] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
