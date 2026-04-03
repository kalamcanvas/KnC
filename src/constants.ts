import { Product, Category, Testimonial } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'journals',
    name: 'Journals',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800',
    description: 'Premium linen-bound journals for your deepest thoughts.'
  },
  {
    id: 'planners',
    name: 'Planners',
    image: 'https://images.unsplash.com/photo-1506784919141-177b7ec8ee0f?auto=format&fit=crop&q=80&w=800',
    description: 'Thoughtfully designed layouts to organize your creative life.'
  },
  {
    id: 'art-kits',
    name: 'Art Kits',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    description: 'Curated sets to spark your next masterpiece.'
  },
  {
    id: 'pens',
    name: 'Writing Tools',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800',
    description: 'Smooth-flowing pens and pencils for effortless expression.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Linen Journal',
    price: 32.00,
    category: 'journals',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    description: 'A premium 160gsm dotted journal with a deep navy linen cover and gold foil details.',
    benefits: ['160gsm bleed-proof paper', 'Lays flat 180 degrees', 'Two ribbon markers', 'Back pocket'],
    isBestseller: true
  },
  {
    id: '2',
    name: 'The Creative Flow Planner',
    price: 45.00,
    category: 'planners',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800',
    description: 'An undated 12-month planner designed to balance productivity with creative exploration.',
    benefits: ['Monthly & Weekly layouts', 'Habit trackers', 'Creative prompts', 'Eco-friendly paper'],
    isBestseller: true
  },
  {
    id: '3',
    name: 'Artist Watercolor Set',
    price: 58.00,
    category: 'art-kits',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    description: '24 highly pigmented watercolor pans in a travel-friendly metal tin.',
    benefits: ['Professional grade pigments', 'Excellent lightfastness', 'Mixing palette included', 'Compact design'],
    isNew: true
  },
  {
    id: '4',
    name: 'Brass Fountain Pen',
    price: 75.00,
    category: 'pens',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800',
    description: 'A solid brass fountain pen that develops a unique patina over time.',
    benefits: ['Medium steel nib', 'Weighted for balance', 'Refillable converter', 'Timeless design'],
    isBestseller: true
  },
  {
    id: '5',
    name: 'Sage Green Sketchbook',
    price: 28.00,
    category: 'journals',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=800',
    description: 'Heavyweight 200gsm paper perfect for mixed media and sketching.',
    benefits: ['Acid-free paper', 'Soft-touch cover', 'Elastic closure', 'Perforated pages'],
  },
  {
    id: '6',
    name: 'Minimalist Desk Pad',
    price: 18.00,
    category: 'planners',
    image: 'https://images.unsplash.com/photo-1586075010633-2442dc3d875f?auto=format&fit=crop&q=80&w=800',
    description: '50 tear-off sheets for your daily focus and quick notes.',
    benefits: ['Premium 100gsm paper', 'Clean layout', 'A5 size', 'Cardboard backing'],
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Illustrator',
    content: "The quality of the paper in the linen journals is unmatched. I can use watercolors without any ghosting. Truly a dream for creators.",
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Writer',
    content: "Kalam And Canvas has transformed my morning routine. Their planners are so intentional and beautiful to look at.",
    avatar: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Student',
    content: "I bought the curated gift kit for my friend, and she was in tears. The packaging is so aesthetic and thoughtful.",
    avatar: 'https://i.pravatar.cc/150?u=elena'
  }
];
