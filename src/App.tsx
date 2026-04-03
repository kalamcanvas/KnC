import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, ChevronRight, ArrowRight, Star, Heart, Instagram, Twitter, Facebook, Mail, MapPin, Phone, Search, Filter } from 'lucide-react';
import { Product, Category, Testimonial } from './types';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from './constants';

// --- UI Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button'
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; 
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50";
  const variants = {
    primary: "bg-brand-charcoal text-brand-cream hover:bg-brand-charcoal/90",
    secondary: "bg-brand-pastel-blue text-brand-charcoal hover:bg-brand-pastel-blue/80",
    outline: "border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-cream",
    ghost: "text-brand-charcoal hover:bg-brand-charcoal/5"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }: { title: string; subtitle?: string; centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-serif mb-4 text-brand-charcoal"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-brand-charcoal/60 max-w-2xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

interface ProductCardProps {
  product: Product;
  onClick: (p: Product) => void;
  key?: string;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -8 }}
    className="group cursor-pointer"
    onClick={() => onClick(product)}
  >
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-beige mb-4">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      {product.isBestseller && (
        <span className="absolute top-4 left-4 bg-brand-cream/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
          Bestseller
        </span>
      )}
      {product.isNew && (
        <span className="absolute top-4 left-4 bg-brand-pastel-blue/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
          New Arrival
        </span>
      )}
      <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/5 transition-colors duration-300" />
      <div className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
        <Button variant="primary" className="w-full py-2 text-sm">
          Quick View
        </Button>
      </div>
    </div>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-serif text-lg text-brand-charcoal group-hover:text-brand-charcoal/70 transition-colors">{product.name}</h3>
        <p className="text-brand-charcoal/50 text-sm capitalize">{product.category}</p>
      </div>
      <p className="font-medium">${product.price.toFixed(2)}</p>
    </div>
  </motion.div>
);

// --- Layout Components ---

const Navbar = ({ onNavigate, cartCount }: { onNavigate: (page: string) => void; cartCount: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <button onClick={() => onNavigate('home')} className="text-2xl font-serif font-bold tracking-tight text-brand-charcoal">
            Kalam <span className="text-brand-charcoal/40 font-normal">&</span> Canvas
          </button>
          <div className="hidden md:flex items-center gap-6">
            {['Shop', 'About', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => onNavigate(item.toLowerCase())}
                className="text-sm font-medium text-brand-charcoal/70 hover:text-brand-charcoal transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-brand-charcoal/70 hover:text-brand-charcoal transition-colors">
            <Search size={20} />
          </button>
          <button className="relative p-2 text-brand-charcoal/70 hover:text-brand-charcoal transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-charcoal text-brand-cream text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="md:hidden p-2 text-brand-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-cream border-b border-brand-charcoal/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {['Shop', 'About', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => {
                    onNavigate(item.toLowerCase());
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl font-serif text-brand-charcoal"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <footer className="bg-brand-beige pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
      <div className="col-span-1 md:col-span-1">
        <h2 className="text-2xl font-serif font-bold mb-6">Kalam & Canvas</h2>
        <p className="text-brand-charcoal/60 mb-6 leading-relaxed">
          Crafting premium stationery for those who believe in the power of the written word and the beauty of creative expression.
        </p>
        <div className="flex gap-4">
          {[Instagram, Twitter, Facebook].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 rounded-full border border-brand-charcoal/10 flex items-center justify-center text-brand-charcoal/60 hover:bg-brand-charcoal hover:text-brand-cream transition-all">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-brand-charcoal/40">Shop</h4>
        <ul className="space-y-4">
          {CATEGORIES.map(cat => (
            <li key={cat.id}>
              <button onClick={() => onNavigate('shop')} className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors">
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-brand-charcoal/40">Company</h4>
        <ul className="space-y-4">
          {['About Us', 'Contact', 'Shipping Policy', 'Returns', 'FAQ'].map(item => (
            <li key={item}>
              <button onClick={() => onNavigate(item.toLowerCase().includes('about') ? 'about' : 'contact')} className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors">
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-brand-charcoal/40">Newsletter</h4>
        <p className="text-brand-charcoal/60 mb-6 text-sm">Join our creative community for inspiration and early access to new collections.</p>
        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Your email" 
            className="bg-brand-cream border border-brand-charcoal/10 rounded-full px-4 py-2 flex-1 text-sm focus:outline-none focus:border-brand-charcoal/30"
          />
          <Button variant="primary" className="px-4 py-2 text-sm">Join</Button>
        </form>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-10 border-t border-brand-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-charcoal/40">
      <p>© 2026 Kalam & Canvas. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-brand-charcoal transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-brand-charcoal transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ onNavigate, onProductClick }: { onNavigate: (page: string) => void; onProductClick: (p: Product) => void }) => (
  <div className="overflow-hidden">
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center pt-20 px-6">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=1920" 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/0 via-brand-cream/50 to-brand-cream" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-brand-charcoal/5 text-brand-charcoal text-xs font-bold tracking-widest uppercase mb-6">
            Craft Your Calm
          </span>
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[1.1] text-brand-charcoal">
            Where Ideas <br /> <span className="italic text-brand-charcoal/60">Come Alive.</span>
          </h1>
          <p className="text-xl text-brand-charcoal/60 mb-10 max-w-lg leading-relaxed">
            Premium stationery designed for your thoughts, dreams, and daily creative rituals. Elevate your expression with Kalam & Canvas.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => onNavigate('shop')}>Shop Collection <ArrowRight size={18} /></Button>
            <Button variant="outline" onClick={() => onNavigate('about')}>Our Story</Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden soft-shadow">
            <img 
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200" 
              alt="Featured product" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 bg-brand-cream p-6 rounded-2xl soft-shadow max-w-[200px]"
          >
            <p className="font-serif text-lg mb-2">Linen Journals</p>
            <p className="text-xs text-brand-charcoal/50 leading-relaxed">Handcrafted with 160gsm bleed-proof paper.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Featured Categories */}
    <section className="py-24 px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Explore Collections" 
          subtitle="From the first stroke of a pen to the final page of a journal, we have everything you need for your creative journey."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onNavigate('shop')}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-charcoal/20 group-hover:bg-brand-charcoal/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-brand-cream text-2xl font-serif mb-1">{cat.name}</h3>
                  <p className="text-brand-cream/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore Collection →</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Bestsellers */}
    <section className="py-24 px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <SectionHeading 
            title="Our Bestsellers" 
            subtitle="The pieces our community loves most."
          />
          <Button variant="ghost" onClick={() => onNavigate('shop')} className="hidden md:flex">View All Products <ChevronRight size={18} /></Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.filter(p => p.isBestseller).map((product) => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>

    {/* Why Kalam & Canvas */}
    <section className="py-24 px-6 bg-brand-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: 'Premium Quality', desc: 'We source only the finest materials, from 160gsm paper to solid brass.' },
                { title: 'Aesthetic Design', desc: 'Minimalist visuals that inspire calm and focus in your creative space.' },
                { title: 'Thoughtful Gifting', desc: 'Every order is packed with care, making it the perfect gift for yourself or others.' },
                { title: 'Eco-Conscious', desc: 'We prioritize sustainable sourcing and plastic-free packaging where possible.' }
              ].map((usp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h4 className="font-serif text-xl mb-3 text-brand-charcoal">{usp.title}</h4>
                  <p className="text-brand-charcoal/60 text-sm leading-relaxed">{usp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading 
              title="Designed for Your Thoughts" 
              subtitle="At Kalam & Canvas, we believe that stationery isn't just about utility—it's about the emotional connection between the hand and the page."
            />
            <Button variant="primary" onClick={() => onNavigate('about')}>Learn More About Us</Button>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-24 px-6 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="From Our Community" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-beige p-8 rounded-3xl soft-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h5 className="font-bold text-sm">{t.name}</h5>
                  <p className="text-brand-charcoal/40 text-xs">{t.role}</p>
                </div>
              </div>
              <p className="text-brand-charcoal/70 italic leading-relaxed">"{t.content}"</p>
              <div className="flex gap-1 mt-6 text-brand-charcoal/20">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Gifting Section */}
    <section className="py-24 px-6 bg-brand-charcoal text-brand-cream">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Perfect Gifts for <br /> <span className="italic text-brand-cream/60">Creative Souls.</span></h2>
          <p className="text-brand-cream/60 mb-10 text-lg leading-relaxed">
            Discover our curated gift bundles, thoughtfully assembled to spark joy and creativity. We offer custom notes and premium gift wrapping for that extra special touch.
          </p>
          <Button variant="secondary" onClick={() => onNavigate('shop')}>Explore Gift Kits</Button>
        </motion.div>
        <div className="relative aspect-video rounded-3xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200" 
            alt="Gifting" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  </div>
);

const ShopPage = ({ onProductClick }: { onProductClick: (p: Product) => void }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = PRODUCTS.filter(p => activeCategory === 'all' || p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 px-6 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div>
            <h1 className="text-5xl font-serif mb-4">The Collection</h1>
            <p className="text-brand-charcoal/60">Browse our curated selection of premium stationery.</p>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-brand-beige px-4 py-2 rounded-full border border-brand-charcoal/5">
              <Filter size={16} className="text-brand-charcoal/40" />
              <select 
                value={activeCategory} 
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-brand-beige px-4 py-2 rounded-full border border-brand-charcoal/5">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onClick={onProductClick} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-brand-charcoal/40 text-lg">No products found in this category.</p>
            <Button variant="ghost" onClick={() => setActiveCategory('all')} className="mt-4">Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductDetailPage = ({ product, onAddToCart, onBack, onProductClick }: { product: Product; onAddToCart: (p: Product) => void; onBack: () => void; onProductClick: (p: Product) => void }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="pt-32 pb-24 px-6 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-brand-charcoal/50 hover:text-brand-charcoal transition-colors mb-12">
          <ChevronRight size={18} className="rotate-180" /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-brand-beige soft-shadow">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-brand-beige border border-brand-charcoal/5 cursor-pointer hover:opacity-80 transition-opacity">
                  <img src={product.image} alt={`${product.name} view ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <p className="text-brand-charcoal/40 uppercase tracking-widest text-xs font-bold mb-2">{product.category}</p>
              <h1 className="text-5xl font-serif mb-4">{product.name}</h1>
              <p className="text-3xl font-medium text-brand-charcoal mb-6">${product.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mb-8">
                <div className="flex text-brand-charcoal">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm text-brand-charcoal/40">(48 Reviews)</span>
              </div>
              <p className="text-brand-charcoal/70 text-lg leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            <div className="space-y-8 mb-12">
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Key Benefits</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-brand-charcoal/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-charcoal/20" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center border border-brand-charcoal/10 rounded-full px-4 py-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-brand-charcoal/50 transition-colors">-</button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-brand-charcoal/50 transition-colors">+</button>
                </div>
                <Button variant="primary" className="flex-1 py-4" onClick={() => onAddToCart(product)}>
                  Add to Cart
                </Button>
                <button className="w-14 h-14 rounded-full border border-brand-charcoal/10 flex items-center justify-center text-brand-charcoal/40 hover:bg-brand-charcoal hover:text-brand-cream transition-all">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-brand-charcoal/5 space-y-4">
              <div className="flex items-center gap-3 text-sm text-brand-charcoal/60">
                <Mail size={16} /> Free shipping on orders over $100
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-charcoal/60">
                <MapPin size={16} /> Ships worldwide from our studio
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-32">
          <SectionHeading title="You May Also Like" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} onClick={(prod) => onProductClick(prod)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-32 pb-24 bg-brand-cream">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40 mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">Crafting a Space for <br /> <span className="italic text-brand-charcoal/60">Your Ideas.</span></h1>
          <p className="text-xl text-brand-charcoal/60 leading-relaxed mb-8">
            Kalam & Canvas was born out of a simple love for the tactile experience of putting pen to paper. In a world that's increasingly digital, we believe in the power of slow, intentional creativity.
          </p>
          <p className="text-lg text-brand-charcoal/60 leading-relaxed">
            Our mission is to provide creators, dreamers, and thinkers with tools that are as beautiful as the ideas they hold. Every journal, pen, and art kit is curated with aesthetics and quality at its core.
          </p>
        </motion.div>
        <div className="relative aspect-square rounded-3xl overflow-hidden soft-shadow">
          <img 
            src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200" 
            alt="About us" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
        {[
          { title: 'The Art of Writing', desc: 'We believe writing is a form of meditation. Our tools are designed to make that experience effortless and inspiring.' },
          { title: 'Quality First', desc: 'We spend months sourcing the perfect paper and materials to ensure your creations stand the test of time.' },
          { title: 'Built for Community', desc: 'Kalam & Canvas is more than a brand; it\'s a community of creators who find beauty in the everyday.' }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
            <p className="text-brand-charcoal/60 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="pt-32 pb-24 bg-brand-cream">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Get in Touch</h1>
          <p className="text-xl text-brand-charcoal/60 leading-relaxed mb-12">
            Have a question about our products, an order, or just want to say hello? We'd love to hear from you.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center text-brand-charcoal">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40 mb-1">Email Us</p>
                <p className="text-lg">hello@kalamandcanvas.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center text-brand-charcoal">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40 mb-1">Call Us</p>
                <p className="text-lg">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center text-brand-charcoal">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40 mb-1">Visit Our Studio</p>
                <p className="text-lg">123 Creative Lane, Art District, NY 10001</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-brand-beige p-10 rounded-3xl soft-shadow"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40">First Name</label>
                <input type="text" className="w-full bg-brand-cream border border-brand-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-charcoal/30" placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40">Last Name</label>
                <input type="text" className="w-full bg-brand-cream border border-brand-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-charcoal/30" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40">Email Address</label>
              <input type="email" className="w-full bg-brand-cream border border-brand-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-charcoal/30" placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40">Message</label>
              <textarea rows={5} className="w-full bg-brand-cream border border-brand-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-charcoal/30" placeholder="How can we help you?"></textarea>
            </div>
            <Button type="submit" className="w-full py-4">Send Message</Button>
          </form>
        </motion.div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    // In a real app, show a toast or open cart drawer
  };

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-charcoal selection:text-brand-cream">
      <Navbar onNavigate={handleNavigate} cartCount={cart.length} />
      
      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomePage onNavigate={handleNavigate} onProductClick={handleProductClick} />
            </motion.div>
          )}
          {currentPage === 'shop' && (
            <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ShopPage onProductClick={handleProductClick} />
            </motion.div>
          )}
          {currentPage === 'product-detail' && selectedProduct && (
            <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProductDetailPage 
                product={selectedProduct} 
                onAddToCart={handleAddToCart} 
                onBack={() => handleNavigate('shop')} 
                onProductClick={handleProductClick}
              />
            </motion.div>
          )}
          {currentPage === 'about' && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AboutPage />
            </motion.div>
          )}
          {currentPage === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
