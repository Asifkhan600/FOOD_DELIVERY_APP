"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, ShoppingCart, Star, Clock, Flame, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { StarRating } from "@/components/common/StarRating";
import toast from "react-hot-toast";

const FOOD_ITEM = {
  item_id: 1, name: "Classic Smash Burger",
  restaurant_id: 1, restaurant_name: "Burning Brownie",
  description: "Two hand-smashed beef patties on a toasted brioche bun, loaded with aged cheddar, bread-and-butter pickles, shredded lettuce, and our signature special sauce. A Lahore favourite since 2015.",
  price: 890, rating: 4.8, total_reviews: 342, calories: 720, prep_time: 12,
  is_available: true,
  image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
  ingredients: ["Beef patty (100% pure beef)", "Brioche bun", "Aged cheddar", "Pickles", "Shredded lettuce", "Special sauce", "Caramelized onions"],
  allergens: ["Gluten", "Dairy", "Eggs"],
  nutrition: { calories: 720, protein: 42, carbs: 58, fat: 34, fiber: 3 },
};

const RELATED = [
  { item_id: 2, name: "BBQ Bacon Burger",     price: 1050, image_url: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200&auto=format&fit=crop" },
  { item_id: 3, name: "Mushroom Swiss Burger", price: 980,  image_url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&auto=format&fit=crop" },
  { item_id: 4, name: "Crispy Fries",          price: 250,  image_url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&auto=format&fit=crop" },
];

export default function FoodDetailPage({ params }) {
  const [qty,      setQty]     = useState(1);
  const [wishlist, setWishlist]= useState(false);
  const addItem = useCartStore(s => s.addItem);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ item_id: FOOD_ITEM.item_id, name: FOOD_ITEM.name, price: FOOD_ITEM.price, image_url: FOOD_ITEM.image_url, quantity: 1, restaurant_id: FOOD_ITEM.restaurant_id, restaurant_name: FOOD_ITEM.restaurant_name });
    }
    toast.success(`${qty}× ${FOOD_ITEM.name} added to cart!`);
  };

  return (
    <div className="page-container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative">
          <div className="relative h-80 lg:h-[440px] rounded-2xl overflow-hidden bg-muted">
            <Image src={FOOD_ITEM.image_url} alt={FOOD_ITEM.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority />
          </div>
          <button onClick={() => setWishlist(v => !v)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg hover:scale-105 transition-transform">
            <Heart className={`h-5 w-5 ${wishlist ? "fill-red-500 text-red-500" : "text-charcoal-400"}`} />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href={`/restaurants/${FOOD_ITEM.restaurant_id}`} className="hover:text-foreground">{FOOD_ITEM.restaurant_name}</Link>
            <span>/</span>
            <span className="text-foreground">{FOOD_ITEM.name}</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">{FOOD_ITEM.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <StarRating rating={FOOD_ITEM.rating} size="sm" />
              <span className="text-sm font-medium">{FOOD_ITEM.rating}</span>
              <span className="text-xs text-muted-foreground">({FOOD_ITEM.total_reviews} reviews)</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-5">{FOOD_ITEM.description}</p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { Icon: Flame, label: "Calories",  value: `${FOOD_ITEM.nutrition.calories} kcal` },
              { Icon: Clock, label: "Prep Time", value: `${FOOD_ITEM.prep_time} min` },
              { Icon: Star,  label: "Rating",    value: FOOD_ITEM.rating },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="card-base p-3 text-center">
                <Icon className="h-4 w-4 text-brand-500 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>

          {/* Price + Qty + Add to Cart */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-brand-500">{formatCurrency(FOOD_ITEM.price * qty)}</span>
            {qty > 1 && <span className="text-sm text-muted-foreground">{formatCurrency(FOOD_ITEM.price)} each</span>}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border rounded-xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center hover:bg-muted transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-lg font-semibold">{qty}</span>
              <button onClick={() => setQty(q => Math.min(10, q + 1))} className="flex h-11 w-11 items-center justify-center hover:bg-muted transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button onClick={handleAdd} disabled={!FOOD_ITEM.is_available}
              className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-40">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
          </div>

          <Link href={`/restaurants/${FOOD_ITEM.restaurant_id}`}
            className="text-sm text-brand-500 hover:underline font-medium mb-6">
            View full menu at {FOOD_ITEM.restaurant_name} →
          </Link>

          {/* Nutrition */}
          <div className="card-base p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Nutrition (per serving)</h3>
            <div className="grid grid-cols-5 gap-2 text-center">
              {Object.entries(FOOD_ITEM.nutrition).map(([key, val]) => (
                <div key={key}>
                  <p className="text-xs text-muted-foreground capitalize">{key}</p>
                  <p className="text-sm font-bold text-foreground">{val}{key === "calories" ? "" : "g"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related items */}
      <div className="mt-14">
        <h2 className="text-lg font-bold text-foreground mb-5">You Might Also Like</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {RELATED.map(item => (
            <Link key={item.item_id} href={`/food/${item.item_id}`}
              className="group flex flex-col rounded-xl border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden w-44 shrink-0">
              <div className="relative h-32 overflow-hidden bg-muted">
                <Image src={item.image_url} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="176px" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-brand-500 transition-colors">{item.name}</p>
                <p className="text-sm font-bold text-brand-500 mt-1">{formatCurrency(item.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
