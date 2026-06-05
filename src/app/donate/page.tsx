import type { Metadata } from "next";
import { FAQList, HeroSection, ImpactCalculator, PageTransition, SectionHeading, StatsGrid } from "@/components/marketing";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/data";

export const metadata: Metadata = {
  title: "Donate",
  description: "A Charity Water inspired static donation page with impact calculator, trust indicators, FAQ, and sticky donate CTA."
};

export default function DonatePage() {
  return (
    <PageTransition>
      <HeroSection eyebrow="Give" title="Invest in leaders who transform sports communities" subtitle="Your financial partnership provides training, resources, and programs all over the world." image={images.donation} primaryCta={{ label: "Choose Gift", href: "#give" }} />
      <section id="give" className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Impact Calculator" title="See what generosity can unlock" />
          <ImpactCalculator />
        </div>
      </section>
      <section className="section-padding bg-dark px-5 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading light eyebrow="Trust Indicators" title="Built for stewardship and clarity" description="No payment processing is connected in this static demo. The page is designed to plug into a giving platform later." />
          <StatsGrid dark />
        </div>
      </section>
      <section className="section-padding px-5 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Donation questions" />
          <FAQList />
        </div>
      </section>
      <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
        <Button href="#give" size="lg">Donate Now</Button>
      </div>
    </PageTransition>
  );
}
