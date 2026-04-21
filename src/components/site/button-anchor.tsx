import { cn } from "@/lib/utils";

type ButtonAnchorProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "ghost";
  className?: string;
};

const variantStyles = {
  primary:
    "bg-[var(--book)] text-[var(--charcoal)] hover:bg-[var(--book-hover)] border-[var(--book)]",
  secondary:
    "bg-white text-[var(--charcoal)] hover:bg-[#edf8ff] border-white",
  dark:
    "bg-[var(--charcoal)] text-white hover:bg-[#24313b] border-[var(--charcoal)]",
  ghost:
    "bg-transparent text-[var(--foreground)] hover:bg-[#e8f4fb] border-[var(--line)]"
};

export function ButtonAnchor({
  href,
  children,
  variant = "primary",
  className
}: ButtonAnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center rounded-[8px] border px-5 py-3 text-sm font-bold transition",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </a>
  );
}
