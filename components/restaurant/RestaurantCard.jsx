"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Star, Truck, MapPin } from "lucide-react";
import { formatCurrency, formatDeliveryTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function RestaurantCard({ restaurant }) {
  const {
    restaurant_id,
    name,
    cuisine_type,
    rating,
    total_reviews,
    delivery_fee,
    avg_delivery_time,
    min_order_amount,
    city,
    is_open,
    banner_url,
    image_url,
    logo_url,
  } = restaurant;

  const cover = banner_url || image_url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop";
  const logo  = logo_url  || image_url  || null;

  return (
    <Link
      href={`/restaurants/${restaurant_id}`}
      className="group block card-base overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Banner */}
      <div className="relative h-44 bg-muted overflow-hidden">
        <Image
          src={cover}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Open / Closed badge */}
        <div className={cn(
          "absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold",
          is_open
            ? "bg-green-500 text-white"
            : "bg-black/60 text-white"
        )}>
          {is_open ? "Open" : "Closed"}
        </div>

        {/* Logo */}
        {logo && (
          <div className="absolute bottom-3 left-3 h-12 w-12 rounded-xl overflow-hidden border-2 border-white bg-white shadow-md">
            <Image src={logo} alt={name} fill className="object-cover" sizes="48px" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-1 group-hover:text-brand-500 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold">{rating?.toFixed(1)}</span>
            {total_reviews > 0 && (
              <span className="text-xs text-muted-foreground ml-0.5">({total_reviews})</span>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-3">{cuisine_type}</p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDeliveryTime(avg_delivery_time || 30)}
          </span>
          <span className="flex items-center gap-1">
            <Truck className="h-3 w-3" />
            {delivery_fee === 0 ? "Free delivery" : formatCurrency(delivery_fee)}
          </span>
          {city && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {city}
            </span>
          )}
        </div>

        {min_order_amount > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            Min order: {formatCurrency(min_order_amount)}
          </p>
        )}
      </div>
    </Link>
  );
}
