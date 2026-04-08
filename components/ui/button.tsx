import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
  error?: boolean;
};

const base =
  "focus-ring inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition duration-200";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-mango text-[#1a2f1c] hover:brightness-95 active:scale-[0.98] disabled:opacity-40",
  secondary: "border border-cream/45 bg-transparent text-cream hover:bg-cream/10 active:bg-cream/20 disabled:opacity-40",
  ghost: "text-cream/85 hover:text-cream hover:bg-white/10 active:bg-white/20 disabled:opacity-40",
};

export function Button({ children, href, disabled, variant = "primary", className, ariaLabel, error }: ButtonProps) {
  const classes = cn(base, variants[variant], error && "border border-[var(--error)]", className);
  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
