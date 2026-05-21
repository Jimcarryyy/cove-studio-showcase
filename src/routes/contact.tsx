import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Cove Studio | Contact" },
      { name: "description", content: "Get in touch with Cove Studio. We reply within 2 business days." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "Order", message: "" });

  return (
    <div className="container-cove py-12 md:py-16 fade-in">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <p className="label-caps text-muted-foreground">Contact</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Say hello.</h1>
          <p className="mt-3 text-muted-foreground max-w-md">Questions, feedback, an order issue — we're a small team and we read everything.</p>

          {sent ? (
            <div className="mt-10 rounded-2xl border border-border bg-surface p-8 text-center">
              <p className="font-display text-2xl">Message sent.</p>
              <p className="mt-2 text-muted-foreground">Thanks {form.name || "for reaching out"}. We'll get back to you within 2 business days.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "Order", message: "" }); }} className="mt-6 text-sm text-primary hover:underline">Send another</button>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-10 space-y-5 max-w-lg"
            >
              <Field label="Name">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
              </Field>
              <Field label="Email">
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
              </Field>
              <Field label="Subject">
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
                  <option>Order</option>
                  <option>Product</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Message">
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
              </Field>
              <button className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">Send message</button>
            </form>
          )}
        </div>

        <aside className="lg:pt-16">
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-5">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="label-caps text-muted-foreground">Email</p>
                <a href="mailto:hello@covestudio.com" className="mt-1 block text-sm hover:text-primary">hello@covestudio.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="label-caps text-muted-foreground">Response time</p>
                <p className="mt-1 text-sm">Within 2 business days</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label-caps text-muted-foreground mb-2 block">{label}</span>
      {children}
    </label>
  );
}
