import type { Metadata } from "next";
import { ContactCards, ContactForm, FAQList, HeroSection, PageTransition, SectionHeading } from "@/components/marketing";
import { images, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact SportsLife Leadership through a premium static form experience with office information, social links, map placeholder, and FAQ."
};

export default function ContactPage() {
  return (
    <PageTransition>
      <HeroSection eyebrow="Contact" title="Start a conversation with SportsLife" subtitle="Connect about leadership, programs, resources, partnerships, events, or supporting the mission." image={images.contact} />
      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Contact Information" title="We would love to hear from you" description={`${site.phone} · ${site.email}`} />
            <ContactCards />
          </div>
          <ContactForm />
        </div>
      </section>
      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="grid min-h-[420px] place-items-center rounded-[2.5rem] bg-dark p-8 text-center text-white">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.28em] text-accent">Map Placeholder</p>
              <h2 className="mt-4 font-heading text-5xl font-black uppercase tracking-[-0.06em]">Overland Park, Kansas</h2>
              <p className="mt-4 text-white/65">Google Maps embed placeholder for production integration.</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="FAQ" title="Quick answers" />
            <FAQList />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
