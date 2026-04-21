type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase text-[var(--sky)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
          {children}
        </div>
      ) : null}
    </div>
  );
}
