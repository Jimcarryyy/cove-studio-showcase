import { X } from "lucide-react";
import { useEffect, useState } from "react";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("cove-ann-dismissed")) setOpen(false);
  }, []);
  if (!open) return null;
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container-cove flex items-center justify-center gap-4 py-2 text-[12px] tracking-wide">
        <p className="text-center">
          Free shipping on orders over $75 · Easy 30-day returns
        </p>
        <button
          aria-label="Dismiss announcement"
          onClick={() => {
            setOpen(false);
            try { sessionStorage.setItem("cove-ann-dismissed", "1"); } catch {}
          }}
          className="ml-2 opacity-70 hover:opacity-100"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
