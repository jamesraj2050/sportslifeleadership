import type { Metadata } from "next";
import { LeadershipDirectory } from "@/components/leadership-directory";
import { HeroSection, PageTransition } from "@/components/marketing";
import { images } from "@/lib/data";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the executive team, staff, sports leaders, country leaders, and support team of SportsLife Leadership."
};

export default function LeadershipPage() {
  return (
    <PageTransition>
      <HeroSection eyebrow="Leadership" title="Faithful leaders developing faithful leaders" subtitle="Meet the executive team, field directors, country leaders, and support staff serving the global SportsLife mission." image={images.leadership} />
      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <LeadershipDirectory />
        </div>
      </section>
    </PageTransition>
  );
}
