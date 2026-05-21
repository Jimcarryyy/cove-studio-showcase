import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, RotateCcw, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import hero from "@/assets/hero.jpg";
import catDesk from "@/assets/cat-desk.jpg";
import catHome from "@/assets/cat-home.jpg";
import catCarry from "@/assets/cat-carry.jpg";
import { bestsellers, newArrivals } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cove Studio | Essentials, refined." },
      { name: "description", content: "Curated minimalist essentials for desk, home, and carry. Shop quality goods with free shipping over $75." },
      { property: "og:title", content: "Cove Studio | Essentials, refined." },
      { property: "og:description", content: "Curated minimalist essentials for desk, home, and carry." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="fade-in">
      <Hero />
      <FeaturedCategories />
      <Section title="Best sellers" eyebrow="Loved by the community" link={{ to: "/shop", label: "Shop all" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {bestsellers().map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>
      <BrandStory />
      <Section title="New arrivals" eyebrow="Just landed" link={{ to: "/shop", label: "View all" }}>
        <div className="md:grid md:grid-cols-4 md:gap-5 flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 md:overflow-visible pb-2 md:pb-0">
          {newArrivals().map((p) => (
            <div key={p.id} className="min-w-[70%] md:min-w-0 snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </Section>
      <TrustRow />
      <Newsletter />
    </div>
  );
}

function Hero() {
  return (
    <section className="container-cove pt-8 md:pt-16">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-5 md:order-1 order-2">
          <p className="label-caps text-muted-foreground">Cove Studio · New season</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            Essentials,<br />refined.
          </h1>
          <p className="mt-6 text-base text-muted-foreground max-w-md leading-relaxed">
            Curated goods for a calmer desk, home, and daily carry.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
              Shop Collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/collections/$slug" params={{ slug: "desk" }} className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-muted transition">
              Explore Desk
            </Link>
          </div>
        </div>
        <div className="md:col-span-7 md:order-2 order-1">
          <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-2xl">
            <img src={hero} alt="A sage linen desk mat with a white ceramic mug and stoneware vase in soft daylight" width={1600} height={1200} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCategories() {
  const cats = [
    { slug: "desk" as const, label: "Desk", img: catDesk, copy: "A calmer surface" },
    { slug: "home" as const, label: "Home", img: catHome, copy: "Everyday rituals" },
    { slug: "carry" as const, label: "Carry", img: catCarry, copy: "The few things you need" },
  ];
  return (
    <section className="container-cove mt-24">
      <div className="grid md:grid-cols-3 gap-5">
        {cats.map((c) => (
          <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className="group relative block overflow-hidden rounded-xl">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={c.img} alt={`${c.label} collection`} loading="lazy" width={1000} height={1200} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/40 to-transparent text-primary-foreground">
              <p className="label-caps opacity-80">{c.copy}</p>
              <p className="font-display text-2xl mt-1">{c.label} →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Section({ title, eyebrow, link, children }: { title: string; eyebrow?: string; link?: { to: string; label: string }; children: React.ReactNode }) {
  return (
    <section className="container-cove mt-24">
      <div className="flex items-end justify-between mb-8">
        <div>
          {eyebrow && <p className="label-caps text-muted-foreground">{eyebrow}</p>}
          <h2 className="font-display text-3xl md:text-4xl mt-2">{title}</h2>
        </div>
        {link && (
          <Link to={link.to as "/shop"} className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            {link.label} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function BrandStory() {
  return (
    <section className="container-cove mt-24">
      <div className="rounded-2xl bg-primary text-primary-foreground p-10 md:p-16 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8">
          <p className="label-caps opacity-70">Our approach</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl leading-tight">
            We source fewer, better things — designed to last and fit quietly into your space.
          </h2>
        </div>
        <div className="md:col-span-4 md:text-right">
          <Link to="/about" className="inline-flex items-center gap-2 rounded-lg bg-surface text-foreground px-5 py-3 text-sm font-medium hover:opacity-90">
            Our Story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrustRow() {
  const items = [
    { icon: Truck, title: "Free shipping $75+", copy: "Ships in 1–2 business days." },
    { icon: RotateCcw, title: "30-day returns", copy: "Easy returns, no questions." },
    { icon: ShieldCheck, title: "Secure checkout", copy: "Encrypted and protected." },
  ];
  return (
    <section className="container-cove mt-24">
      <div className="grid md:grid-cols-3 gap-6 rounded-2xl border border-border bg-surface p-8 md:p-12">
        {items.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-muted text-primary shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="container-cove mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="label-caps text-muted-foreground">Newsletter</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">Stay in the loop</h2>
        <form
          onSubmit={(e) => { e.preventDefault(); if (!email) return; toast.success("You're subscribed"); setEmail(""); }}
          className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
