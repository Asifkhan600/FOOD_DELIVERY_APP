"use client";

import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PAKISTAN_CITIES, DEFAULT_CITY, FEATURED_RESTAURANTS } from "@/lib/constants";

const stats = [
  { value: "500+",   label: "Restaurants"     },
  { value: "50k+",   label: "Happy Customers" },
  { value: "30 min", label: "Avg Delivery"    },
  { value: "4.8★",   label: "App Rating"      },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp     = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

export function HeroSection() {
  const router = useRouter();
  const [query,       setQuery]       = useState("");
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [cityOpen,    setCityOpen]    = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sfd_city");
    if (saved) {
      const found = PAKISTAN_CITIES.find(c => c.code === saved);
      if (found) setSelectedCity(found);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    params.set("city", selectedCity.name);
    router.push(`/restaurants?${params.toString()}`);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    localStorage.setItem("sfd_city", city.code);
    setCityOpen(false);
  };

  // Scrolling restaurant ticker
  const tickerNames = FEATURED_RESTAURANTS.map(r => r.name);

  return (
    <section className="relative bg-charcoal-900 overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #f97316 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-transparent to-charcoal-900/40" />

      {/* Restaurant name ticker at top */}
      <div className="relative border-b border-charcoal-800 py-2 overflow-hidden">
        <div className="flex gap-8 animate-[marquee_25s_linear_infinite] w-max">
          {[...tickerNames, ...tickerNames].map((name, i) => (
            <span key={i} className="text-xs text-charcoal-500 whitespace-nowrap flex items-center gap-2">
              <span className="text-brand-500">●</span> {name}
            </span>
          ))}
        </div>
      </div>

      <div className="relative page-container py-20 md:py-28">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto text-center">

          {/* Eyebrow badge */}
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal-700 bg-charcoal-800/80 px-4 py-1.5 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-charcoal-300">Now delivering in {PAKISTAN_CITIES.length}+ cities across Pakistan</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
            Fresh Food, Delivered{" "}
            <span className="text-brand-500">Fast.</span>
          </motion.h1>

          <motion.p variants={fadeUp}
            className="text-charcoal-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Order from hundreds of local restaurants in <span className="text-white font-medium">{selectedCity.name}</span> and get hot food at your door in 30 minutes.
          </motion.p>

          {/* Search + City form */}
          <motion.form variants={fadeUp} onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10">

            {/* City selector */}
            <div className="relative">
              <button type="button" onClick={() => setCityOpen(v => !v)}
                className="flex items-center gap-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white px-4 py-3 text-sm font-medium hover:border-brand-500 transition-colors whitespace-nowrap w-full sm:w-auto">
                <MapPin className="h-4 w-4 text-brand-500" />
                {selectedCity.name}
                <ChevronDown className="h-3 w-3 text-charcoal-400" />
              </button>

              {cityOpen && (
                <div className="absolute left-0 top-full mt-1 w-56 rounded-xl border border-charcoal-700 bg-charcoal-800 shadow-lg z-50 overflow-hidden">
                  <div className="max-h-64 overflow-y-auto p-1">
                    {PAKISTAN_CITIES.map(city => (
                      <button key={city.code} type="button" onClick={() => handleCitySelect(city)}
                        className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-left hover:bg-charcoal-700 transition-colors ${selectedCity.code === city.code ? "text-brand-400" : "text-charcoal-300"}`}>
                        <MapPin className="h-3 w-3 shrink-0" />
                        {city.name}
                        <span className="ml-auto text-[10px] text-charcoal-500">{city.restaurants}+</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search input */}
            <div className="relative flex-1">
              <input
                type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search restaurants or dishes…"
                className="w-full pl-4 pr-4 py-3 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white placeholder:text-charcoal-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors text-sm" />
            </div>

            <button type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 active:scale-95 px-6 py-3 text-sm font-semibold text-white transition-all duration-150 shrink-0">
              Find Food <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>

          {/* Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-charcoal-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" className="w-full fill-background" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </section>
  );
}
