import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Cove Studio | FAQ" },
      { name: "description", content: "Shipping, returns, payments, and answers to common questions about Cove Studio." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

const QA = [
  { q: "How long does shipping take?", a: "Orders ship in 1–2 business days. Standard delivery is 3–5 business days within the contiguous US." },
  { q: "What's the free shipping threshold?", a: "Orders over $75 ship free. Otherwise, flat $6 shipping." },
  { q: "What's your returns policy?", a: "30 days for unused items in original packaging. Email us and we'll send a prepaid label." },
  { q: "Do you ship internationally?", a: "Not yet — this is a demo store. International shipping is on the roadmap." },
  { q: "How do I track my order?", a: "You'll get a tracking link by email when your order ships." },
  { q: "What payment methods do you accept?", a: "All major cards, Apple Pay, and Google Pay. (Demo: checkout is disabled.)" },
  { q: "How should I care for my products?", a: "Care instructions are on each product page under \"Care Instructions.\"" },
  { q: "How do I contact support?", a: "Email hello@covestudio.com or use the contact form. We reply within two business days." },
];

function FaqPage() {
  return (
    <div className="container-cove py-12 md:py-16 fade-in max-w-3xl">
      <p className="label-caps text-muted-foreground">Support</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Frequently asked.</h1>
      <p className="mt-3 text-muted-foreground">Straight answers. If yours isn't here, <Link to="/contact" className="text-primary hover:underline">get in touch</Link>.</p>

      <div className="mt-10 border-t border-border">
        {QA.map((item) => <Item key={item.q} q={item.q} a={item.a} />)}
      </div>
    </div>
  );
}

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left">
        <span className="font-medium">{q}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-5 text-sm text-muted-foreground leading-relaxed pr-8">{a}</p>}
    </div>
  );
}
