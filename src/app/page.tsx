import {
  NewsletterForm,
  PageTransition,
  NewsTallCard,
  ResourceCarousel,
  Reveal,
  SectionHeading,
  SportsLifeClassicHero,
  Stagger,
  StoryCard
} from "@/components/marketing";
import { stories } from "@/lib/data";

export default function HomePage() {
  return (
    <PageTransition>
      <SportsLifeClassicHero />

      <section className="bg-white px-5 pb-20 pt-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-heading text-3xl font-black tracking-[-0.03em] text-dark md:text-4xl">
              Transforming Sports Through Christ-Centered Discipleship
            </h2>
            <p className="mt-8 text-left text-base leading-8 text-text/75 md:text-center">
              Sports leaders are uniquely positioned for influence in virtually every culture around the world. And sport is the universal language that brings people together and breaks through political, cultural, and socio-economic barriers. We believe God created sports for His glory, a platform where His people can compete with joy, freedom, and purpose. But most importantly, we believe that sports communities are the perfect place to bring the good news of Jesus Christ, to bring personal and eternal transformation to everyone who encounters Christ.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Featured Stories" title="In the news" description="Recent highlights, inspiring stories, useful resources, and ways SportsLife is expanding the mission." />
          <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.slice(0, 3).map((story) => (
              <NewsTallCard key={story.slug} story={story} />
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-5 pb-[clamp(5rem,11vw,9rem)] pt-[clamp(1rem,2.2vw,1.8rem)] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Leadership Resources" title="Resources for leaders, teams, and organizations" description="Books, Bible plans, and sport-specific tools that inspire leaders to live and lead with more vision, purpose, and passion." />
          <ResourceCarousel />
        </div>
      </section>

      <section className="section-padding bg-dark px-5 text-white lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/10 bg-white/[0.08] p-8 text-center backdrop-blur md:p-12">
          <SectionHeading light eyebrow="Stay Connected" title="Want to stay connected with SportsLife?" description="Receive updates on recent highlights, inspiring stories, useful resources, and ways to get involved." />
          <NewsletterForm />
        </div>
      </section>
    </PageTransition>
  );
}
