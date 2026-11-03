import type { ReactNode } from "react";

type Variant = "solid" | "line" | "light" | "lightSolid";

const variants: Record<Variant, string> = {
  solid:
    "border-sage-deep bg-sage-deep text-ivory hover:-translate-y-px hover:bg-sage-ink focus-visible:outline-sage-deep",
  line: "border-sage/40 bg-transparent text-sage-deep hover:-translate-y-px hover:border-sage-deep hover:bg-sage-deep hover:text-ivory focus-visible:outline-sage-deep",
  light:
    "border-ivory/50 bg-transparent text-ivory hover:-translate-y-px hover:bg-ivory hover:text-sage-ink focus-visible:outline-ivory",
  lightSolid:
    "border-ivory bg-ivory text-sage-ink hover:-translate-y-px hover:bg-sand focus-visible:outline-ivory",
};

export function buttonClass(variant: Variant, className = "") {
  return [
    "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2.5 border px-6 py-3 text-center font-sans text-[0.68rem] font-medium tracking-[0.24em] uppercase transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
    variants[variant],
    className,
  ].join(" ");
}

export function TextLink({
  href,
  children,
  variant = "line",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={buttonClass(variant, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
