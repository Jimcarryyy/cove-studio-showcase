import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products, collections, type Collection } from "@/lib/products";

type Sort = "featured" | "price-asc" | "newest";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Cove Studio | Shop" },
      { name: "description", content: "Browse all Cove Studio essentials — desk, home, and carry. Minimal, quality goods designed to last." },
      { property: "og:title", content: "Cove Studio | Shop" },
      { property: "og:description", content: "Browse all Cove Studio essentials — desk, home, and carry." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [cat, setCat] = useState<Collection | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    let l = products.slice();
    if (cat !== "all") l = l.filter((p) => p.collection === cat);
    if (sort === "price-asc") l.sort((a, b) => a.price - b.price);
    if (sort === "newest") l.sort((a, b) => (a.badge === "New" ? -1 : 1));
    return l;
  }, [cat, sort]);

  return (
    <div className="container-cove py-12 md:py-16 fade-in">
      <header className="mb-10">
        <p className="label-caps text-muted-foreground">Shop</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">All products</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">Twelve quietly considered objects for your desk, home, and daily carry.</p>
      </header>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-y border-border py-4 mb-10">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={cat === "all"} onClick={() => setCat("all")}>All</FilterChip>
          {collections.map((c) => (
            <FilterChip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>{c.title}</FilterChip>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-2xl">Nothing here yet.</p>
          <p className="mt-2 text-muted-foreground">Try a different filter or browse everything.</p>
          <Link to="/shop" className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">Reset</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm border transition ${
        active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
