"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

const TRENDING = [
  { item_id: 1, name: "Classic Smash Burger", restaurant_name: "Burning Brownie", price: 890, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop", restaurant_id: 1 },
  { item_id: 2, name: "Chicken Biryani",      restaurant_name: "Savour Foods",    price: 450, image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop", restaurant_id: 2 },
  { item_id: 3, name: "Spicy Tuna Roll",      restaurant_name: "Sakura Japanese", price: 1200, image_url: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300&auto=format&fit=crop", restaurant_id: 3 },
  { item_id: 4, name: "Margherita Pizza",     restaurant_name: "Pizza Palace",    price: 1100, image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop", restaurant_id: 4 },
  { item_id: 5, name: "Grilled BBQ Platter",  restaurant_name: "BBQ Tonight",     price: 2200, image_url: "https://images.unsplash.com/photo-1544025162-d76538a2a088?w=300&auto=format&fit=crop", restaurant_id: 5 },
  { item_id: 6, name: "Chocolate Lava Cake",  restaurant_name: "Sweet Tooth",     price: 350, image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&auto=format&fit=crop", restaurant_id: 6 },
];

export function TrendingFoods() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="page-container">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="section-label mb-1">Trending Now</p>
            <h2 className="text-2xl font-bold text-foreground">Most Ordered Today</h2>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {TRENDING.map((food, i) => (
            <motion.div key={food.item_id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.35 }}>
              <Link href={`/food/${food.item_id}`}
                className="group flex flex-col rounded-xl border border-border bg-card shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 overflow-hidden w-48 shrink-0">
                <div className="relative h-36 overflow-hidden bg-muted">
                  <Image src={food.image_url} alt={food.name} fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="192px" />
                  <div className="absolute top-2 left-2">
                    <span className="badge bg-brand-500 text-white text-[10px] px-1.5 py-0.5 rounded">🔥 Popular</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground leading-tight group-hover:text-brand-500 transition-colors line-clamp-2">{food.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{food.restaurant_name}</p>
                  <p className="text-sm font-bold text-brand-500 mt-2">{formatCurrency(food.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
