import type { Metadata } from "next";
import { AnimatedTimeline, HeroSection, ImpactCard, PageTransition, SectionHeading, Stagger, StoryCard } from "@/components/marketing";
import { Button } from "@/components/ui/button";
import { images, stories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Become a SportsLife Leader",
  description: "A premium application funnel for Christ-centered, discipleship-driven leaders seeking Kingdom impact through sports."
};

const traits = [
  { title: "Christ-Centered", description: "Your leadership begins in identity, Scripture, prayer, and surrender to Jesus.", icon: "Cross" },
  { title: "Discipleship-Driven", description: "You want to mentor leaders who can pass truth along to others.", icon: "HeartHandshake" },
  { title: "Kingdom Impact", description: "You see sport as a platform for personal and eternal transformation.", icon: "Target" },
  { title: "Accountability", description: "You welcome coaching, community, and faithful stewardship of influence.", icon: "ShieldCheck" }
];

const journey = [
  { year: "Step 01", title: "Apply", description: "Tell us about your faith, sport context, leadership influence, and desire to multiply." },
  { year: "Step 02", title: "Discern", description: "Meet with SportsLife leaders to discern calling, readiness, fit, and next steps." },
  { year: "Step 03", title: "Train", description: "Enter a Christ-centered training pathway built around model, mentor, and multiply." },
  { year: "Step 04", title: "Launch", description: "Bring SportsLife resources, coaching, and community into your sport environment." }
];

export default function SportsLifeLeaderPage() {
  return (
    <PageTransition>
      <HeroSection eyebrow="Application Funnel" title="Become a SportsLife Leader" subtitle="Join faithful leaders developing faithful leaders through the power of sports." image={images.huddle} primaryCta={{ label: "Start Application", href: "/contact" }} secondaryCta={{ label: "Explore Programs", href: "/programs" }} />
      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Who We Are Looking For" title="Leaders with spiritual depth and athletic influence" />
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {traits.map((trait) => <ImpactCard key={trait.title} {...trait} />)}
          </Stagger>
        </div>
      </section>
      <section className="section-padding bg-background px-5 lg:px-8">
        <SectionHeading eyebrow="Leadership Journey" title="From calling to multiplication" />
        <AnimatedTimeline items={journey} />
      </section>
      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Success Stories" title="Proof of discipleship in motion" />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {stories.slice(0, 3).map((story) => <StoryCard key={story.slug} story={story} />)}
          </Stagger>
        </div>
      </section>
      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-primary p-8 text-center text-white md:p-14">
          <p className="text-sm font-extrabold uppercase tracking-[0.28em] text-accent">Apply Now</p>
          <h2 className="mx-auto mt-4 max-w-4xl font-heading text-5xl font-black uppercase tracking-[-0.07em] md:text-7xl">Your leadership is about to change.</h2>
          <Button href="/contact" variant="secondary" className="mt-8" size="lg">Begin the Conversation</Button>
        </div>
      </section>
    </PageTransition>
  );
}
