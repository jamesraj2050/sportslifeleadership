import type { Metadata } from "next";
import { HeroSection, PageTransition, ResourceCard, ResourceCarousel, SectionHeading, Stagger } from "@/components/marketing";
import { images, resources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resources",
  description: "SportsLife Leadership books, Bible plans, and sport-specific resources for leaders, teams, and organizations."
};

export default function ResourcesPage() {
  return (
    <PageTransition>
      <HeroSection eyebrow="Resources" title="Tools for Christ-centered sports leaders" subtitle="Books that inspire leaders, teams, and organizations to live and lead with more vision, purpose, and passion." image={images.prayer} />
      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Featured" title="Leadership resources carousel" />
          <ResourceCarousel />
        </div>
      </section>
      <section className="section-padding bg-background px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Library" title="Static resource library" />
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => <ResourceCard key={resource.title} resource={resource} />)}
          </Stagger>
        </div>
      </section>
    </PageTransition>
  );
}
