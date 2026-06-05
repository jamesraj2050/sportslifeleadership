import type { Metadata } from "next";
import { HeroSection, PageTransition, SearchableNews, SectionHeading, StoryCard } from "@/components/marketing";
import { images, stories } from "@/lib/data";

export const metadata: Metadata = {
  title: "News",
  description: "SportsLife Leadership news, stories, resources, and ministry updates in a modern magazine layout."
};

export default function NewsPage() {
  return (
    <PageTransition>
      <HeroSection eyebrow="News" title="Stories of leadership, discipleship, and global impact" subtitle="Recent highlights, inspiring stories, useful resources, and ways to get involved." image={images.global} />
      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Featured Article" title="Magazine-quality ministry storytelling" />
          <StoryCard story={stories[0]} featured />
        </div>
      </section>
      <section className="section-padding bg-background px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="All Articles" title="Search, filter, and keep exploring" description="Infinite-scroll style loading is simulated with static data for this demonstration." />
          <SearchableNews />
        </div>
      </section>
    </PageTransition>
  );
}
