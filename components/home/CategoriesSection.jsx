"use client";

import { motion } from "framer-motion";
import { DEFAULT_CATEGORIES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function CategoriesSection() {
  const router = useRouter();

  const handleClick = (slug) => {
    router.push(`/restaurants?category=${slug}`);
  };

  return (
    <section className="py-12 border-b border-border">
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="section-label mb-1">Categories</p>
            <h2 className="text-xl font-semibold text-foreground">What are you craving?</h2>
          </div>
          <button
            onClick={() => router.push("/restaurants")}
            className="text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
          >
            View all →
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {DEFAULT_CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              onClick={() => handleClick(cat.slug)}
              className={cn(
                "flex items-center gap-2.5 shrink-0 rounded-full px-4 py-2.5 text-sm font-medium border",
                "bg-card text-foreground border-border",
                "hover:bg-brand-500 hover:text-white hover:border-brand-500",
                "active:scale-95 transition-all duration-150 whitespace-nowrap cursor-pointer"
              )}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
