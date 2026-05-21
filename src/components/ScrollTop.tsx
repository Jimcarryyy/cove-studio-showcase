import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-30 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
