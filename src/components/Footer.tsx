import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="container-cove py-16 grid gap-12 md:grid-cols-4">
        <div>
          <h4 className="label-caps text-muted-foreground mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-primary">All products</Link></li>
            <li><Link to="/collections/$slug" params={{ slug: "desk" }} className="hover:text-primary">Desk</Link></li>
            <li><Link to="/collections/$slug" params={{ slug: "home" }} className="hover:text-primary">Home</Link></li>
            <li><Link to="/collections/$slug" params={{ slug: "carry" }} className="hover:text-primary">Carry</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="label-caps text-muted-foreground mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-primary">Shipping & Returns</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="label-caps text-muted-foreground mb-4">About</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cove Studio is a small, independent shop for considered everyday objects. Designed to last and fit quietly into your space.
          </p>
          <Link to="/about" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            Our story →
          </Link>
        </div>
        <div>
          <h4 className="label-caps text-muted-foreground mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">New arrivals, occasional notes. No spam.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("You're subscribed");
              setEmail("");
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 min-w-0 rounded-lg border border-border bg-surface px-3 py-2 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-cove flex flex-col md:flex-row items-center justify-between gap-3 py-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Cove Studio. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/faq" className="hover:text-foreground">Privacy</Link>
            <Link to="/faq" className="hover:text-foreground">Terms</Link>
            <a aria-label="Instagram" href="#" className="hover:text-foreground"><Instagram className="h-4 w-4" /></a>
            <a aria-label="Pinterest" href="#" className="hover:text-foreground">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9.2-.8 1.2-5.2 1.2-5.2s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.4-2 3.4-5 0-2.6-1.9-4.5-4.6-4.5-3.1 0-5 2.4-5 4.8 0 1 .4 2 .8 2.6.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.3.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2-.6-2.4-1.2l-.7 2.5c-.2 1-.9 2.2-1.4 3a10 10 0 1 0 3.5-19z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
