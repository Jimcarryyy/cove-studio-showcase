import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductPlaceholder } from "./ProductPlaceholder";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      variant: product.colors?.[0]?.name,
    });
    toast.success("Added to cart", { description: product.name });
  };

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
        <ProductPlaceholder
          product={product}
          className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 label-caps rounded-full px-2.5 py-1 ${
              product.badge === "New"
                ? "bg-surface text-foreground"
                : "bg-sale text-sale-foreground"
            }`}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={quickAdd}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 hidden md:flex items-center gap-1.5 rounded-full bg-surface/95 backdrop-blur px-3.5 py-2 text-xs font-medium text-foreground opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary hover:text-primary-foreground shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
        <span className="text-sm text-muted-foreground tabular-nums">{formatPrice(product.price)}</span>
      </div>
      {product.colors && product.colors.length > 1 && (
        <div className="mt-1.5 flex gap-1">
          {product.colors.map((c) => (
            <span
              key={c.name}
              className="h-2.5 w-2.5 rounded-full border border-border/60"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      )}
    </Link>
  );
}
