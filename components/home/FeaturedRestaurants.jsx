"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, Truck, ArrowRight } from "lucide-react";
import { FEATURED_RESTAURANTS } from "@/lib/constants";
import { formatCurrency, formatDeliveryTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function FeaturedRestaurants() {
  return (
    <section className="section-gap">
      <div className="page-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-label mb-1">Top Picks</p>
            <h2 className="text-2xl font-bold text-foreground">Featured Restaurants</h2>
          </div>
          <Link href="/restaurants" className="flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FEATURED_RESTAURANTS.slice(0, 8).map((r, i) => (
            <motion.div
              key={r.restaurant_id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link href={`/restaurants/${r.restaurant_id}`}
                className="group block card-base overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
                {/* Banner */}
                <div className="relative h-44 bg-muted overflow-hidden">
                  <Image
                    src={r.banner_url}
                    alt={r.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={cn(
                    "absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold",
                    r.is_open ? "bg-green-500 text-white" : "bg-black/60 text-white"
                  )}>
                    {r.is_open ? "Open" : "Closed"}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 rounded-full px-2 py-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-white text-xs font-semibold">{r.rating}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-brand-500 transition-colors mb-0.5 line-clamp-1">
                    {r.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">{r.cuisine_type}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {formatDeliveryTime(r.avg_delivery_time)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      {r.delivery_fee === 0 ? "Free" : formatCurrency(r.delivery_fee)}
                    </span>
                    <span className="ml-auto text-[10px] font-medium text-charcoal-400">{r.city}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
