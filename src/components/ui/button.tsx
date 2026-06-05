import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-[0.22em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white shadow-glow hover:-translate-y-1 hover:bg-[#8f191d]",
        secondary: "bg-white text-dark hover:-translate-y-1 hover:bg-accent",
        outline: "border border-white/30 bg-white/10 text-white backdrop-blur hover:-translate-y-1 hover:bg-white hover:text-dark",
        dark: "bg-dark text-white hover:-translate-y-1 hover:bg-primary"
      },
      size: {
        default: "h-12",
        lg: "h-14 px-8",
        sm: "h-10 px-5 text-xs"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    href?: string;
  };

export function Button({ className, variant, size, asChild, href, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return <Link href={href} className={classes}>{props.children}</Link>;
  }

  const Comp = asChild ? Slot : "button";
  return <Comp className={classes} {...props} />;
}
