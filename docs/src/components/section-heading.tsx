import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl space-y-4",
        align === "left" ? "text-left" : "text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.2em]",
            tone === "light" ? "text-green-200" : "text-green-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-semibold sm:text-4xl",
          tone === "light" ? "text-white" : "text-slate-900",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn(
          "text-base sm:text-lg", 
          tone === "light" ? "text-white/80" : "text-slate-600",
          descriptionClassName
        )}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

