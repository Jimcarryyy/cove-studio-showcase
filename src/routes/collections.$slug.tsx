import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { byCollection, collections, type Collection } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import catDesk from "@/assets/cat-desk.jpg";
import catHome from "@/assets/cat-home.jpg";
import catCarry from "@/assets/cat-carry.jpg";

const IMAGES: Record<Collection, string> = { desk: catDesk, home: catHome, carry: catCarry };

export const Route = createFileRoute("/collections/$slug")({
  beforeLoad: ({ params }) => {
    const meta = collections.find((c) => c.slug === params.slug);
    if (!meta) throw notFound();
  },
  head: ({ params }) => {
    const meta = collections.find((c) => c.slug === params.slug);
    const title = meta ? `Cove Studio | ${meta.title}` : "Cove Studio | Collection";
    const desc = meta?.tagline ?? "Shop the collection.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/collections/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/collections/${params.slug}` }],
    };
  },
  component: CollectionPage,
  notFoundComponent: () => (
    <div className="container-cove py-24 text-center">
      <h1 className="font-display text-3xl">Collection not found</h1>
      <Link to="/shop" className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm text-primary-foreground">Shop all</Link>
    </div>
  ),
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const meta = collections.find((c) => c.slug === slug)!;
  const list = byCollection(slug as Collection);
  const img = IMAGES[slug as Collection];

  return (
    <div className="fade-in">
      <section className="container-cove pt-8 md:pt-12">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-5">
            <nav className="label-caps text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link> · <Link to="/shop" className="hover:text-foreground">Shop</Link> · <span className="text-foreground">{meta.title}</span>
            </nav>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">{meta.title}</h1>
            <p className="mt-4 text-muted-foreground max-w-md">{meta.tagline}</p>
          </div>
          <div className="md:col-span-7">
            <div className="aspect-[16/9] overflow-hidden rounded-2xl">
              <img src={img} alt={`${meta.title} collection`} loading="lazy" width={1200} height={675} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      <section className="container-cove mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
