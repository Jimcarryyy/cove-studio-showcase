import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/collections/desk", label: "Desk" },
  { to: "/collections/home", label: "Home" },
  { to: "/collections/carry", label: "Carry" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const { count, bump } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (bump > 0) setAnimKey((k) => k + 1);
  }, [bump]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur border-b border-border" : "bg-background"
      }`}
    >
      <div className="container-cove flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-lg font-medium tracking-tight">
          Cove Studio
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button aria-label="Search" className="p-2 hover:text-primary transition-colors">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button aria-label="Account" className="hidden sm:inline-flex p-2 hover:text-primary transition-colors">
            <User className="h-[18px] w-[18px]" />
          </button>
          <Link to="/cart" aria-label={`Cart, ${count} items`} className="relative p-2 hover:text-primary transition-colors">
            <span key={animKey} className={animKey ? "inline-block cart-bump" : "inline-block"}>
              <ShoppingBag className="h-[18px] w-[18px]" />
            </span>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Menu"
            className="md:hidden p-2"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-[20px] w-[20px]" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-background animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="container-cove flex h-16 items-center justify-between">
            <span className="font-display text-lg font-medium">Cove Studio</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="container-cove mt-8 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-5 text-2xl font-display"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/cart" onClick={() => setOpen(false)} className="border-b border-border py-5 text-2xl font-display">
              Cart {count > 0 && <span className="text-muted-foreground text-base">({count})</span>}
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="border-b border-border py-5 text-2xl font-display">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
