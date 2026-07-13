import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, type Variants } from 'framer-motion';
import { Menu, X, Ticket, ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const Instagram = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const CAROUSEL_IMAGES = [
    {
        // Cinematic, high-production laser stage & crowd silhouette
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1600",
        title: "TheGaze Chapter 1: The Awakening",
        location: "Abuja Venue Alpha",
        date: "OCTOBER 2026"
    },
    {
        // Abstract neon fuchsia & deep blue rave lighting geometries
        url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1600",
        title: "Neon Jungle Rave",
        location: "Wuse II Underground",
        date: "DECEMBER 2026"
    },
    {
        // Premium DJ deck setups with sharp emerald/cyan laser streams
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1600",
        title: "Bassline & Echoes",
        location: "Maitama Secret Garden",
        date: "JANUARY 2027"
    }
];

// Interactive Spotlight Border Card Component
function InteractiveCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`relative group rounded-3xl border border-white/[0.04] bg-white/[0.01] p-8 flex flex-col justify-between overflow-hidden ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.07),
              transparent 80%
            )
          `,
                }}
            />
            {children}
        </motion.div>
    );
}

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            shiftSlide(1);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    const shiftSlide = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentSlide((prev) => (prev + newDirection + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
    };

    // Ultra-smooth structural spring transitions
    const slideVariants: Variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 1.03
        }),
        center: {
            x: 0,
            opacity: 0.38,
            scale: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 32 },
                opacity: { duration: 0.65, ease: "easeInOut" },
                scale: { duration: 1.2, ease: "easeOut" }
            }
        },
        exit: (dir: number) => ({
            x: dir < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.97,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 32 },
                opacity: { duration: 0.5 }
            }
        })
    };


    // Parent staggering containers
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    };

    // Smooth upward fade for individual elements
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 260, damping: 25 }
        },
    };

    return (
        <div className="min-h-screen bg-[#030303] text-[#F3F4F6] font-sans selection:bg-[#00E599] selection:text-black overflow-x-hidden antialiased scroll-smooth">

            {/* Dynamic Blurred Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/30 backdrop-blur-3xl border-b border-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 h-18 flex items-center justify-between">

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="flex items-center space-x-3 group cursor-pointer"
                    >
                        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-[#00E599]/40 transition-all duration-500">
                            <Ticket className="h-5 w-5 text-[#00E599] group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                        <span className="text-xl font-heading font-extrabold tracking-[0.25em] uppercase bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                            TheGaze
                        </span>
                    </motion.div>

                    {/* Nav Items */}
                    <nav className="hidden md:flex items-center space-x-12 text-[11px] font-semibold tracking-[0.2em] uppercase">
                        {['home', 'tickets', 'contact'].map((link) => (
                            <a
                                key={link}
                                href={`#${link}`}
                                className="text-[#8E8E93] hover:text-[#00E599] transition-colors duration-400 relative py-1 group"
                            >
                                {link}
                                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#00E599] transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) group-hover:w-full" />
                            </a>
                        ))}
                        <motion.a
                            href="#tickets"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black font-bold px-7 py-3 rounded-full hover:bg-[#00E599] transition-colors duration-300 text-[10px] tracking-[0.15em] text-center"
                        >
                            Get Tickets
                        </motion.a>
                    </nav>

                    {/* Mobile Hambuger menu */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        <AnimatePresence mode="wait">
                            {isMenuOpen ? (
                                <motion.div key="close" initial={{ rotate: -45 }} animate={{ rotate: 0 }} exit={{ rotate: 45 }}><X className="h-6 w-6" /></motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 45 }} animate={{ rotate: 0 }} exit={{ rotate: -45 }}><Menu className="h-6 w-6" /></motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden absolute top-full left-0 right-0 bg-[#030303]/95 backdrop-blur-3xl border-b border-white/[0.04] px-8 py-10 space-y-6 flex flex-col tracking-[0.2em] uppercase font-semibold text-xs text-center overflow-hidden"
                        >
                            {['home', 'tickets', 'contact'].map((link) => (
                                <a
                                    key={link}
                                    href={`#${link}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="hover:text-[#00E599] py-2 transition-colors"
                                >
                                    {link}
                                </a>
                            ))}
                            <a href="#tickets" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-gradient-to-r from-violet-600 to-[#00E599] text-white py-4 rounded-xl font-bold text-[10px] tracking-widest">
                                Get Tickets
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Hero Fluid Canvas */}
            <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#030303]">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentSlide}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 w-full h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-[#030303] z-10" />
                            <img
                                src={CAROUSEL_IMAGES[currentSlide].url}
                                alt="High-end Nightlife Venue"
                                className="w-full h-full object-cover object-center"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Typographic Center Grid */}
                <div className="relative z-20 max-w-5xl mx-auto text-center px-6 mt-20 ">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-neutral-300 text-[10px] font-bold tracking-[0.25em] uppercase mb-8">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00E599] animate-pulse" />
                            <span>Abuja's Luxury Sound Culture</span>
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tight mb-8 uppercase leading-[1.1] max-sm:leading-[1.3]"
                    >
                        Feel the Energy <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-[#00E599] ">
                            Own the Night
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-[#8E8E93] text-xs sm:text-base max-w-xl mx-auto mb-12 font-normal leading-relaxed tracking-wider"
                    >
                        Uncompromising sound system architecture, deep sensory visual installations, and the finest electronic music curation in the capital space.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                    >
                        <a
                            href="#tickets"
                            className="group inline-flex items-center space-x-4 bg-[#00E599] text-black font-heading font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] pl-10 pr-8 py-5 rounded-full relative overflow-hidden transition-all duration-300 ease-out active:scale-[0.98]"
                        >
                            {/* Subtle inner gloss highlight layer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-[-2px]">
                                Book Access Passes
                            </span>

                            {/* Masked Arrow Container for the cinematic transition */}
                            <div className="relative w-4 h-4 overflow-hidden">
                                <ArrowRight
                                    className="h-4 w-4 stroke-[2.5] absolute inset-0 transition-transform duration-300 ease-out 
                       group-hover:translate-x-full group-hover:opacity-0"
                                />
                                <ArrowRight
                                    className="h-4 w-4 stroke-[2.5] absolute inset-0 -translate-x-full opacity-0 transition-transform duration-300 ease-out 
                       group-hover:translate-x-0 group-hover:opacity-100"
                                />
                            </div>
                        </a>
                    </motion.div>
                </div>

                {/* Dynamic Meta Indicators */}
                <div className="absolute bottom-12 left-8 md:left-16 z-20 hidden sm:block">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="text-left"
                        >
                            <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#00E599] mb-1">{CAROUSEL_IMAGES[currentSlide].date}</p>
                            <p className="text-xs uppercase font-semibold text-neutral-400 tracking-widest">{CAROUSEL_IMAGES[currentSlide].title}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Carousel Sliders */}
                <div className="absolute bottom-10 right-8 md:right-16 flex space-x-3 z-20">
                    <button
                        onClick={() => shiftSlide(-1)}
                        className="p-3 rounded-full border border-white/5 bg-[#030303]/40 backdrop-blur-md text-neutral-400 hover:text-white hover:border-white/20 transition-all active:scale-90"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => shiftSlide(1)}
                        className="p-3 rounded-full border border-white/5 bg-[#030303]/40 backdrop-blur-md text-neutral-400 hover:text-white hover:border-white/20 transition-all active:scale-90"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </section>

            {/* Ticket Grid Section */}
            <section id="tickets" className="pt-32 pb-20 bg-[#030303] relative border-t border-white/[0.01]">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tight mb-4 
               text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white 
               animate-text-shimmer">
                            Secure Entry Passes
                        </h2>
                        {/* <p className="text-[#8E8E93] max-w-sm mx-auto text-xs tracking-wider leading-relaxed">
                            Attendance capacities are hard-capped to retain space comfortability and pure immersive atmosphere.
                        </p> */}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                        {/* Pass 1 */}
                        <InteractiveCard>
                            <div className="w-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">Tier 01</span>
                                        <h3 className="text-base font-heading font-bold uppercase tracking-wider mt-0.5">General Arena</h3>
                                    </div>
                                    <Zap className="h-4 w-4 text-neutral-600 group-hover:text-[#00E599] transition-colors duration-300" />
                                </div>
                                <div className="text-3xl font-heading font-bold mb-8 text-white">₦15,000</div>
                                <ul className="space-y-4 text-xs tracking-wider text-neutral-400 mb-12">
                                    <li className="flex items-center space-x-3"><span className="h-1 w-1 rounded-full bg-neutral-600" /> <span>Standard arena gate entry</span></li>
                                    <li className="flex items-center space-x-3"><span className="h-1 w-1 rounded-full bg-neutral-600" /> <span>Access to main perimeter bars</span></li>
                                </ul>
                            </div>
                            <button className="w-full bg-white/[0.03] border border-white/5 hover:bg-white text-white hover:text-black font-bold text-[10px] tracking-[0.15em] uppercase py-4 rounded-xl transition-all duration-300">
                                Select Pass
                            </button>
                        </InteractiveCard>

                        {/* Pass 2 - Featured */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="bg-gradient-to-b from-white/[0.03] to-violet-950/10 border-2 border-violet-500 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl shadow-violet-500/5 lg:-translate-y-4"
                        >
                            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-400 to-fuchsia-400 text-black font-black text-[9px] uppercase tracking-[0.25em] px-5 py-1.5 rounded-full shadow-lg">
                                Highly Requested
                            </span>
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-violet-400">Tier 02</span>
                                        <h3 className="text-base font-heading font-bold uppercase tracking-wider mt-0.5">VIP Deck</h3>
                                    </div>
                                    <Sparkles className="h-4 w-4 text-violet-400" />
                                </div>
                                <div className="text-3xl font-heading font-bold mb-8 text-violet-300">₦40,000</div>
                                <ul className="space-y-4 text-xs tracking-wider text-neutral-300 mb-12">
                                    <li className="flex items-center space-x-3"><span className="h-1 w-1 rounded-full bg-violet-400" /> <span>Priority fast-track entry validation</span></li>
                                    <li className="flex items-center space-x-3"><span className="h-1 w-1 rounded-full bg-violet-400" /> <span>Access to elevated viewing decks</span></li>
                                    <li className="flex items-center space-x-3"><span className="h-1 w-1 rounded-full bg-violet-400" /> <span>1 Premium artisan welcome beverage</span></li>
                                </ul>
                            </div>
                            <button className="w-full bg-gradient-to-r from-violet-400 to-fuchsia-400 text-black font-bold text-[10px] tracking-[0.15em] uppercase py-4 rounded-xl hover:opacity-90 hover:scale-[1.01] transition-all duration-300">
                                Select VIP Access
                            </button>
                        </motion.div>

                        {/* Pass 3 */}
                        <InteractiveCard>
                            <div className="w-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">Tier 03</span>
                                        <h3 className="text-base font-heading font-bold uppercase tracking-wider mt-0.5">VVIP Backstage</h3>
                                    </div>
                                    <ShieldCheck className="h-4 w-4 text-neutral-600 group-hover:text-[#00E599] transition-colors duration-300" />
                                </div>
                                <div className="text-3xl font-heading font-bold mb-8 text-[#00E599]">₦120,000</div>
                                <ul className="space-y-4 text-xs tracking-wider text-neutral-400 mb-12">
                                    <li className="flex items-center space-x-3"><span className="h-1 w-1 rounded-full bg-[#00E599]" /> <span>Full backstage permissions</span></li>
                                    <li className="flex items-center space-x-3"><span className="h-1 w-1 rounded-full bg-[#00E599]" /> <span>Premium open spirits bar package</span></li>
                                    <li className="flex items-center space-x-3"><span className="h-1 w-1 rounded-full bg-[#00E599]" /> <span>Dedicated tables & concierge security</span></li>
                                </ul>
                            </div>
                            <button className="w-full bg-white/[0.03] border border-white/5 hover:bg-white text-white hover:text-black font-bold text-[10px] tracking-[0.15em] uppercase py-4 rounded-xl transition-all duration-300">
                                Submit Inquiry
                            </button>
                        </InteractiveCard>
                    </div>
                </div>
            </section>

            {/* Advanced Contact Form with Floating Field Highlights */}
            <section id="contact" className="py-14 bg-[#030303] border-t border-white/[0.01]">
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tight mb-4 
               text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white 
               animate-text-shimmer">
                        Elevated Experiences
                    </h2>
                    {/* <p className="text-[#8E8E93] text-xs tracking-wider max-w-md mx-auto leading-relaxed">
                        Secure privileged access, custom floor layouts, or brand architecture alignments via our private concierge.
                    </p> */}
                </motion.div>
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative rounded-3xl p-8 sm:p-16 bg-[#080808] border border-white/[0.02]"
                    >
                        {/* Section Header */}


                        {/* Form */}
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
                            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12">

                                {/* Full Name Input */}
                                <motion.div variants={itemVariants} className="relative w-full">
                                    <input
                                        type="text"
                                        id="name"
                                        className="peer w-full bg-transparent border-b border-white/10 py-3 text-sm text-white placeholder-transparent focus:outline-none transition-colors duration-300"
                                        placeholder="Alex M."
                                        required
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-0 -top-3.5 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 transition-all duration-300 
                             peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-3 
                             peer-focus:-top-3.5 peer-focus:text-[#00E599] peer-focus:text-[10px]"
                                    >
                                        Full Name
                                    </label>
                                    {/* Hardware-accelerated CSS animated accent bar */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#00E599] scale-x-0 origin-left transition-transform duration-500 ease-out peer-focus:scale-x-100" />
                                </motion.div>

                                {/* Email Address Input */}
                                <motion.div variants={itemVariants} className="relative w-full">
                                    <input
                                        type="email"
                                        id="email"
                                        className="peer w-full bg-transparent border-b border-white/10 py-3 text-sm text-white placeholder-transparent focus:outline-none transition-colors duration-300"
                                        placeholder="alex@concierge.com"
                                        required
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-0 -top-3.5 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 transition-all duration-300 
                             peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-3 
                             peer-focus:-top-3.5 peer-focus:text-[#00E599] peer-focus:text-[10px]"
                                    >
                                        Email Address
                                    </label>
                                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#00E599] scale-x-0 origin-left transition-transform duration-500 ease-out peer-focus:scale-x-100" />
                                </motion.div>

                            </div>

                            {/* Message Requirements Textarea */}
                            <motion.div variants={itemVariants} className="relative w-full pt-4">
                                <textarea
                                    id="message"
                                    rows={3}
                                    className="peer w-full bg-transparent border-b border-white/10 py-3 text-sm text-white placeholder-transparent focus:outline-none transition-colors duration-300 resize-none"
                                    placeholder="Requirements..."
                                    required
                                ></textarea>
                                <label
                                    htmlFor="message"
                                    className="absolute left-0 -top-1 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 transition-all duration-300 
                           peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-6 
                           peer-focus:-top-1 peer-focus:text-[#00E599] peer-focus:text-[10px]"
                                >
                                    Message Requirements
                                </label>
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#00E599] scale-x-0 origin-left transition-transform duration-500 ease-out peer-focus:scale-x-100" />
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div variants={itemVariants} className="pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.01, backgroundColor: '#00E599', color: '#000000' }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    className="w-full bg-white text-black font-bold text-[10px] tracking-[0.25em] uppercase py-5 rounded-xl transition-all duration-400 shadow-xl shadow-black/40 font-heading"
                                >
                                    SEND MESSAGE
                                </motion.button>
                            </motion.div>

                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#030303] border-t border-white/[0.02] py-12 text-[10px] text-neutral-600 tracking-[0.25em] uppercase font-semibold">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p>© 2026 THEGAZE. All Rights Reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-[#00E599] transition-colors flex items-center space-x-2 group">
                            <Instagram className="h-3.5 w-3.5 text-neutral-500 group-hover:text-[#00E599] transition-colors" />
                            <span className="group-hover:text-neutral-400 transition-colors">@thegaze.abj</span>
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    );
}