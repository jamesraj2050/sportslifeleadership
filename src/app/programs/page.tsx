import type { Metadata } from "next";
import { HeroSection, PageTransition, ProgramCard, SectionHeading, Stagger } from "@/components/marketing";
import { images, programs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore SportsLife Leadership initiatives including leadership development, sports ministry, discipleship training, coaching, events, and global outreach."
};

export default function ProgramsPage() {
  return (
    <PageTransition>
      <HeroSection eyebrow="Programs" title="Initiatives built for leaders in motion" subtitle="Training, coaching, sports ministry, events, and global outreach designed to form Christ-centered sports leaders." image={images.training} />
      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Ministry Initiatives" title="Every program moves leaders toward multiplication" />
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => <ProgramCard key={program.title} program={program} />)}
          </Stagger>
        </div>
      </section>
    </PageTransition>
  );
}
