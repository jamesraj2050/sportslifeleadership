"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = ({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item
    className={cn("overflow-hidden rounded-[1.5rem] border border-border bg-white", className)}
    {...props}
  />
);
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "group flex flex-1 items-center justify-between gap-4 px-6 py-6 text-left font-heading text-2xl font-black uppercase tracking-[-0.03em] text-dark transition hover:bg-background focus-visible:outline-none",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown className="h-6 w-6 shrink-0 text-primary transition duration-300 group-data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content
    className={cn("accordion-content overflow-hidden text-text/75 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", className)}
    {...props}
  >
    <div className="px-6 pb-7 pt-0 text-lg leading-9">{children}</div>
  </AccordionPrimitive.Content>
);
AccordionContent.displayName = "AccordionContent";

