import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Cove Studio | About" },
      { name: "description", content: "We make fewer, better things. Read the story behind Cove Studio." },
      { property: "og:title", content: "Cove Studio | About" },
      { property: "og:description", content: "We make fewer, better things." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="fade-in">
      <section className="container-cove pt-10 md:pt-16">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <p className="label-caps text-muted-foreground">Our story</p>
            <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05]">Fewer things.<br />Better made.</h1>
          </div>
          <div className="md:col-span-7">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl">
              <img src={aboutImg} alt="Two stoneware mugs on linen" loading="lazy" width={1400} height={900} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-cove mt-16 max-w-2xl">
        <div className="space-y-6 text-foreground/85 leading-relaxed">
          <p>Cove Studio started with a small frustration: too many objects, not enough that we wanted to keep. We wanted a shop that didn't try to sell us everything — just a few honest things, chosen carefully.</p>
          <p>So we built one. Each product is sampled, used, and used some more before it goes on the site. If we wouldn't keep it on our own desk, it doesn't make the cut.</p>
          <p>We work with small manufacturers who care about materials and finish. We're not a sustainability brand — we just try to make decisions we won't regret in five years.</p>
        </div>
      </section>

      <section className="container-cove mt-20">
        <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 grid sm:grid-cols-3 gap-8 text-center">
          {[
            { n: "12", l: "curated products" },
            { n: "3", l: "collections" },
            { n: "1", l: "calm shopping experience" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-4xl md:text-5xl">{s.n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-cove mt-20">
        <p className="label-caps text-muted-foreground">Founders</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">The team</h2>
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          {[
            { name: "Mara Lindqvist", role: "Co-founder · Buying", bio: "Former product designer. Believes a desk should help you think." },
            { name: "Theo Nakamura", role: "Co-founder · Operations", bio: "Spent a decade in small-batch manufacturing. Has opinions on linen." },
          ].map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-surface p-6 flex gap-4 items-center">
              <div className="h-16 w-16 shrink-0 rounded-full grid place-items-center bg-muted text-muted-foreground font-display text-xl">
                {p.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.role}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/shop" className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
            Shop the collection
          </Link>
        </div>
      </section>
    </div>
  );
}
