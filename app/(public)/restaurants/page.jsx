"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { RestaurantCardSkeleton } from "@/components/common/Skeletons";
import { DEFAULT_CATEGORIES, RESTAURANT_SORT_OPTIONS, RATING_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ALL_RESTAURANTS = [
  { restaurant_id: 1, name: "Burning Brownie", cuisine_type: "Burgers · Fast Food", rating: 4.8, total_reviews: 1240, delivery_fee: 0, avg_delivery_time: 25, is_open: true, city: "Lahore", image_url: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format&fit=crop", category: "burgers" },
  { restaurant_id: 2, name: "Savour Foods", cuisine_type: "Pakistani · Biryani", rating: 4.6, total_reviews: 3100, delivery_fee: 50, avg_delivery_time: 35, is_open: true, city: "Lahore", image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop", category: "biryani" },
  { restaurant_id: 3, name: "Sakura Japanese", cuisine_type: "Japanese · Sushi", rating: 4.7, total_reviews: 890, delivery_fee: 100, avg_delivery_time: 40, is_open: true, city: "Karachi", image_url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop", category: "sushi" },
  { restaurant_id: 4, name: "Pizza Palace", cuisine_type: "Italian · Pizza", rating: 4.5, total_reviews: 2200, delivery_fee: 0, avg_delivery_time: 30, is_open: false, city: "Islamabad", image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop", category: "pizza" },
  { restaurant_id: 5, name: "BBQ Tonight", cuisine_type: "BBQ · Grills", rating: 4.4, total_reviews: 1800, delivery_fee: 80, avg_delivery_time: 45, is_open: true, city: "Lahore", image_url: "https://images.unsplash.com/photo-1544025162-d76538a2a088?w=600&auto=format&fit=crop", category: "bbq" },
  { restaurant_id: 6, name: "Sweet Tooth Bakery", cuisine_type: "Desserts · Bakery", rating: 4.3, total_reviews: 560, delivery_fee: 0, avg_delivery_time: 20, is_open: true, city: "Karachi", image_url: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=600&auto=format&fit=crop", category: "desserts" },
  { restaurant_id: 7, name: "Green Garden", cuisine_type: "Healthy · Salads", rating: 4.2, total_reviews: 430, delivery_fee: 60, avg_delivery_time: 25, is_open: true, city: "Islamabad", image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop", category: "healthy" },
  { restaurant_id: 8, name: "Dragon Palace", cuisine_type: "Chinese", rating: 4.5, total_reviews: 970, delivery_fee: 70, avg_delivery_time: 35, is_open: false, city: "Lahore", image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop", category: "chinese" },
  { restaurant_id: 9, name: "Sub Station", cuisine_type: "Sandwiches · Subs", rating: 4.1, total_reviews: 320, delivery_fee: 0, avg_delivery_time: 20, is_open: true, city: "Karachi", image_url: "https://images.unsplash.com/photo-1509722747041-616f39b57600?w=600&auto=format&fit=crop", category: "sandwiches" },
  { restaurant_id: 10, name: "Chai & Chaat", cuisine_type: "Pakistani Street Food", rating: 4.6, total_reviews: 1500, delivery_fee: 30, avg_delivery_time: 30, is_open: true, city: "Lahore", image_url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop", category: "biryani" },
];

export default function RestaurantsPage() {
  const [search,      setSearch]      = useState("");
  const [category,    setCategory]    = useState("");
  const [minRating,   setMinRating]   = useState("");
  const [maxFee,      setMaxFee]      = useState("");
  const [openOnly,    setOpenOnly]    = useState(false);
  const [sortBy,      setSortBy]      = useState("rating");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...ALL_RESTAURANTS];
    if (search)    list = list.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine_type.toLowerCase().includes(search.toLowerCase()));
    if (category)  list = list.filter(r => r.category === category);
    if (minRating) list = list.filter(r => r.rating >= parseFloat(minRating));
    if (maxFee)    list = list.filter(r => r.delivery_fee <= parseInt(maxFee));
    if (openOnly)  list = list.filter(r => r.is_open);
    list.sort((a, b) => {
      if (sortBy === "rating")        return b.rating - a.rating;
      if (sortBy === "delivery_fee")  return a.delivery_fee - b.delivery_fee;
      if (sortBy === "delivery_time") return a.avg_delivery_time - b.avg_delivery_time;
      if (sortBy === "name")          return a.name.localeCompare(b.name);
      return 0;
    });
    return list;
  }, [search, category, minRating, maxFee, openOnly, sortBy]);

  const clearFilters = () => { setCategory(""); setMinRating(""); setMaxFee(""); setOpenOnly(false); };
  const hasFilters = category || minRating || maxFee || openOnly;

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
        <div className="space-y-1.5">
          {DEFAULT_CATEGORIES.map(c => (
            <button key={c.slug} onClick={() => setCategory(category === c.slug ? "" : c.slug)}
              className={cn("flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm transition-colors",
                category === c.slug ? "bg-brand-50 text-brand-600 font-medium dark:bg-brand-950/30 dark:text-brand-400" : "text-foreground hover:bg-muted")}>
              <span>{c.icon}</span> {c.name}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Minimum Rating</h3>
        <div className="space-y-1.5">
          {RATING_OPTIONS.map(r => (
            <button key={r.value} onClick={() => setMinRating(minRating === r.value ? "" : r.value)}
              className={cn("flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm transition-colors",
                minRating === r.value ? "bg-brand-50 text-brand-600 font-medium dark:bg-brand-950/30 dark:text-brand-400" : "text-foreground hover:bg-muted")}>
              ⭐ {r.label}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Max Delivery Fee</h3>
        <div className="space-y-1.5">
          {[{ value: "0", label: "Free Delivery" }, { value: "50", label: "Up to PKR 50" }, { value: "100", label: "Up to PKR 100" }].map(f => (
            <button key={f.value} onClick={() => setMaxFee(maxFee === f.value ? "" : f.value)}
              className={cn("flex w-full rounded-lg px-3 py-2 text-sm transition-colors",
                maxFee === f.value ? "bg-brand-50 text-brand-600 font-medium dark:bg-brand-950/30" : "text-foreground hover:bg-muted")}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-5">
        <label className="flex items-center gap-3 cursor-pointer">
          <div className={cn("relative w-10 h-5 rounded-full transition-colors", openOnly ? "bg-brand-500" : "bg-muted")}
            onClick={() => setOpenOnly(v => !v)}>
            <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform", openOnly ? "left-5" : "left-0.5")} />
          </div>
          <span className="text-sm text-foreground">Open now only</span>
        </label>
      </div>
      {hasFilters && (
        <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-destructive hover:underline">
          <X className="h-3.5 w-3.5" /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="page-container py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Restaurants</h1>
        <p className="text-muted-foreground text-sm mt-1">{filtered.length} restaurants found</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 card-base p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Filters</h2>
              {hasFilters && <button onClick={clearFilters} className="text-xs text-brand-500 hover:underline">Clear</button>}
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Search + Sort bar */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search restaurants..." value={search} onChange={e => setSearch(e.target.value)}
                className="input-base pl-9" />
            </div>
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="input-base pr-9 appearance-none cursor-pointer min-w-[160px]">
                {RESTAURANT_SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <button onClick={() => setSidebarOpen(true)}
              className="btn-secondary lg:hidden flex items-center gap-2 text-sm">
              <SlidersHorizontal className="h-4 w-4" /> Filters {hasFilters && <span className="badge-orange">{[category,minRating,maxFee,openOnly].filter(Boolean).length}</span>}
            </button>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-3">🍽️</p>
              <h3 className="font-semibold text-foreground mb-1">No restaurants found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search term.</p>
              <button onClick={clearFilters} className="btn-primary text-sm mt-4">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((r, i) => (
                <motion.div key={r.restaurant_id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.35 }}>
                  <RestaurantCard restaurant={r} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            className="absolute left-0 top-0 bottom-0 w-72 bg-background overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold">Filters</h2>
              <button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <FilterPanel />
          </motion.div>
        </div>
      )}
    </div>
  );
}
