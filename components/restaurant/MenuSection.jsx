"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export function MenuSection({ categories = [], restaurantId, restaurantName }) {
  const addItem = useCartStore((s) => s.addItem);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.category || "");

  const handleAdd = (item) => {
    addItem({
      item_id: item.item_id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      quantity: 1,
      restaurant_id: restaurantId,
      restaurant_name: restaurantName,
    });
    toast.success(`${item.name} added to cart`);
  };

  if (!categories.length) return null;

  return (
    <div>
      {/* Category sticky tabs */}
      <div className="sticky top-28 z-20 bg-background border-b border-border -mx-4 px-4 mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 py-2 min-w-max">
          {categories.map(({ category }) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap transition-colors",
                activeCategory === category
                  ? "bg-brand-500 text-white border-brand-500"
                  : "border-border text-muted-foreground hover:border-brand-300 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      <div className="space-y-10">
        {categories.map(({ category, items }) => (
          <div key={category} id={`cat-${category}`}>
            <h2 className="text-base font-bold text-foreground mb-3 pb-2 border-b border-border">
              {category}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({items.length} items)
              </span>
            </h2>
            <div className="divide-y divide-border">
              {items.map((item) => (
                <div key={item.item_id} className="flex items-center gap-4 py-4">
                  {/* Image */}
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-muted shrink-0">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-2xl">🍽️</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{item.name}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm font-bold text-brand-500">
                        {formatCurrency(item.price)}
                      </span>
                      {item.calories && (
                        <span className="text-xs text-muted-foreground">{item.calories} kcal</span>
                      )}
                    </div>
                  </div>

                  {/* Add button */}
                  <button
                    onClick={() => handleAdd(item)}
                    disabled={!item.is_available}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
