export type Collection = "desk" | "home" | "carry";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  collection: Collection;
  badge?: "New" | "Bestseller";
  colors?: { name: string; hex: string }[];
  description: string;
  details: string[];
  care: string;
  /** image tint hue (oklch hue), used in placeholder visual */
  tone: string; /* tailwind-style bg class via inline style */
};

export const collections: { slug: Collection; title: string; tagline: string }[] = [
  { slug: "desk", title: "Desk", tagline: "A calmer surface to think on." },
  { slug: "home", title: "Home", tagline: "Quiet objects for everyday rituals." },
  { slug: "carry", title: "Carry", tagline: "The few things you actually need." },
];

export const products: Product[] = [
  // DESK
  {
    id: "p1", slug: "linen-desk-mat", name: "Linen Desk Mat", price: 48,
    collection: "desk", badge: "Bestseller",
    colors: [
      { name: "Sand", hex: "#D9CDB7" },
      { name: "Slate", hex: "#7B8388" },
      { name: "Olive", hex: "#8A8C6B" },
    ],
    description: "Heavyweight Belgian linen that softens your workspace and your keystrokes. Naturally anti-static and built to age well.",
    details: ["100% Belgian linen, 320 gsm", "18\" × 36\"", "Non-slip cotton backing"],
    care: "Spot clean with a damp cloth. Air dry flat.",
    tone: "#E4DCC8",
  },
  {
    id: "p2", slug: "aluminum-pen-cup", name: "Aluminum Pen Cup", price: 32,
    collection: "desk",
    colors: [{ name: "Silver", hex: "#C7C9CC" }],
    description: "Brushed aluminum machined from a single billet. Heavy enough to stay put, light on the eye.",
    details: ["6061 aluminum, anodized", "3\" diameter × 4\" tall", "Felt base"],
    care: "Wipe with a soft, dry cloth.",
    tone: "#D6D9DC",
  },
  {
    id: "p3", slug: "cork-coaster-set", name: "Cork Coaster Set (4)", price: 24,
    collection: "desk",
    description: "Dense Portuguese cork that absorbs heat and condensation without fuss. The kind of thing you stop noticing — in a good way.",
    details: ["Set of four", "4\" square × ¼\" thick", "FSC-certified cork"],
    care: "Wipe clean. Avoid soaking.",
    tone: "#C9A981",
  },
  {
    id: "p4", slug: "minimal-task-lamp", name: "Minimal Task Lamp", price: 89,
    collection: "desk", badge: "New",
    colors: [
      { name: "White", hex: "#F2F1ED" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    description: "A warm, dimmable LED on a weighted base. Three brightness levels, no app, no fuss.",
    details: ["LED, 2700K warm white", "Three-step dimmer", "USB-C powered, cable included"],
    care: "Dust with a microfiber cloth.",
    tone: "#EFEDE7",
  },
  // HOME
  {
    id: "p5", slug: "stoneware-mug", name: "Stoneware Mug", price: 28,
    collection: "home", badge: "Bestseller",
    colors: [
      { name: "Clay", hex: "#B58267" },
      { name: "Charcoal", hex: "#3A3A38" },
    ],
    description: "Hand-thrown stoneware with a soft reactive glaze. Holds twelve ounces — enough for a proper morning.",
    details: ["High-fire stoneware", "12 oz capacity", "Dishwasher and microwave safe"],
    care: "Dishwasher safe; handwashing keeps the finish longer.",
    tone: "#C6A48A",
  },
  {
    id: "p6", slug: "waffle-throw-blanket", name: "Waffle Throw Blanket", price: 78,
    collection: "home",
    colors: [
      { name: "Oat", hex: "#E6DFCF" },
      { name: "Forest", hex: "#3E4A3D" },
    ],
    description: "Loose-weave cotton that breathes in summer and layers in winter. Generously sized for one, just enough for two.",
    details: ["100% long-staple cotton", "50\" × 70\"", "Pre-washed for softness"],
    care: "Machine wash cold. Tumble dry low.",
    tone: "#E5DDCB",
  },
  {
    id: "p7", slug: "scented-candle-cedar-moss", name: "Scented Candle — Cedar & Moss", price: 36,
    collection: "home", badge: "New",
    description: "Cedar, oakmoss, and a whisper of black pepper. Poured by hand into a reusable glass vessel.",
    details: ["Soy + coconut wax blend", "8 oz, ~50 hour burn", "Cotton wick"],
    care: "Trim the wick to ¼\" before each burn.",
    tone: "#9CAE9C",
  },
  {
    id: "p8", slug: "ceramic-vase-tall", name: "Ceramic Vase — Tall", price: 54,
    collection: "home",
    colors: [
      { name: "Ivory", hex: "#EFE9DA" },
      { name: "Moss", hex: "#6E7A5E" },
    ],
    description: "A tall, narrow silhouette for a single branch or a loose bouquet. Matte finish that softens the light.",
    details: ["Glazed stoneware", "10\" tall × 3\" diameter", "Watertight"],
    care: "Rinse with warm water.",
    tone: "#EBE5D5",
  },
  // CARRY
  {
    id: "p9", slug: "canvas-tote", name: "Canvas Tote", price: 42,
    collection: "carry", badge: "Bestseller",
    colors: [
      { name: "Natural", hex: "#E8DEC6" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    description: "16-ounce organic cotton canvas that breaks in beautifully. Wide base, long straps, no logo.",
    details: ["16 oz organic cotton canvas", "15\" × 16\" × 5\" base", "Reinforced straps"],
    care: "Machine wash cold, line dry.",
    tone: "#E0D4B9",
  },
  {
    id: "p10", slug: "leather-card-holder", name: "Leather Card Holder", price: 58,
    collection: "carry",
    colors: [
      { name: "Tan", hex: "#A87149" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    description: "Vegetable-tanned Italian leather, slim enough for a front pocket. Holds six cards and a folded bill.",
    details: ["Full-grain vegetable-tanned leather", "Holds 6 cards", "4\" × 2.75\""],
    care: "Condition occasionally with leather balm.",
    tone: "#B98864",
  },
  {
    id: "p11", slug: "compact-umbrella", name: "Compact Umbrella", price: 45,
    collection: "carry",
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Olive", hex: "#5E6A4F" },
    ],
    description: "Wind-resistant, auto-open, fits in a small bag. Stays put when you need it to.",
    details: ["Fiberglass ribs", "42\" canopy", "Auto open/close"],
    care: "Air dry open before storing.",
    tone: "#7A8270",
  },
  {
    id: "p12", slug: "travel-pouch", name: "Travel Pouch", price: 34,
    collection: "carry",
    colors: [
      { name: "Sand", hex: "#D9CDB7" },
      { name: "Slate", hex: "#7B8388" },
    ],
    description: "Water-resistant nylon with a YKK zip. For chargers, toiletries, or whatever wanders to the bottom of your bag.",
    details: ["210D recycled nylon", "9\" × 5\" × 2\"", "YKK zipper"],
    care: "Spot clean with mild soap.",
    tone: "#D5C9B2",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCollection = (c: Collection) => products.filter((p) => p.collection === c);
export const bestsellers = () => products.filter((p) => p.badge === "Bestseller");
export const newArrivals = () => products.filter((p) => p.badge === "New").concat(products.slice(0, 4)).slice(0, 4);
export const formatPrice = (n: number) => `$${n.toFixed(0)}`;
