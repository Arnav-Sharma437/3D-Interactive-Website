export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: string;
  images: string[];
  specifications: Record<string, string>;
  available: boolean;
  featured: boolean;
  createdAt: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "heavy-duty-combination-lock",
    name: "Heavy Duty Combination Lock",
    price: 1299,
    originalPrice: 1599,
    description: "Engineered for maximum security, this premium combination lock features a hardened steel shackle resistant to bolt cutters and drilling. The 4-digit combination mechanism offers 10,000 possible combinations ensuring your valuables stay protected. Weatherproof construction makes it ideal for outdoor use on gates, sheds, and storage units.",
    shortDescription: "Hardened steel combination lock with 10,000 possible combinations.",
    category: "Locks & Security",
    images: [
      "https://images.unsplash.com/photo-1580737149657-f85863707307?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565814636199-ae713292f87e?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580745277460-85cbb57e5c01?w=1200&q=88&auto=format&fit=crop"
    ],
    specifications: {
      "Material": "Hardened Steel",
      "Shackle Diameter": "10mm",
      "Body Width": "50mm",
      "Combinations": "10,000",
      "Weather Resistance": "IP65",
      "Weight": "385g"
    },
    available: true,
    featured: true,
    createdAt: "2024-01-01"
  },
  {
    id: "2",
    slug: "stainless-door-handle-set",
    name: "Brushed Stainless Door Handle Set",
    price: 2499,
    originalPrice: 3200,
    description: "Elevate your interiors with this premium brushed stainless steel door handle set. The ergonomic lever design provides a comfortable grip while the satin finish resists fingerprints and corrosion. Includes complete fitting hardware for quick installation. Suitable for both residential and commercial applications.",
    shortDescription: "Premium brushed stainless steel lever handles with anti-corrosion finish.",
    category: "Door Hardware",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585152486-eea023f6d0e6?w=1200&q=88&auto=format&fit=crop"
    ],
    specifications: {
      "Material": "SS304 Stainless Steel",
      "Finish": "Brushed Satin",
      "Door Thickness": "35–55mm",
      "Backset": "60mm / 70mm",
      "Warranty": "5 Years",
      "Certification": "ISO 9001"
    },
    available: true,
    featured: true,
    createdAt: "2024-01-05"
  },
  {
    id: "3",
    slug: "piano-hinge-stainless-steel",
    name: "Piano Hinge – Stainless Steel 1800mm",
    price: 1850,
    description: "Full-length continuous piano hinge crafted from marine-grade stainless steel. Ideal for heavy-duty cabinet doors, lids, and panels. The continuous bearing surface distributes weight evenly, preventing sagging. Pre-drilled holes at precise 50mm intervals for easy alignment.",
    shortDescription: "Marine-grade stainless piano hinge with pre-drilled holes, 1800mm.",
    category: "Hinges",
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585153185-71e9c47f2405?w=1200&q=88&auto=format&fit=crop"
    ],
    specifications: {
      "Material": "Marine Grade SS316",
      "Length": "1800mm",
      "Width (open)": "50mm",
      "Gauge": "1.5mm",
      "Hole Spacing": "50mm",
      "Finish": "Mirror Polish"
    },
    available: true,
    featured: false,
    createdAt: "2024-01-10"
  },
  {
    id: "4",
    slug: "euro-cylinder-deadlock",
    name: "Euro Cylinder Deadlock – High Security",
    price: 3499,
    originalPrice: 4200,
    description: "Anti-snap, anti-pick, anti-drill euro profile cylinder with high-security 5-pin mechanism. Features anti-bump technology and a sacrificial snap point to prevent cylinder snapping attacks. Comes with 5 keys. Suitable for all standard euro profile locks and multi-point locking systems.",
    shortDescription: "Anti-snap, anti-drill, anti-pick 5-pin euro deadlock cylinder.",
    category: "Locks & Security",
    images: [
      "https://images.unsplash.com/photo-1580745277460-85cbb57e5c01?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614521407086-f9dd0c6f4073?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=88&auto=format&fit=crop"
    ],
    specifications: {
      "Profile": "Euro TS007",
      "Size": "35/45mm (Total 80mm)",
      "Pin Count": "6 Pins",
      "Keys Included": "5",
      "Rating": "3 Star Security",
      "Certifications": "SS312, LPS1630"
    },
    available: true,
    featured: true,
    createdAt: "2024-01-15"
  },
  {
    id: "5",
    slug: "concealed-drawer-slides",
    name: "Soft-Close Undermount Drawer Slides",
    price: 899,
    description: "Full-extension soft-close undermount drawer slides with integrated push-to-open mechanism. Engineered for smooth, silent operation with a load capacity of 40kg per pair. Tool-free height and depth adjustment for perfect alignment every time.",
    shortDescription: "Push-to-open, full-extension soft-close undermount slides, 40kg capacity.",
    category: "Drawer Systems",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426352bf?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=88&auto=format&fit=crop"
    ],
    specifications: {
      "Extension": "Full (100%)",
      "Load Capacity": "40kg",
      "Close Type": "Soft-Close",
      "Length Options": "300mm / 400mm / 500mm",
      "Material": "Cold Rolled Steel",
      "Finish": "Zinc Plated"
    },
    available: true,
    featured: false,
    createdAt: "2024-01-20"
  },
  {
    id: "6",
    slug: "glass-patch-fitting-set",
    name: "Glass Patch Fitting Set – Frameless",
    price: 5200,
    originalPrice: 6000,
    description: "Complete frameless glass door hardware set for 10–12mm toughened glass. Includes pivot hinges, patch bolt, bottom pivot, and floor closer. Satin chrome finish for a contemporary look. Suitable for interior glass partition doors and shower enclosures.",
    shortDescription: "Complete frameless glass door patch fitting set in satin chrome.",
    category: "Glass Fittings",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=88&auto=format&fit=crop"
    ],
    specifications: {
      "Glass Thickness": "10–12mm",
      "Material": "SS304",
      "Finish": "Satin Chrome",
      "Door Weight": "Up to 60kg",
      "Included": "2 Pivots, Bolt, Closer, Floor Plate",
      "Application": "Interior / Dry Areas"
    },
    available: true,
    featured: true,
    createdAt: "2024-01-25"
  },
  {
    id: "7",
    slug: "tower-bolt-heavy-duty",
    name: "Tower Bolt – Heavy Duty Brass",
    price: 420,
    description: "Solid brass tower bolt with smooth slide action. Heavy-duty construction with thick backing plate. Ideal for wooden doors and gates. The barrel design prevents rattling and the keep is designed for positive engagement.",
    shortDescription: "Solid brass heavy-duty tower bolt with smooth action, 300mm.",
    category: "Bolts & Latches",
    images: [
      "https://images.unsplash.com/photo-1614521407086-f9dd0c6f4073?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=88&auto=format&fit=crop"
    ],
    specifications: {
      "Material": "Solid Brass",
      "Length": "300mm",
      "Finish": "Polished Brass / Antique Brass",
      "Barrel Diameter": "12mm",
      "Backplate": "8mm thick",
      "Fixings": "Included"
    },
    available: false,
    featured: false,
    createdAt: "2024-02-01"
  },
  {
    id: "8",
    slug: "floor-spring-heavy-duty",
    name: "Floor Spring – Heavy Duty Hydraulic",
    price: 8500,
    description: "Hydraulic floor spring for heavy-duty commercial door applications. Adjustable closing speed and latching speed with 90° hold-open facility. Supports single-action doors up to 120kg. Body made from grey iron casting for maximum durability.",
    shortDescription: "Hydraulic floor spring for commercial doors up to 120kg with hold-open.",
    category: "Door Closers",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=88&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585152486-eea023f6d0e6?w=1200&q=88&auto=format&fit=crop"
    ],
    specifications: {
      "Door Weight": "Up to 120kg",
      "Door Width": "Up to 1400mm",
      "Hold-Open": "90°",
      "Body Material": "Grey Iron",
      "Spindle": "Stainless Steel",
      "Certifications": "EN 1154, CE Marked"
    },
    available: true,
    featured: true,
    createdAt: "2024-02-05"
  }
];

export const CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category)));

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured && p.available);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}
