"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Trash2, ShoppingBag, Tag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency, calculateTax } from "@/lib/utils";
import { TAX_RATE } from "@/lib/constants";
import toast from "react-hot-toast";


export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, restaurantName, subtotal } = useCartStore();
  const [couponCode, setCouponCode]   = useState("");
  const [discount,   setDiscount]     = useState(0);
  const [couponMsg,  setCouponMsg]    = useState("");
  const [applying,   setApplying]     = useState(false);

  const sub      = subtotal();
  const delivery = items.length > 0 ? 50 : 0;
  const tax      = calculateTax(sub, TAX_RATE);
  const total    = sub + delivery + tax - discount;

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplying(true);
    await new Promise(r => setTimeout(r, 800));
    if (couponCode.toUpperCase() === "SAVE50") {
      setDiscount(50); setCouponMsg("Coupon applied! PKR 50 off");
      toast.success("Coupon applied successfully!");
    } else if (couponCode.toUpperCase() === "FIRST20") {
      const d = Math.round(sub * 0.2);
      setDiscount(d); setCouponMsg(`20% off applied! PKR ${d} saved`);
      toast.success("Coupon applied!");
    } else {
      setDiscount(0); setCouponMsg("Invalid or expired coupon code.");
      toast.error("Invalid coupon code");
    }
    setApplying(false);
  };

  if (items.length === 0) {
    return (
      <div className="page-container py-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-5">
          <ShoppingBag className="h-9 w-9 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground text-sm mb-6 max-w-xs">
          You haven't added anything yet. Browse restaurants and find something delicious.
        </p>
        <Link href="/restaurants" className="btn-primary text-sm">Browse Restaurants</Link>
      </div>
    );
  }

  return (
    <div className="page-container py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Cart</h1>
          {restaurantName && <p className="text-sm text-muted-foreground mt-0.5">From <span className="font-medium text-foreground">{restaurantName}</span></p>}
        </div>
        <button onClick={() => { clearCart(); toast("Cart cleared"); }} className="text-sm text-destructive hover:underline">Clear cart</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence>
            {items.map(item => (
              <motion.div key={item.item_id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                className="card-base flex items-center gap-4 p-4">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                  {item.image_url
                    ? <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="64px" />
                    : <div className="w-full h-full flex items-center justify-center text-2xl">🍽️</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatCurrency(item.price)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.item_id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center hover:bg-muted transition-colors">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.item_id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center hover:bg-muted transition-colors">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="w-20 text-right text-sm font-semibold text-foreground">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                  <button onClick={() => removeItem(item.item_id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="card-base p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4 text-brand-500" /> Coupon Code
            </h3>
            <div className="flex gap-2">
              <input value={couponCode} onChange={e => setCouponCode(e.target.value)}
                onKeyDown={e => e.key === "Enter" && applyCoupon()}
                placeholder="e.g. SAVE50" className="input-base flex-1 text-sm" />
              <button onClick={applyCoupon} disabled={applying}
                className="btn-primary text-sm px-4 shrink-0 disabled:opacity-60">
                {applying ? "..." : "Apply"}
              </button>
            </div>
            {couponMsg && (
              <p className={`text-xs mt-2 ${discount > 0 ? "text-green-600" : "text-destructive"}`}>{couponMsg}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">Try: SAVE50 or FIRST20</p>
          </div>

          {/* Price breakdown */}
          <div className="card-base p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(sub)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery fee</span><span>{delivery === 0 ? "Free" : formatCurrency(delivery)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax (5%)</span><span>{formatCurrency(tax)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600"><span>Coupon discount</span><span>- {formatCurrency(discount)}</span></div>
              )}
              <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                <span>Total</span><span className="text-brand-500">{formatCurrency(Math.max(0, total))}</span>
              </div>
            </div>
            <Link href="/checkout" className="btn-primary w-full text-center text-sm mt-5 flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/restaurants" className="btn-ghost w-full text-center text-sm mt-2 text-muted-foreground">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
