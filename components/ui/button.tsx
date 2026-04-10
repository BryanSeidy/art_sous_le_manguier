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
  primary: "bg-[#4F5753] text-[#F4F4F4] hover:bg-[#606966] active:scale-[0.98] disabled:opacity-40",
  secondary: "border border-[#4F5753] bg-transparent text-[#4F5753] hover:bg-[#4F5753] hover:text-[#F4F4F4] active:bg-[#606966] disabled:opacity-40",
  ghost: "text-[#4F5753] hover:text-[#4F5753] hover:bg-[#4F5753]/10 active:bg-[#4F5753]/20 disabled:opacity-40",
};

export function Button({ children, href, disabled, variant = "primary", className, ariaLabel, error }: ButtonProps) {
  const classes = cn(base, variants[variant], error && "border border-[var(--error)]", className);

  if (href?.startsWith("#")) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} aria-disabled={disabled}>
        {children}
      </a>
    );
  }

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
