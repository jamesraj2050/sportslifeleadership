import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/article-progress";
import { NewsletterForm, PageTransition, SectionHeading, Stagger, StoryCard } from "@/components/marketing";
import { site, stories } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: "article",
      publishedTime: story.date,
      authors: [story.author],
      images: [story.image]
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.excerpt,
      images: [story.image]
    }
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  if (!story) notFound();

  const related = stories.filter((item) => item.slug !== story.slug).slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    datePublished: story.date,
    author: { "@type": "Organization", name: story.author },
    publisher: { "@type": "Organization", name: site.name },
    image: story.image,
    description: story.excerpt
  };

  return (
    <PageTransition>
      <ReadingProgress />
      <article>
        <section className="relative grid min-h-[82vh] place-items-end overflow-hidden bg-dark px-5 pb-16 pt-32 text-white lg:px-8">
          <Image src={story.image} alt={story.title} fill priority sizes="100vw" className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/45 to-transparent" />
          <div className="relative z-10 mx-auto max-w-5xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.28em] text-accent">{story.category}</p>
            <h1 className="mt-5 font-heading text-5xl font-black uppercase leading-none tracking-[-0.08em] md:text-8xl">{story.title}</h1>
            <div className="mt-8 flex flex-wrap gap-4 text-white/70">
              <span>{story.author}</span>
              <span>{formatDate(story.date)}</span>
              <span>5 min read</span>
            </div>
          </div>
        </section>

        <section className="section-padding px-5 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_240px]">
            <div className="article-body">
              {story.content.map((paragraph, index) => index === 1 ? (
                <div key={paragraph}>
                  <h2>Discipleship in Motion</h2>
                  <p>{paragraph}</p>
                </div>
              ) : <p key={paragraph}>{paragraph}</p>)}
            </div>
            <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-sm">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary">Share</p>
              <div className="mt-4 grid gap-3">
                {["LinkedIn", "Facebook", "Email"].map((item) => <button key={item} className="rounded-full bg-background px-4 py-3 text-sm font-bold text-dark">{item}</button>)}
              </div>
            </aside>
          </div>
        </section>
      </article>

      <section className="section-padding bg-background px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Related Articles" title="Keep reading" />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {related.map((item) => <StoryCard key={item.slug} story={item} />)}
          </Stagger>
        </div>
      </section>

      <section className="section-padding bg-dark px-5 text-white lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading light eyebrow="Newsletter" title="Stay connected with SportsLife" />
          <NewsletterForm />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </PageTransition>
  );
}
