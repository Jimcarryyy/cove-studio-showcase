import type { Product } from "@/lib/products";

/**
 * Editorial product placeholder — soft tinted background, product silhouette
 * suggested by a centered object name. Keeps a consistent neutral feel.
 */
export function ProductPlaceholder({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 40%, ${product.tone}E6 0%, ${product.tone}AA 55%, ${product.tone}66 100%)`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full"
          style={{
            width: "55%",
            paddingBottom: "55%",
            background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), ${product.tone} 65%, rgba(0,0,0,0.08) 100%)`,
            boxShadow: "0 24px 48px -24px rgba(0,0,0,0.25)",
          }}
        />
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-medium">
        Cove · {product.name}
      </div>
    </div>
  );
}
