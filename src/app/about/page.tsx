import type { Metadata } from "next";
import { AnimatedTimeline, HeroSection, ImpactCard, PageTransition, Reveal, SectionHeading, Stagger, StatsGrid, VideoFeature } from "@/components/marketing";
import { images, methods, site, values, videos } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "About",
  description: "Learn the mission, vision, values, methods, and Scripture foundation of SportsLife Leadership."
};

export default function AboutPage() {
  return (
    <PageTransition>
      <HeroSection eyebrow="About SportsLife" title="Transforming Sports Through Christ-Centered Discipleship" subtitle={site.description} video={videos.about} image={images.huddle} />

      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.28em] text-primary">Why SportsLife</p>
            <h2 className="font-heading text-5xl font-black uppercase tracking-[-0.07em] text-dark md:text-7xl">Sports communities are mission fields.</h2>
          </Reveal>
          <Reveal>
            <p className="text-lg leading-9 text-text/75">
              Sports leaders are uniquely positioned for influence in virtually every culture around the world. Sport is the universal language that brings people together and breaks through political, cultural, and socio-economic barriers. SportsLife exists to infuse life into sports leaders who build sports communities for Kingdom impact.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-dark px-5 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading light eyebrow="Mission / Vision / Values" title="The conviction behind the movement" />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-8 text-dark">
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">Mission</p>
              <h3 className="mt-4 font-heading text-4xl font-black uppercase tracking-[-0.06em]">{site.mission}</h3>
            </div>
            <div className="rounded-[2rem] bg-primary p-8 text-white">
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-accent">Vision</p>
              <h3 className="mt-4 font-heading text-4xl font-black uppercase tracking-[-0.06em]">{site.vision}</h3>
            </div>
          </div>
          <Stagger className="mt-6 grid gap-6 md:grid-cols-3">
            {values.map((value) => <ImpactCard key={value.title} {...value} dark />)}
          </Stagger>
        </div>
      </section>

      <section id="statement-of-faith" className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Statement of Faith" title="Christ-centered. Scripture-rooted." />
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[2rem] bg-white p-8 shadow-sm">
                <p className="text-lg leading-9 text-text/75">
                  SportsLife Leadership is a Christian ministry committed to the Gospel of Jesus Christ. We believe the Bible is God’s Word, and that discipleship happens through relationship, formation, and faithful leadership.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="rounded-[2rem] bg-dark p-8 text-white shadow-premium">
                <p className="eyebrow text-accent">2 Timothy 2:2</p>
                <p className="mt-5 text-lg leading-9 text-white/70">
                  We equip sports leaders to model Christ-like character, mentor others in Christ, and multiply Kingdom impact in the communities they influence.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Methods" title="Model. Mentor. Multiply." description="This is discipleship in motion. This is 2 Timothy 2:2 lived out." />
          <div id="the-sportslife-way" />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {methods.map((method) => <ImpactCard key={method.title} {...method} />)}
          </Stagger>
        </div>
      </section>

      <section id="board-of-directors" className="section-padding bg-background px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Board of Directors" title="Stewardship and accountability" description="Demo content placeholder for board listing (static data only)." />
          <div className="grid gap-4 md:grid-cols-3">
            {["Board Chair", "Vice Chair", "Treasurer", "Secretary", "Member At Large", "Member At Large"].map((role) => (
              <div key={role} className="rounded-[2rem] bg-white p-7 shadow-sm">
                <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-primary">{role}</p>
                <p className="mt-4 font-heading text-2xl font-black tracking-[-0.03em] text-dark">Name Placeholder</p>
                <p className="mt-2 text-text/70">Board bio placeholder for demo.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background px-5 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="More" title="Values & methods (details)" description="Dropdown items with smooth fold-up/fold-down animation." />
          <Accordion type="single" collapsible className="grid gap-4">
            {values.map((value) => (
              <AccordionItem key={value.title} value={`value-${value.title}`}>
                <AccordionTrigger>{value.title}</AccordionTrigger>
                <AccordionContent>{value.description}</AccordionContent>
              </AccordionItem>
            ))}
            {methods.map((method) => (
              <AccordionItem key={method.title} value={`method-${method.title}`}>
                <AccordionTrigger>{method.title}</AccordionTrigger>
                <AccordionContent>{method.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-padding bg-background px-5 lg:px-8">
        <SectionHeading eyebrow="Timeline" title="Faithful leaders developing faithful leaders" />
        <AnimatedTimeline />
      </section>

      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] bg-dark p-8 text-white md:p-14">
            <p className="text-sm font-extrabold uppercase tracking-[0.28em] text-accent">Scripture</p>
            <blockquote className="mt-6 max-w-5xl font-heading text-4xl font-black uppercase leading-tight tracking-[-0.06em] md:text-6xl">“{site.scripture}”</blockquote>
            <p className="mt-6 text-xl text-white/65">{site.scriptureRef}</p>
          </div>
        </div>
      </section>

      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StatsGrid />
          <div className="mt-10">
            <VideoFeature image={images.training} title="Competition for today’s trophies. Leadership for eternal reward." />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
