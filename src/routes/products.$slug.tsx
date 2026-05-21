import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { byCollection, collections, formatPrice, getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductPlaceholder } from "@/components/ProductPlaceholder";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/products/$slug")({
  beforeLoad: ({ params }) => {
    if (!getProduct(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const p = getProduct(params.slug);
    const title = p ? `Cove Studio | ${p.name}` : "Cove Studio | Product";
    const desc = p?.description ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-cove py-24 text-center">
      <h1 className="font-display text-3xl">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm text-primary-foreground">Shop all</Link>
    </div>
  ),
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug)!;
  const collectionMeta = collections.find((c) => c.slug === product.collection)!;
  const related = byCollection(product.collection).filter((p) => p.id !== product.id).slice(0, 4);

  const [variant, setVariant] = useState(product.colors?.[0]?.name);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  const onAdd = () => {
    add({ productId: product.id, slug: product.slug, name: product.name, price: product.price, variant, qty });
    toast.success("Added to cart", { description: `${product.name}${variant ? ` · ${variant}` : ""}` });
  };

  return (
    <div className="fade-in">
      <div className="container-cove pt-6">
        <nav className="label-caps text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> · <Link to="/shop" className="hover:text-foreground">Shop</Link> · <Link to="/collections/$slug" params={{ slug: product.collection }} className="hover:text-foreground">{collectionMeta.title}</Link> · <span className="text-foreground">{product.name}</span>
        </nav>
      </div>
      <section className="container-cove mt-6 grid md:grid-cols-2 gap-10 md:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl">
            <ProductPlaceholder product={product} className="h-full w-full" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button key={i} className="aspect-square overflow-hidden rounded-lg border border-border hover:border-primary transition">
                <ProductPlaceholder product={product} className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>
        {/* Info */}
        <div className="md:pt-4">
          <p className="label-caps text-muted-foreground">{collectionMeta.title}</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl leading-tight">{product.name}</h1>
          <p className="mt-3 text-xl text-foreground tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

          {product.colors && (
            <div className="mt-8">
              <p className="label-caps text-muted-foreground mb-3">Color · <span className="text-foreground">{variant}</span></p>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setVariant(c.name)}
                    aria-label={c.name}
                    className={`h-9 w-9 rounded-full border-2 transition ${variant === c.name ? "border-primary" : "border-border"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="inline-flex items-center rounded-lg border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="p-3 hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
              <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="p-3 hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
            </div>
            <button onClick={onAdd} className="flex-1 rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
              Add to Cart · {formatPrice(product.price * qty)}
            </button>
          </div>
          <a href="#details" className="mt-4 inline-block text-sm text-primary hover:underline">View details ↓</a>

          <div id="details" className="mt-10 border-t border-border">
            <Accordion title="Details" defaultOpen>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {product.details.map((d) => <li key={d}>· {d}</li>)}
              </ul>
            </Accordion>
            <Accordion title="Shipping & Returns">
              <p className="text-sm text-muted-foreground">Free shipping on orders over $75. Otherwise, flat $6. Ships in 1–2 business days. Easy 30-day returns on unused items.</p>
            </Accordion>
            <Accordion title="Care Instructions">
              <p className="text-sm text-muted-foreground">{product.care}</p>
            </Accordion>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-cove mt-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl md:text-3xl">You may also like</h2>
            <Link to="/collections/$slug" params={{ slug: product.collection }} className="text-sm text-primary hover:underline">More from {collectionMeta.title} →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-4 text-left">
        <span className="text-sm font-medium">{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}

// Silence unused import in some tooling
void products;
