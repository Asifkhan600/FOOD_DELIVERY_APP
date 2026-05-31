"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Star, Truck, ChevronRight, Plus, Minus, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { StarRating } from "@/components/common/StarRating";
import toast from "react-hot-toast";

const RESTAURANT = {
  restaurant_id: 1, name: "Burning Brownie", cuisine_type: "Burgers · Fast Food",
  rating: 4.8, total_reviews: 1240, delivery_fee: 0, avg_delivery_time: 25,
  is_open: true, city: "Lahore", address: "12 MM Alam Rd, Gulberg III, Lahore",
  opening_time: "11:00 AM", closing_time: "12:00 AM", min_order: 500,
  description: "Lahore's most loved burger joint since 2015. Fresh beef patties, brioche buns, house-made sauces.",
  banner_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop",
  image_url: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&auto=format&fit=crop",
};

const MENU = [
  { category: "Burgers", items: [
    { item_id: 1, name: "Classic Smash Burger", description: "Double smash patty, cheddar, pickles, special sauce", price: 890, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop", calories: 720, is_available: true },
    { item_id: 2, name: "BBQ Bacon Burger", description: "Crispy bacon, BBQ sauce, caramelized onions, jalapeños", price: 1050, image_url: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200&auto=format&fit=crop", calories: 890, is_available: true },
    { item_id: 3, name: "Mushroom Swiss Burger", description: "Sautéed mushrooms, Swiss cheese, aioli, arugula", price: 980, image_url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&auto=format&fit=crop", calories: 680, is_available: true },
  ]},
  { category: "Sides", items: [
    { item_id: 4, name: "Crispy Fries", description: "Hand-cut golden fries with seasoning salt", price: 250, image_url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&auto=format&fit=crop", calories: 380, is_available: true },
    { item_id: 5, name: "Onion Rings", description: "Beer-battered crunchy onion rings with dipping sauce", price: 320, image_url: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=200&auto=format&fit=crop", calories: 420, is_available: true },
  ]},
  { category: "Drinks", items: [
    { item_id: 6, name: "Classic Milkshake", description: "Thick, creamy milkshake — chocolate, vanilla or strawberry", price: 450, image_url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&auto=format&fit=crop", calories: 540, is_available: true },
    { item_id: 7, name: "Fresh Lemonade", description: "Freshly squeezed lemonade with mint", price: 220, image_url: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200&auto=format&fit=crop", calories: 120, is_available: true },
  ]},
];

const REVIEWS = [
  { review_id: 1, customer_name: "Sarah A.", rating: 5, comment: "Best burgers in Lahore, period. The smash burger is insanely good!", created_at: "2025-01-10" },
  { review_id: 2, customer_name: "Ali R.",   rating: 4, comment: "Great food and fast delivery. Fries were a bit cold but everything else was perfect.", created_at: "2025-01-08" },
  { review_id: 3, customer_name: "Maryam K.", rating: 5, comment: "Milkshakes are to die for. Will definitely order again.", created_at: "2025-01-05" },
];

function MenuItem({ item, restaurantId }) {
  const addItem = useCartStore(s => s.addItem);

  const handleAdd = () => {
    addItem({ item_id: item.item_id, name: item.name, price: item.price, image_url: item.image_url, quantity: 1, restaurant_id: restaurantId, restaurant_name: RESTAURANT.name });
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-0">
      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
        <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="80px" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-sm font-bold text-brand-500">{formatCurrency(item.price)}</span>
          {item.calories && <span className="text-xs text-muted-foreground">{item.calories} kcal</span>}
        </div>
      </div>
      <button onClick={handleAdd} disabled={!item.is_available}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function RestaurantDetailPage({ params }) {
  const [activeTab, setActiveTab] = useState("menu");
  const tabs = ["menu", "reviews", "info"];

  return (
    <div>
      {/* Banner */}
      <div className="relative h-56 md:h-72 bg-muted">
        <Image src={RESTAURANT.banner_url} alt={RESTAURANT.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 page-container pb-6">
          <div className="flex items-end gap-4">
            <div className="relative h-16 w-16 rounded-xl overflow-hidden border-2 border-white bg-white shadow-lg shrink-0">
              <Image src={RESTAURANT.image_url} alt={RESTAURANT.name} fill className="object-cover" sizes="64px" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{RESTAURANT.name}</h1>
              <p className="text-white/80 text-sm">{RESTAURANT.cuisine_type}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="border-b border-border bg-background">
        <div className="page-container py-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{RESTAURANT.rating}</span>
              <span className="text-muted-foreground">({RESTAURANT.total_reviews.toLocaleString()} reviews)</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" /> {RESTAURANT.avg_delivery_time} min
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Truck className="h-4 w-4" /> {RESTAURANT.delivery_fee === 0 ? "Free delivery" : formatCurrency(RESTAURANT.delivery_fee)}
            </div>
            <span className="text-border">|</span>
            <span className={RESTAURANT.is_open ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
              {RESTAURANT.is_open ? `Open · Closes ${RESTAURANT.closing_time}` : "Closed"}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-background border-b border-border">
        <div className="page-container">
          <div className="flex gap-0">
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === t ? "border-brand-500 text-brand-500" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="page-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Tab content */}
          <div className="lg:col-span-2">
            {activeTab === "menu" && (
              <div className="space-y-8">
                {MENU.map(cat => (
                  <div key={cat.category}>
                    <h2 className="text-base font-bold text-foreground mb-2 pb-2 border-b border-border">{cat.category}</h2>
                    <div>
                      {cat.items.map(item => (
                        <MenuItem key={item.item_id} item={item} restaurantId={RESTAURANT.restaurant_id} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl font-bold text-foreground">{RESTAURANT.rating}</div>
                  <div>
                    <StarRating rating={RESTAURANT.rating} size="md" />
                    <p className="text-xs text-muted-foreground mt-1">{RESTAURANT.total_reviews.toLocaleString()} reviews</p>
                  </div>
                </div>
                {REVIEWS.map(r => (
                  <div key={r.review_id} className="card-base p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold">{r.customer_name.slice(0,2)}</div>
                      <div>
                        <p className="text-sm font-medium">{r.customer_name}</p>
                        <StarRating rating={r.rating} size="sm" />
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">{r.created_at}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "info" && (
              <div className="card-base p-6 space-y-4">
                <div><p className="text-xs text-muted-foreground mb-1">Description</p><p className="text-sm">{RESTAURANT.description}</p></div>
                <div className="border-t border-border pt-4"><p className="text-xs text-muted-foreground mb-1">Address</p><p className="text-sm">{RESTAURANT.address}</p></div>
                <div className="border-t border-border pt-4"><p className="text-xs text-muted-foreground mb-1">Hours</p><p className="text-sm">{RESTAURANT.opening_time} – {RESTAURANT.closing_time}</p></div>
                <div className="border-t border-border pt-4"><p className="text-xs text-muted-foreground mb-1">Min Order</p><p className="text-sm">{formatCurrency(RESTAURANT.min_order)}</p></div>
              </div>
            )}
          </div>

          {/* Right: Cart summary */}
          <div className="hidden lg:block">
            <CartSidebar restaurantName={RESTAURANT.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CartSidebar({ restaurantName }) {
  const { items, subtotal, removeItem, updateQuantity } = useCartStore();
  const total = subtotal();

  if (items.length === 0) {
    return (
      <div className="sticky top-36 card-base p-6 text-center">
        <ShoppingCart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm font-medium text-foreground">Your cart is empty</p>
        <p className="text-xs text-muted-foreground mt-1">Add items from the menu</p>
      </div>
    );
  }

  return (
    <div className="sticky top-36 card-base p-5">
      <h3 className="font-semibold text-foreground mb-4">Your Order</h3>
      <div className="space-y-3 mb-4">
        {items.map(item => (
          <div key={item.item_id} className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 border border-border rounded-lg">
              <button onClick={() => updateQuantity(item.item_id, item.quantity - 1)} className="p-1.5 hover:bg-muted rounded-l-lg"><Minus className="h-3 w-3" /></button>
              <span className="text-xs font-medium w-5 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.item_id, item.quantity + 1)} className="p-1.5 hover:bg-muted rounded-r-lg"><Plus className="h-3 w-3" /></button>
            </div>
            <span className="flex-1 text-xs text-foreground truncate">{item.name}</span>
            <span className="text-xs font-medium shrink-0">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-3 mb-4">
        <div className="flex justify-between text-sm font-semibold">
          <span>Subtotal</span><span>{formatCurrency(total)}</span>
        </div>
      </div>
      <Link href="/cart" className="btn-primary w-full text-center text-sm">Go to Cart</Link>
    </div>
  );
}
