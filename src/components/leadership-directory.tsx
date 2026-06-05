"use client";

import { useMemo, useState } from "react";
import { LeadershipCard, SectionHeading, Stagger } from "@/components/marketing";
import { leaders } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters = ["All", "Executive", "Sports", "Country Leaders", "Support Team"];

export function LeadershipDirectory() {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => leaders.filter((leader) => filter === "All" || leader.category === filter), [filter]);

  return (
    <>
      <SectionHeading eyebrow="Team" title="Executive leadership and global staff" description="Filter by executive leadership, sports ministry, country leaders, and support team." />
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={cn("rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] transition", filter === item ? "bg-primary text-white shadow-glow" : "bg-white text-text shadow-sm hover:bg-dark hover:text-white")}>
            {item}
          </button>
        ))}
      </div>
      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((leader) => <LeadershipCard key={leader.id} leader={leader} />)}
      </Stagger>
    </>
  );
}
