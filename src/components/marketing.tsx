"use client";

import { useEffect, useMemo, useRef, useState, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import useEmblaCarousel from "embla-carousel-react";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronRight,
  Cross,
  ExternalLink,
  Filter,
  Globe2,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  Megaphone,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  X,
  Zap,
  type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  contactCards,
  donationOptions,
  faqs,
  images,
  impactStats,
  leaders,
  mapPins,
  methods,
  aboutMenu,
  navItems,
  programs,
  resources,
  site,
  stories,
  testimonials,
  timeline,
  values
} from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 }
};

const iconMap = {
  Award,
  BookOpen,
  Cross,
  Globe2,
  HeartHandshake,
  Mail,
  MapPin,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap
} satisfies Record<string, LucideIcon>;

type IconKey = keyof typeof iconMap;

function resolveIcon(icon: string | LucideIcon) {
  return typeof icon === "string" ? iconMap[icon as IconKey] ?? Trophy : icon;
}

export function LenisProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
      {children}
    </motion.main>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", solid || open ? "bg-dark/95 shadow-2xl backdrop-blur" : "bg-transparent")}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group flex items-center gap-3 text-white">
          <Image
            src="/images/sportslife-logo.png"
            alt="SportsLife"
            width={220}
            height={52}
            priority
            className="h-10 w-auto rounded-sm opacity-95 transition group-hover:opacity-100"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            item.label === "About" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
                onFocus={() => setAboutOpen(true)}
                onBlur={() => setAboutOpen(false)}
              >
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={aboutOpen}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/75 transition hover:text-white",
                    pathname.startsWith("/about") && "text-white"
                  )}
                >
                  About
                </button>
                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-dark/95 shadow-premium backdrop-blur"
                      role="menu"
                    >
                      <div className="grid">
                        {aboutMenu.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="px-5 py-4 text-sm font-semibold text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                            role="menuitem"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/75 transition hover:text-white",
                  pathname === item.href && "text-white"
                )}
              >
                {item.label}
                {["Programs", "Resources"].includes(item.label) && (
                  <span className="pointer-events-none absolute left-0 top-full hidden w-[520px] pt-4 group-hover:block">
                    <span className="grid rounded-3xl border border-white/10 bg-dark/95 p-4 text-left shadow-premium backdrop-blur">
                      <span className="mb-3 text-xs text-white/45">Explore {item.label}</span>
                      <span className="grid grid-cols-2 gap-2">
                        {(item.label === "Programs" ? programs.slice(0, 4) : resources).map((entry) => (
                          <span key={entry.title} className="rounded-2xl bg-white/[0.06] p-4 transition hover:bg-primary">
                            <span className="block font-heading text-sm font-extrabold text-white">{entry.title}</span>
                            <span className="mt-1 line-clamp-2 block text-xs leading-5 text-white/65">{entry.description}</span>
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                )}
              </Link>
            )
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/donate" size="sm">Donate</Button>
        </div>

        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="border-t border-white/10 bg-dark px-5 py-6 lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl bg-white/[0.05] px-4 py-4 font-heading text-lg font-extrabold text-white">
                {item.label}
                <ChevronRight className="h-5 w-5 text-primary" />
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="dark-gradient noise relative overflow-hidden px-5 py-16 text-white lg:px-8">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3">
            <Image
              src="/images/sportslife-logo.png"
              alt="SportsLife"
              width={220}
              height={52}
              className="h-11 w-auto rounded-sm opacity-95"
            />
          </div>
          <p className="max-w-md text-lg leading-8 text-white/70">{site.description}</p>
          <Button href="/donate" className="mt-8" variant="secondary">Join the Support Team</Button>
        </div>
        <FooterColumn title="Mission" items={[site.mission, site.vision, "Model. Mentor. Multiply."]} />
        <FooterColumn title="Values" items={values.map((value) => value.title)} />
        <div>
          <h3 className="font-heading text-sm font-extrabold uppercase tracking-[0.24em] text-white/50">Newsletter</h3>
          <p className="mt-4 text-white/70">Receive recent highlights, inspiring stories, useful resources, and ways to get involved.</p>
          <NewsletterForm compact />
          <div className="mt-6 flex gap-3 text-sm text-white/60">
            <span>{site.phone}</span>
            <span>{site.email}</span>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} SportsLife Leadership. Static redesign demo.</p>
        <div className="flex flex-wrap gap-4">
          {navItems.slice(0, 7).map((item) => <Link key={item.href} href={item.href} className="hover:text-white">{item.label}</Link>)}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-heading text-sm font-extrabold uppercase tracking-[0.24em] text-white/50">{title}</h3>
      <div className="mt-5 grid gap-4">
        {items.map((item) => <p key={item} className="text-white/75">{item}</p>)}
      </div>
    </div>
  );
}

export function VideoHero({
  eyebrow,
  title,
  subtitle,
  video,
  image = images.hero,
  primaryCta,
  secondaryCta
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  video?: string;
  image?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section ref={heroRef} className="cinematic-surface noise relative grid min-h-[86vh] place-items-center overflow-hidden bg-dark px-5 py-28 text-white md:min-h-screen md:py-32">
      <div className="premium-grid absolute inset-0 z-[1]" />
      {video ? (
        <motion.video
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{ scale: shouldReduceMotion ? 1 : videoScale }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5, ease: "easeOut" }}
          poster={image}
        >
          <source src={video} type="video/mp4" />
        </motion.video>
      ) : (
        <Image src={image} alt="" fill priority className="object-cover opacity-55" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/45 to-dark/25" />
      <motion.div style={{ y: shouldReduceMotion ? 0 : contentY, opacity: shouldReduceMotion ? 1 : contentOpacity }} className="relative z-10 mx-auto max-w-7xl text-center" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
        {eyebrow && <motion.p variants={fadeUp} className="mb-6 text-sm font-extrabold uppercase tracking-[0.38em] text-accent">{eyebrow}</motion.p>}
        <motion.h1 variants={fadeUp} className="hero-text mx-auto max-w-5xl font-heading font-black uppercase text-balance">{title}</motion.h1>
        <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">{subtitle}</motion.p>
        {(primaryCta || secondaryCta) && (
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryCta && <Button href={primaryCta.href} size="lg">{primaryCta.label}</Button>}
            {secondaryCta && <Button href={secondaryCta.href} variant="outline" size="lg">{secondaryCta.label}</Button>}
          </motion.div>
        )}
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-t from-dark to-transparent" />
      <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="absolute bottom-8 left-1/2 h-12 w-px bg-white/40" />
    </section>
  );
}

export function HeroSection(props: ComponentProps<typeof VideoHero>) {
  return <VideoHero {...props} />;
}

export function SportsLifeClassicHero() {
  const shouldReduceMotion = useReducedMotion();
  const [activeImage, setActiveImage] = useState(0);
  const [lifeScaleX, setLifeScaleX] = useState<number>(1);
  const heroRef = useRef<HTMLElement>(null);
  const lifeRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const lockupY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroImages = [
    { src: "/images/football-6.png", alt: "Football team walking onto the field" },
    { src: "/images/football-3.png", alt: "Football player dribbling during a night match" },
    { src: "/images/football-5.png", alt: "Football players attacking near the goal" },
    { src: "/images/football-4.png", alt: "Football teams entering the pitch" },
    { src: "/images/football-1.png", alt: "Football team walking together before kickoff" },
    { src: "/images/football-7.png", alt: "Football player jumping during warmups" },
    { src: "/images/football-9.png", alt: "Football match under floodlights" },
    { src: "/images/football-hero.png", alt: "Football player standing on the field" }
  ];
  const cards = [
    {
      title: "VISION",
      body: <p className="mx-auto max-w-[26ch] text-lg leading-9 text-text/70">To build sports communities for Kingdom impact.</p>
    },
    {
      title: "MISSION",
      featured: true,
      body: <p className="mx-auto max-w-[28ch] text-lg leading-9 text-white/78">To infuse life into sports leaders around the world.</p>
    },
    {
      title: "VALUES",
      body: (
        <div className="mx-auto grid gap-2.5 text-lg font-semibold leading-9 text-text/75">
          <span>Love Deeply</span>
          <span>Live Abundantly</span>
          <span>Lead Courageously</span>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [heroImages.length, shouldReduceMotion]);

  useEffect(() => {
    const recalc = () => {
      const lifeEl = lifeRef.current;
      const bottomEl = bottomRef.current;
      if (!lifeEl || !bottomEl) return;

      // `offsetWidth` ignores transforms. We want to scale LIFE from its unscaled
      // intrinsic layout width to match the *rendered* width of "INTO SPORTS".
      const lifeBaseWidth = lifeEl.offsetWidth;
      const bottomRenderedWidth = bottomEl.getBoundingClientRect().width;
      if (!lifeBaseWidth || !bottomRenderedWidth) return;

      // Make LIFE intentionally wider than "INTO SPORTS"
      const overshoot = 1.12;
      const next = (bottomRenderedWidth * overshoot) / lifeBaseWidth;
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      // Mobile browsers can render -webkit-text-stroke as segmented when combined
      // with transforms; keep LIFE centered and unscaled on mobile.
      setLifeScaleX(isMobile ? 1 : Math.max(0.7, Math.min(1.6, next)));
    };

    recalc();
    const raf1 = window.requestAnimationFrame(recalc);
    const raf2 = window.requestAnimationFrame(recalc);
    // Recalc again once fonts are ready (fixes mismatched widths on first load).
    (document as any).fonts?.ready?.then?.(recalc);
    const ro = new ResizeObserver(() => recalc());
    if (lifeRef.current) ro.observe(lifeRef.current);
    if (bottomRef.current) ro.observe(bottomRef.current);
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("resize", recalc);
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      ro.disconnect();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-white">
      <div className="relative grid min-h-[88vh] place-items-center overflow-hidden bg-dark px-5 pb-32 pt-28 text-white md:min-h-screen lg:px-8">
        <motion.div style={{ scale: shouldReduceMotion ? 1 : imageScale }} className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={image.src}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: activeImage === index ? 1 : 0,
                scale: activeImage === index && !shouldReduceMotion ? 1.06 : 1
              }}
              transition={{ duration: 1.35, ease: "easeInOut" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-dark/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-dark/20" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-dark/55 to-transparent" />

        <motion.div
          style={{ y: shouldReduceMotion ? 0 : lockupY }}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          className="relative z-10 mx-auto max-w-6xl text-center drop-shadow-[0_14px_38px_rgba(0,0,0,0.65)]"
        >
          <motion.h1 variants={fadeUp} className="flex flex-col items-center font-heading font-black uppercase leading-none text-white text-balance">
            <span className="w-fit whitespace-nowrap origin-center scale-x-[1.12] font-heading text-[clamp(2.5rem,5.56vw,5rem)] font-extrabold tracking-[-0.04em] text-white">
              Infusing
            </span>
            <span
              ref={lifeRef}
              className="w-fit whitespace-nowrap origin-center font-heading text-[clamp(9rem,20vw,19rem)] font-black leading-[0.78] tracking-[-0.02em] text-transparent [-webkit-text-stroke:3px_#fff] md:[-webkit-text-stroke:3px_#fff]"
              style={{ transform: `scaleX(${lifeScaleX})` }}
            >
              Life
            </span>
            <span ref={bottomRef} className="w-fit whitespace-nowrap origin-center scale-x-[1.08] font-heading text-[clamp(2.5rem,5.56vw,5rem)] font-extrabold tracking-[-0.04em] text-white [word-spacing:0.14em]">
              Into Sports
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-2xl text-lg font-semibold leading-8 text-white/82 md:text-2xl">
            Building sports communities for Kingdom impact through Christ-centered leadership.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/sportslife-leader" size="lg">Become a Leader</Button>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 gap-2" aria-hidden="true">
          {heroImages.slice(0, 5).map((image, index) => (
            <span key={image.src} className={cn("h-1.5 rounded-full transition-all duration-500", activeImage === index ? "w-9 bg-accent" : "w-2 bg-white/55")} />
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-6 grid max-w-7xl items-stretch gap-10 px-5 pb-16 md:grid-cols-3 lg:px-8">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className={cn(
              "flex aspect-square w-full flex-col justify-center rounded-none border bg-white p-[clamp(2.5rem,4vw,5rem)] text-center shadow-[0_18px_55px_rgba(17,17,17,0.18)] transition-shadow hover:shadow-premium",
              card.featured ? "border-white/30 bg-[#2f3e3d] text-white" : "border-black/5 text-dark"
            )}
          >
            <h2 className={cn("font-heading text-4xl font-black uppercase tracking-[0.09em]", card.featured ? "text-white" : "text-dark")}>
              {card.title}
            </h2>
            <div className={cn("mt-4", card.featured ? "text-white" : "text-dark")}>{card.body}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, light }: { eyebrow?: string; title: string; description?: string; light?: boolean }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} transition={{ duration: 0.7 }} className="mx-auto mb-14 max-w-3xl text-center">
      {eyebrow && <p className={cn("mb-4 text-sm font-extrabold uppercase tracking-[0.28em]", light ? "text-accent" : "text-primary")}>{eyebrow}</p>}
      <h2 className={cn("font-heading text-4xl font-black uppercase tracking-[-0.06em] text-balance md:text-6xl", light ? "text-white" : "text-dark")}>{title}</h2>
      {description && <p className={cn("mt-5 text-lg leading-8", light ? "text-white/70" : "text-text/75")}>{description}</p>}
    </motion.div>
  );
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} transition={{ duration: 0.7 }} className={className}>
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className={className}>
      {children}
    </motion.div>
  );
}

export function KineticMarquee({ items = ["Sports Leadership", "Christian Discipleship", "Global Impact", "Leadership Development"] }: { items?: string[] }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-dark/10 bg-white py-5">
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="font-heading text-4xl font-black uppercase tracking-[-0.07em] text-dark md:text-7xl">
            {item} <span className="text-primary">/</span>
          </span>
        ))}
      </motion.div>
      <span className="sr-only">{items.join(", ")}</span>
    </div>
  );
}

export function CinematicStoryScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const imageOne = useTransform(scrollYProgress, [0, 0.5, 1], [0, -90, -180]);
  const imageTwo = useTransform(scrollYProgress, [0, 0.5, 1], [130, 0, -80]);
  const imageThree = useTransform(scrollYProgress, [0, 0.6, 1], [220, 70, -40]);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const chapters = [
    {
      number: "01",
      title: "Sport creates the room",
      text: "A locker room, mat, gym, field, or court becomes a sacred place when a trusted leader brings the presence of Christ into everyday competition."
    },
    {
      number: "02",
      title: "Discipleship gives it direction",
      text: "Training, resources, and coaching turn influence into a repeatable pathway where leaders model Christ-like character and mentor others in Christ."
    },
    {
      number: "03",
      title: "Multiplication carries it globally",
      text: "Faithful leaders develop faithful leaders across nations, sports, and cultures until communities are transformed from the inside out."
    }
  ];

  return (
    <section ref={ref} className="relative bg-dark text-white lg:min-h-[260vh]">
      <div className="sticky top-0 min-h-screen overflow-hidden px-5 py-24 lg:px-8">
        <div className="premium-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(179,32,37,.28),transparent_32%)]" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow text-accent">The SportsLife Story</p>
            <h2 className="mt-5 font-heading text-5xl font-black uppercase leading-none tracking-[-0.08em] text-balance md:text-8xl">Discipleship in motion.</h2>
            <div className="mt-10 grid gap-8">
              {chapters.map((chapter, index) => {
                const start = index / chapters.length;
                const end = (index + 1) / chapters.length;
                const opacity = useTransform(scrollYProgress, [Math.max(0, start - 0.12), start + 0.05, end - 0.05, Math.min(1, end + 0.12)], [0.35, 1, 1, 0.35]);
                return (
                  <motion.div key={chapter.title} style={{ opacity: shouldReduceMotion ? 1 : opacity }} className="grid grid-cols-[48px_1fr] gap-5">
                    <span className="font-heading text-xl font-black text-primary">{chapter.number}</span>
                    <div>
                      <h3 className="font-heading text-2xl font-black uppercase tracking-[-0.05em]">{chapter.title}</h3>
                      <p className="mt-2 max-w-xl leading-8 text-white/65">{chapter.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="relative min-h-[620px]">
            <motion.div style={{ y: shouldReduceMotion ? 0 : imageOne }} className="absolute left-0 top-12 h-[420px] w-[62%] overflow-hidden rounded-[2rem] shadow-premium">
              <Image src={images.huddle} alt="Sports team huddle" fill sizes="50vw" className="object-cover" />
            </motion.div>
            <motion.div style={{ y: shouldReduceMotion ? 0 : imageTwo }} className="absolute right-0 top-32 h-[380px] w-[58%] overflow-hidden rounded-[2rem] border border-white/20 shadow-premium">
              <Image src={images.prayer} alt="Athletes praying together" fill sizes="50vw" className="object-cover" />
            </motion.div>
            <motion.div style={{ y: shouldReduceMotion ? 0 : imageThree }} className="absolute bottom-0 left-[18%] h-[310px] w-[58%] overflow-hidden rounded-[2rem] border border-white/20 shadow-premium">
              <Image src={images.global} alt="Global ministry outreach" fill sizes="50vw" className="object-cover" />
            </motion.div>
            <div className="absolute right-5 top-8 h-[78%] w-px bg-white/15">
              <motion.span style={{ height: shouldReduceMotion ? "100%" : progressHeight }} className="absolute left-0 top-0 w-px bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ImmersiveImpactGlobe() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.05, 0.96]);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#050505] p-6 text-white shadow-premium md:p-10">
      <div className="premium-grid absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(179,32,37,.28),transparent_35%)]" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <motion.div style={{ rotate: shouldReduceMotion ? 0 : rotate, scale: shouldReduceMotion ? 1 : scale }} className="relative mx-auto aspect-square w-full max-w-[680px] rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(245,194,66,.22),rgba(179,32,37,.16)_28%,rgba(255,255,255,.04)_45%,rgba(255,255,255,.02)_65%,transparent_66%)]">
          <div className="absolute inset-[9%] rounded-full border border-white/10" />
          <div className="absolute inset-[20%] rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-[8%] h-[84%] w-px -translate-x-1/2 rounded-full bg-white/10" />
          <div className="absolute left-[8%] top-1/2 h-px w-[84%] -translate-y-1/2 rounded-full bg-white/10" />
          {mapPins.map((pin, index) => (
            <div key={pin.label} className="absolute" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
              <span className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-primary/40 animate-pulseRing" />
              <span className="relative grid h-5 w-5 rounded-full bg-accent shadow-glow" />
              <span className="absolute left-6 top-0 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur">{pin.label}</span>
            </div>
          ))}
        </motion.div>
        <div>
          <p className="eyebrow text-accent">World Impact</p>
          <h3 className="mt-5 font-heading text-5xl font-black uppercase leading-none tracking-[-0.08em] md:text-7xl">A movement mapped by relationships.</h3>
          <p className="mt-6 text-lg leading-9 text-white/65">SportsLife’s impact is not just a pin on a map. It is a coach discipling a team, a country leader forming a network, and a resource reaching a leader at exactly the right moment.</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                <p className="font-heading text-4xl font-black tracking-[-0.07em] text-white">{stat.value}{stat.suffix}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/45">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PremiumCTA({ title, eyebrow, text, image, href, label }: { title: string; eyebrow: string; text: string; image: string; href: string; label: string }) {
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  return (
    <section className="px-5 py-8 lg:px-8">
      <div
        className="spotlight relative mx-auto min-h-[620px] max-w-7xl overflow-hidden rounded-[3rem] border border-white/10 bg-dark p-8 text-white shadow-premium md:p-14"
        style={{ "--x": position.x, "--y": position.y } as CSSProperties}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setPosition({ x: `${event.clientX - rect.left}px`, y: `${event.clientY - rect.top}px` });
        }}
      >
        <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent" />
        <div className="premium-grid absolute inset-0" />
        <div className="relative z-10 flex min-h-[500px] max-w-4xl flex-col justify-end">
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h2 className="mt-5 font-heading text-6xl font-black uppercase leading-none tracking-[-0.09em] text-balance md:text-8xl">{title}</h2>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-white/72">{text}</p>
          <Button href={href} className="mt-8 w-fit" size="lg">{label}</Button>
        </div>
      </div>
    </section>
  );
}

export function EditorialMetricPanels() {
  return (
    <Stagger className="grid gap-4 md:grid-cols-4">
      {impactStats.map((stat, index) => (
        <motion.div key={stat.label} variants={fadeUp} className={cn("magnetic-card rounded-[2rem] p-6 shadow-sm", index === 0 ? "bg-primary text-white md:col-span-2" : "bg-white text-dark")}>
          <p className="font-heading text-6xl font-black tracking-[-0.09em] md:text-8xl">{stat.value}{stat.suffix}</p>
          <p className={cn("mt-3 text-xs font-black uppercase tracking-[0.24em]", index === 0 ? "text-white/68" : "text-text/55")}>{stat.label}</p>
        </motion.div>
      ))}
    </Stagger>
  );
}

export function AnimatedCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div>
      <span ref={ref} className="font-heading text-5xl font-black tracking-[-0.06em] text-dark md:text-6xl">{display}{suffix}</span>
      <p className="mt-2 text-sm font-bold uppercase tracking-[0.22em] text-text/55">{label}</p>
    </div>
  );
}

export function ImpactCard({ title, description, icon, dark = false }: { title: string; description: string; icon: string | LucideIcon; dark?: boolean }) {
  const Icon = resolveIcon(icon);
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -10, scale: 1.01 }} className={cn("group rounded-[2rem] border p-8 shadow-sm transition", dark ? "border-white/10 bg-white/[0.06] text-white" : "border-border bg-white text-dark")}>
      <span className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white transition group-hover:rotate-6 group-hover:bg-accent group-hover:text-dark">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="font-heading text-2xl font-black uppercase tracking-[-0.04em]">{title}</h3>
      <p className={cn("mt-4 leading-8", dark ? "text-white/68" : "text-text/70")}>{description}</p>
    </motion.div>
  );
}

export function StoryCard({ story, featured = false }: { story: (typeof stories)[number]; featured?: boolean }) {
  return (
    <motion.article variants={fadeUp} whileHover={{ y: -8 }} className={cn("group overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:shadow-premium", featured && "grid lg:grid-cols-2")}>
      <Link href={`/news/${story.slug}`} className="relative block min-h-[280px] overflow-hidden">
        <Image src={story.image} alt={story.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
        <span className="absolute left-6 top-6 rounded-full bg-primary px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-white">{story.category}</span>
      </Link>
      <div className="p-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-text/45">{formatDate(story.date)}</p>
        <h3 className="mt-4 font-heading text-3xl font-black uppercase tracking-[-0.06em] text-dark">{story.title}</h3>
        <p className="mt-4 leading-8 text-text/70">{story.excerpt}</p>
        <Link href={`/news/${story.slug}`} className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-[0.18em] text-primary">
          Read Story <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export function NewsTallCard({ story }: { story: (typeof stories)[number] }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[1.8rem] bg-white shadow-sm transition hover:shadow-premium"
    >
      <Link href={`/news/${story.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
      </Link>
      <div className="p-8 md:p-10">
        <h3 className="font-heading text-3xl font-black tracking-[-0.03em] text-dark md:text-4xl">
          {story.title}
        </h3>
        <Link
          href={`/news/${story.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.02em] text-[#b08a3a]"
        >
          Read Full Article <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export function LeadershipCard({ leader }: { leader: (typeof leaders)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button variants={fadeUp} whileHover={{ y: -8 }} onClick={() => setOpen(true)} className="group overflow-hidden rounded-[2rem] bg-white text-left shadow-sm transition hover:shadow-premium">
        <div className="relative h-80 overflow-hidden">
          <Image src={leader.image} alt={leader.name} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
          <span className="absolute bottom-5 left-5 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur">{leader.category}</span>
        </div>
        <div className="p-6">
          <h3 className="font-heading text-2xl font-black uppercase tracking-[-0.05em] text-dark">{leader.name}</h3>
          <p className="mt-2 text-primary">{leader.role}</p>
        </div>
      </motion.button>
      {open && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-dark/80 p-5 backdrop-blur" onClick={() => setOpen(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl rounded-[2rem] bg-white p-8 shadow-premium" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-dark text-white"><X className="h-5 w-5" /></button>
            <h3 className="mt-2 font-heading text-4xl font-black uppercase tracking-[-0.06em] text-dark">{leader.name}</h3>
            <p className="mt-2 text-primary">{leader.role}</p>
            <p className="mt-6 text-lg leading-9 text-text/75">{leader.bio}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${leader.email}`}><Mail className="mr-2 h-4 w-4" /> Email</Button>
              <Button href={leader.linkedin} variant="dark"><ExternalLink className="mr-2 h-4 w-4" /> LinkedIn</Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export function ProgramCard({ program }: { program: (typeof programs)[number] }) {
  const Icon = resolveIcon(program.icon as IconKey);
  return (
    <motion.article variants={fadeUp} whileHover={{ y: -10 }} className="group relative min-h-[460px] overflow-hidden rounded-[2.2rem] bg-dark p-8 text-white shadow-sm">
      <Image src={program.image} alt={program.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-55 transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-end">
        <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary"><Icon /></span>
        <h3 className="font-heading text-3xl font-black uppercase tracking-[-0.06em]">{program.title}</h3>
        <p className="mt-4 leading-8 text-white/75">{program.description}</p>
        <Link href="/sportslife-leader" className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-[0.18em] text-accent">
          Learn More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export function ResourceCard({ resource }: { resource: (typeof resources)[number] }) {
  return (
    <motion.div whileHover={{ rotateX: 4, rotateY: -5, y: -8 }} className="min-w-0 rounded-[2rem] bg-white p-4 shadow-sm">
      <div className="relative h-80 overflow-hidden rounded-[1.5rem]">
        <Image src={resource.image} alt={resource.title} fill sizes="320px" className="object-cover" />
      </div>
      <div className="p-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">{resource.type}</p>
        <h3 className="mt-3 font-heading text-2xl font-black uppercase tracking-[-0.05em] text-dark">{resource.title}</h3>
        <p className="mt-3 leading-7 text-text/70">{resource.description}</p>
      </div>
    </motion.div>
  );
}

export function ResourceCarousel() {
  const [emblaRef] = useEmblaCarousel({ align: "start", loop: true });
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {resources.map((resource) => (
          <div key={resource.title} className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_48%] lg:flex-[0_0_25%]">
            <ResourceCard resource={resource} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <motion.figure variants={fadeUp} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-white">
      <blockquote className="text-2xl font-semibold leading-10">“{testimonial.quote}”</blockquote>
      <figcaption className="mt-8 text-white/60">{testimonial.name} · {testimonial.role}</figcaption>
    </motion.figure>
  );
}

export function MapSection({ dark = false }: { dark?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2.5rem] p-8", dark ? "bg-white/[0.06]" : "bg-white shadow-sm")}>
      <div className="relative mx-auto aspect-[1.8/1] max-w-5xl rounded-[2rem] bg-gradient-to-br from-[#18212b] to-[#05080c]">
        <div className="absolute inset-8 rounded-[48%] border border-white/10" />
        <div className="absolute inset-x-[12%] top-[22%] h-[42%] rounded-[50%] border border-white/10" />
        <div className="absolute inset-y-[16%] left-[44%] w-[18%] rounded-[50%] border border-white/10" />
        {mapPins.map((pin) => (
          <div key={pin.label} className="absolute" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
            <span className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-primary/50 animate-pulseRing" />
            <span className="relative grid h-4 w-4 place-items-center rounded-full bg-accent shadow-glow" />
            <span className="absolute left-5 top-1 rounded-full bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-dark">{pin.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DonateCard({ option, selected, onSelect }: { option: (typeof donationOptions)[number]; selected?: boolean; onSelect?: () => void }) {
  return (
    <motion.button whileHover={{ y: -6 }} onClick={onSelect} className={cn("rounded-[2rem] border p-6 text-left transition", selected ? "border-primary bg-primary text-white shadow-glow" : "border-border bg-white text-dark hover:border-primary")}>
      <span className="font-heading text-4xl font-black">${option.amount}</span>
      <p className={cn("mt-4 leading-7", selected ? "text-white/80" : "text-text/70")}>{option.impact}</p>
    </motion.button>
  );
}

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const { register, handleSubmit, reset } = useForm<{ email: string }>();
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(() => {
        setSent(true);
        reset();
      })}
      className={cn("mt-6 flex gap-3", compact ? "flex-col" : "mx-auto max-w-xl flex-col sm:flex-row")}
    >
      <input {...register("email", { required: true })} type="email" placeholder="Email address" className="h-14 flex-1 rounded-full border border-white/15 bg-white px-5 text-dark outline-none ring-primary transition focus:ring-2" />
      <Button type="submit" variant={compact ? "secondary" : "primary"}>{sent ? "You're In" : "Sign Up"}</Button>
    </form>
  );
}

export function ContactForm() {
  const { register, handleSubmit, reset } = useForm<{ name: string; email: string; message: string }>();
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(() => {
        setSent(true);
        reset();
      })}
      className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-5">
        <input {...register("name", { required: true })} placeholder="Your name" className="h-14 rounded-2xl border border-border px-5 outline-none focus:border-primary" />
        <input {...register("email", { required: true })} type="email" placeholder="Email address" className="h-14 rounded-2xl border border-border px-5 outline-none focus:border-primary" />
        <textarea {...register("message", { required: true })} placeholder="How can we help?" rows={6} className="rounded-2xl border border-border p-5 outline-none focus:border-primary" />
        <Button type="submit">{sent ? "Message Sent" : "Send Message"}</Button>
      </div>
    </form>
  );
}

export function AnimatedTimeline({ items = timeline }: { items?: typeof timeline }) {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute left-5 top-0 h-full w-px bg-primary/25 md:left-1/2" />
      <div className="grid gap-8">
        {items.map((item, index) => (
          <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={cn("relative grid gap-4 md:grid-cols-2", index % 2 && "md:[&>div]:col-start-2")}>
            <span className="absolute left-[13px] top-7 h-4 w-4 rounded-full bg-primary md:left-[calc(50%-8px)]" />
            <div className="ml-12 rounded-[2rem] bg-white p-8 shadow-sm md:ml-0">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-primary">{item.year}</p>
              <h3 className="mt-3 font-heading text-3xl font-black uppercase tracking-[-0.05em] text-dark">{item.title}</h3>
              <p className="mt-4 leading-8 text-text/70">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const image = element.querySelector("img");
    if (!image) return;
    const trigger = gsap.to(image, {
      scale: 1.08,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <motion.div ref={ref} style={{ y }} className={cn("relative overflow-hidden rounded-[2rem]", className)}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
    </motion.div>
  );
}

export function StatsGrid({ dark = false }: { dark?: boolean }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {impactStats.map((stat) => (
        <div key={stat.label} className={cn("rounded-[2rem] p-7", dark ? "bg-white/[0.06]" : "bg-white shadow-sm")}>
          <AnimatedCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
        </div>
      ))}
    </div>
  );
}

export function SearchableNews() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(stories.map((story) => story.category)))], []);
  const filtered = stories.filter((story) => (category === "All" || story.category === category) && story.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-[2rem] bg-white p-4 shadow-sm md:grid-cols-[1fr_auto]">
        <label className="flex h-14 items-center gap-3 rounded-full bg-background px-5">
          <Search className="h-5 w-5 text-primary" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories" className="flex-1 bg-transparent outline-none" />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={cn("rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em]", category === item ? "bg-primary text-white" : "bg-background text-text")}>{item}</button>
          ))}
        </div>
      </div>
      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.concat(filtered.slice(0, 2)).map((story, index) => <StoryCard key={`${story.slug}-${index}`} story={story} />)}
      </Stagger>
    </div>
  );
}

export function ImpactCalculator() {
  const [amount, setAmount] = useState(100);
  const leaders = Math.max(1, Math.round(amount / 25));
  return (
    <div className="rounded-[2.5rem] bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {donationOptions.map((option) => <DonateCard key={option.amount} option={option} selected={amount === option.amount} onSelect={() => setAmount(option.amount)} />)}
      </div>
      <div className="mt-8 grid gap-6 rounded-[2rem] bg-background p-6 lg:grid-cols-[1fr_1.2fr]">
        <label>
          <span className="mb-3 block text-sm font-extrabold uppercase tracking-[0.2em] text-primary">Custom gift</span>
          <input type="number" value={amount} min={1} onChange={(event) => setAmount(Number(event.target.value))} className="h-16 w-full rounded-2xl border border-border px-5 text-2xl font-bold outline-none focus:border-primary" />
        </label>
        <div className="rounded-[1.5rem] bg-dark p-6 text-white">
          <p className="text-white/65">Estimated demonstration impact</p>
          <p className="mt-2 font-heading text-4xl font-black uppercase tracking-[-0.06em]">{leaders} leaders resourced</p>
          <p className="mt-3 text-white/65">Every gift represents training, resources, programs, and relationships moving into sports communities.</p>
        </div>
      </div>
    </div>
  );
}

export function VideoFeature({ image = images.huddle, title = "Watch discipleship in motion" }: { image?: string; title?: string }) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-dark">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-55" />
      <div className="relative z-10 grid min-h-[440px] place-items-center p-8 text-center text-white">
        <button className="mb-8 grid h-20 w-20 place-items-center rounded-full bg-white text-primary transition hover:scale-105">
          <Play className="ml-1 h-8 w-8 fill-primary" />
        </button>
        <h3 className="max-w-3xl font-heading text-5xl font-black uppercase tracking-[-0.06em] text-balance">{title}</h3>
      </div>
    </div>
  );
}

export function ContactCards() {
  return (
    <div className="grid gap-4">
      {contactCards.map((card) => {
        const Icon = resolveIcon(card.icon as IconKey);
        return (
          <div key={card.title} className="rounded-[2rem] bg-white p-6 shadow-sm">
            <Icon className="mb-5 h-7 w-7 text-primary" />
            <h3 className="font-heading text-xl font-black uppercase tracking-[-0.04em] text-dark">{card.title}</h3>
            <p className="mt-2 text-text/70">{card.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export function FAQList() {
  return (
    <div className="grid gap-4">
      {faqs.map((faq) => (
        <details key={faq.question} className="group rounded-[1.5rem] bg-white p-6 shadow-sm">
          <summary className="cursor-pointer font-heading text-xl font-black uppercase tracking-[-0.04em] text-dark">{faq.question}</summary>
          <p className="mt-4 leading-8 text-text/70">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ExternalLinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-[0.18em] text-primary">
      {children} <ExternalLink className="h-4 w-4" />
    </Link>
  );
}
