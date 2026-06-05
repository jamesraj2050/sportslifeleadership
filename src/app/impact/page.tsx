import type { Metadata } from "next";
import {
  AnimatedTimeline,
  CinematicStoryScroll,
  EditorialMetricPanels,
  HeroSection,
  ImmersiveImpactGlobe,
  KineticMarquee,
  PageTransition,
  PremiumCTA,
  SectionHeading,
  Stagger,
  TestimonialCard,
  VideoFeature
} from "@/components/marketing";
import { images, testimonials, videos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Impact",
  description: "A nonprofit annual report style impact page with animated statistics, map, stories, testimonials, video, and growth timeline."
};

export default function ImpactPage() {
  return (
    <PageTransition>
      <HeroSection eyebrow="Global Impact" title="Transforming sports through Christ-centered leaders" subtitle="An annual-report inspired view of SportsLife's global reach, stories, and momentum." video={videos.impact} image={images.global} />
      <KineticMarquee items={["20+ Countries", "30+ Staff", "1000+ Leaders", "1M+ Bible Plans"]} />
      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Annual Report" title="Impact measured in leaders, nations, and Scripture engagement" description="The numbers are only the surface. Behind every metric is a leader being formed and a community being served." />
          <EditorialMetricPanels />
        </div>
      </section>
      <CinematicStoryScroll />
      <section className="section-padding cinematic-surface px-5 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading light eyebrow="World Map" title="Sports is a global language" description="A premium visualization of ministry relationships across sport cultures and country networks." />
          <ImmersiveImpactGlobe />
        </div>
      </section>
      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <VideoFeature image={images.huddle} title="Global leaders. Local communities. Eternal impact." />
        </div>
      </section>
      <section className="section-padding bg-dark px-5 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading light eyebrow="Testimonials" title="What leaders are saying" />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => <TestimonialCard key={testimonial.name} testimonial={testimonial} />)}
          </Stagger>
        </div>
      </section>
      <section className="section-padding px-5 lg:px-8">
        <SectionHeading eyebrow="Growth Timeline" title="From vision to multiplication" />
        <AnimatedTimeline />
      </section>
      <PremiumCTA
        eyebrow="Support the Mission"
        title="Fuel the next chapter of global sports discipleship."
        text="Your generosity helps leaders receive training, resources, coaching, and community as SportsLife expands across countries and sport networks."
        image={images.donation}
        href="/donate"
        label="Invest in Impact"
      />
    </PageTransition>
  );
}
