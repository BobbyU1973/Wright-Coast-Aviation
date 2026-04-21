import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/app/admin/(public)/login/login-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Owner Login",
  description: "Owner login for Wright Coast Aviation.",
  path: "/admin/login",
  noIndex: true
});

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f7fbff] px-4 py-16">
      <Suspense
        fallback={
          <div className="mx-auto max-w-md rounded-[8px] border border-[var(--line)] bg-white p-6 text-center">
            Loading owner login...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
