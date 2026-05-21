import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import { ProductPlaceholder } from "@/components/ProductPlaceholder";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cove Studio | Cart" },
      { name: "description", content: "Review the items in your Cove Studio cart." },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, remove, setQty } = useCart();
  const [promo, setPromo] = useState("");
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 6;

  if (items.length === 0) {
    return (
      <div className="container-cove py-24 fade-in">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-muted text-muted-foreground">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-3xl">Your cart is empty.</h1>
          <p className="mt-2 text-muted-foreground">A little space is a good thing. When you're ready —</p>
          <Link to="/shop" className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">Browse Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-cove py-12 md:py-16 fade-in">
      <h1 className="font-display text-4xl md:text-5xl">Cart</h1>
      <p className="mt-2 text-muted-foreground">{items.length} {items.length === 1 ? "item" : "items"}</p>

      <div className="mt-10 grid lg:grid-cols-3 gap-10">
        <ul className="lg:col-span-2 divide-y divide-border border-y border-border">
          {items.map((item) => {
            const p = getProduct(item.slug);
            return (
              <li key={item.id} className="flex gap-4 py-6">
                <div className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {p && <ProductPlaceholder product={p} className="h-full w-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link to="/products/$slug" params={{ slug: item.slug }} className="font-medium hover:text-primary">{item.name}</Link>
                      {item.variant && <p className="mt-0.5 text-sm text-muted-foreground">{item.variant}</p>}
                    </div>
                    <p className="text-sm tabular-nums">{formatPrice(item.price * item.qty)}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-lg border border-border">
                      <button onClick={() => setQty(item.id, item.qty - 1)} aria-label="Decrease" className="p-2 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-sm tabular-nums">{item.qty}</span>
                      <button onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase" className="p-2 hover:bg-muted"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => remove(item.id)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                      <X className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-surface p-6 sticky top-24">
            <h2 className="font-display text-xl">Summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">Add {formatPrice(75 - subtotal)} more for free shipping.</p>
              )}
              <div className="border-t border-border pt-3 flex justify-between text-base font-medium">
                <dt>Total</dt><dd className="tabular-nums">{formatPrice(subtotal + shipping)}</dd>
              </div>
            </dl>

            <form
              onSubmit={(e) => { e.preventDefault(); if (!promo) return; toast.success("Promo applied", { description: "Demo store — no real discount." }); }}
              className="mt-6 flex gap-2"
            >
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code"
                className="flex-1 min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted">Apply</button>
            </form>

            <button
              disabled
              title="Demo store"
              className="mt-6 w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground opacity-80 cursor-not-allowed"
            >
              Checkout (Demo)
            </button>
            <Link to="/shop" className="mt-3 block text-center text-sm text-primary hover:underline">Continue shopping</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
