export type KitId = "starter" | "fullhome";
export type ColorId = "sage" | "slate" | "lavender";
export type ChewId = "standard" | "tough";

export interface Kit {
  id: KitId;
  name: string;
  price: number;
  pods: number;
  coverage: string;
  short: string;
  desc: string[];
}

export interface Color {
  id: ColorId;
  name: string;
  hex: string;
}

export interface ChewRating {
  id: ChewId;
  name: string;
  surcharge: number;
}

export interface ScheduleItem {
  time: string;
  label: string;
  scent: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  dog: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export const KITS: Kit[] = [
  {
    id: "starter",
    name: "3-Pod Starter Kit",
    price: 89,
    pods: 3,
    coverage: "Up to 600 sq ft",
    short: "Perfect for a single room or small apartment.",
    desc: [
      "Three automated scent-hunt pods to keep one dog busy.",
      "Ideal for apartments and single rooms up to 600 sq ft.",
      "Set-and-forget 8-hour schedule with auto shutoff.",
    ],
  },
  {
    id: "fullhome",
    name: "5-Pod Full-Home Kit",
    price: 139,
    pods: 5,
    coverage: "Up to 1,500 sq ft",
    short: "Whole-home coverage for busy households.",
    desc: [
      "Five automated scent-hunt pods for multi-dog homes.",
      "Covers up to 1,500 sq ft across multiple rooms.",
      "Staggered 8-hour schedule keeps every pup engaged.",
    ],
  },
];

export const COLORS: Color[] = [
  { id: "sage", name: "Sage Green", hex: "#9CAF88" },
  { id: "slate", name: "Slate Grey", hex: "#708090" },
  { id: "lavender", name: "Lavender", hex: "#B5A3CF" },
];

export const CHEW_RATINGS: ChewRating[] = [
  { id: "standard", name: "Standard", surcharge: 0 },
  { id: "tough", name: "Tough+ (chew-resistant)", surcharge: 10 },
];

export const SCENT_REFILL_PRICE = 14;

export const SCHEDULE: ScheduleItem[] = [
  { time: "08:00", label: "Wake-up sniff", scent: "Fresh grass" },
  { time: "10:00", label: "Mid-morning hunt", scent: "Bacon trail" },
  { time: "12:00", label: "Lunchtime calm", scent: "Chamomile" },
  { time: "14:00", label: "Afternoon chase", scent: "Squirrel lure" },
  { time: "16:00", label: "Pre-dinner search", scent: "Peanut butter" },
  { time: "18:00", label: "Evening wind-down", scent: "Lavender mist" },
  { time: "20:00", label: "Bedtime settle", scent: "Vanilla" },
  { time: "22:00", label: "Overnight rest", scent: "Unscented" },
];

export const SPECS: Spec[] = [
  { label: "Pod count", value: "3 (starter) or 5 (full-home)" },
  { label: "Coverage", value: "Up to 600 sq ft / 1,500 sq ft" },
  { label: "Schedule", value: "8-hour automated cycle" },
  { label: "Battery", value: "Rechargeable, 12-hour life" },
  { label: "Charging", value: "USB-C charging base" },
  { label: "Materials", value: "BPA-free, chew-resistant polymer" },
  { label: "Weight", value: "220 g per pod" },
  { label: "Water resistance", value: "IPX4 splash-proof" },
  { label: "Connectivity", value: "Bluetooth 5.0 + app control" },
  { label: "Scents", value: "Interchangeable refill pods" },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Maya L.",
    rating: 5,
    date: "2 weeks ago",
    text: "Our border collie used to chew the couch. Now she hunts scents for eight hours straight and naps all evening. Worth every cent.",
    dog: "Border Collie",
  },
  {
    id: "r2",
    name: "Dev P.",
    rating: 5,
    date: "1 month ago",
    text: "The 5-pod kit covers our whole downstairs. Both dogs stay occupied while we work. Setup took five minutes.",
    dog: "Lab + Beagle mix",
  },
  {
    id: "r3",
    name: "Sam R.",
    rating: 4,
    date: "3 weeks ago",
    text: "Great concept. The tough+ rating survived our chewer. Refill scents last about two weeks each.",
    dog: "Jack Russell",
  },
];

export const FAQS: FAQ[] = [
  {
    q: "How long does a scent refill last?",
    a: "Each refill pod lasts roughly 10–14 days with the standard 8-hour schedule, depending on how often your dog triggers the pod.",
  },
  {
    q: "Is it safe for puppies and chewers?",
    a: "Yes. All pods are BPA-free and chew-resistant polymer. Choose the Tough+ rating for power chewers.",
  },
  {
    q: "How does the 8-hour schedule work?",
    a: "Pods release scent bursts at set times across an 8-hour cycle, then enter rest mode. You can adjust times in the app.",
  },
  {
    q: "Can I use multiple kits in one home?",
    a: "Absolutely. Combine starter and full-home kits for larger spaces or multiple dogs.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship across the US and Canada. International shipping is calculated at checkout.",
  },
  {
    q: "What's the warranty?",
    a: "Every ScentTrail kit includes a 1-year limited warranty against defects.",
  },
];
