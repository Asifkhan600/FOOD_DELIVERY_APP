"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreditCard, Banknote, Wallet, MapPin, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency, calculateTax } from "@/lib/utils";
import { TAX_RATE, PAYMENT_METHODS } from "@/lib/constants";
import toast from "react-hot-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PAYMENT_ICONS = { card: CreditCard, cod: Banknote, wallet: Wallet };

export default function CheckoutPage() {
  const router  = useRouter();
  const { items, subtotal, clearCart, restaurantName } = useCartStore();
  const { user } = useAuthStore();
  const [payMethod,   setPayMethod]   = useState("cod");
  const [placing,     setPlacing]     = useState(false);
  const [addressType, setAddressType] = useState("home");

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { street: "", city: "Lahore", special_instructions: "" }
  });

  const sub      = subtotal();
  const delivery = 50;
  const tax      = calculateTax(sub, TAX_RATE);
  const total    = sub + delivery + tax;

  if (items.length === 0) {
    return (
      <div className="page-container py-20 text-center">
        <p className="text-lg font-semibold mb-3">No items to checkout</p>
        <Link href="/restaurants" className="btn-primary text-sm">Browse Restaurants</Link>
      </div>
    );
  }

  const onSubmit = async (data) => {
    setPlacing(true);
    try {
      const body = {
        items, restaurantName,
        delivery_address: `${data.street}, ${data.city}`,
        payment_method: payMethod,
        special_instructions: data.special_instructions,
        subtotal: sub, delivery_fee: delivery, tax_amount: tax, total_amount: total,
      };
      const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Order failed");
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/tracking/${json.data?.order_id || "demo"}`);
    } catch (err) {
      // Demo mode: simulate success
      clearCart();
      toast.success("Order placed! (Demo mode)");
      router.push("/tracking/demo");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="page-container py-10">
      <h1 className="text-2xl font-bold text-foreground mb-2">Checkout</h1>
      <p className="text-muted-foreground text-sm mb-8">Review your order and choose delivery details</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery address */}
            <div className="card-base p-6">
              <h2 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-500" /> Delivery Address
              </h2>
              <div className="flex gap-2 mb-4">
                {["home", "work", "other"].map(t => (
                  <button key={t} type="button" onClick={() => setAddressType(t)}
                    className={cn("px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-colors",
                      addressType === t ? "bg-brand-500 text-white border-brand-500" : "border-border text-muted-foreground hover:border-brand-300")}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Street Address *</label>
                  <input {...register("street", { required: "Street address is required" })}
                    placeholder="e.g. 12 MM Alam Road, Gulberg III"
                    className={cn("input-base", errors.street && "border-destructive ring-destructive")} />
                  {errors.street && <p className="text-xs text-destructive mt-1">{errors.street.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">City *</label>
                  <input {...register("city", { required: "City is required" })}
                    placeholder="Lahore" className={cn("input-base", errors.city && "border-destructive")} />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="card-base p-6">
              <h2 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-brand-500" /> Payment Method
              </h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(({ value, label, icon }) => {
                  const Icon = PAYMENT_ICONS[value];
                  return (
                    <label key={value}
                      className={cn("flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors",
                        payMethod === value ? "border-brand-500 bg-brand-50 dark:bg-brand-950/20" : "border-border hover:border-brand-200")}>
                      <input type="radio" name="payment" value={value}
                        checked={payMethod === value} onChange={() => setPayMethod(value)} className="sr-only" />
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl",
                        payMethod === value ? "bg-brand-500 text-white" : "bg-muted text-muted-foreground")}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{icon} {value === "cod" ? "Pay at delivery" : value === "card" ? "Visa, Mastercard" : "Use wallet balance"}</p>
                      </div>
                      {payMethod === value && <CheckCircle2 className="ml-auto h-5 w-5 text-brand-500" />}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Special instructions */}
            <div className="card-base p-6">
              <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-brand-500" /> Special Instructions
              </h2>
              <textarea {...register("special_instructions")} rows={3}
                placeholder="Any allergies, preferences, or delivery instructions…"
                className="input-base resize-none" />
            </div>
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="card-base p-5 sticky top-24">
              <h2 className="font-semibold text-foreground mb-4">Order Summary</h2>
              {restaurantName && <p className="text-xs text-muted-foreground mb-3">From: <span className="font-medium">{restaurantName}</span></p>}

              <div className="space-y-2.5 mb-4 max-h-48 overflow-y-auto">
                {items.map(item => (
                  <div key={item.item_id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(sub)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{formatCurrency(delivery)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (5%)</span><span>{formatCurrency(tax)}</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
                  <span>Total</span><span className="text-brand-500">{formatCurrency(total)}</span>
                </div>
              </div>

              <button type="submit" disabled={placing}
                className="btn-primary w-full text-sm mt-5 flex items-center justify-center gap-2 disabled:opacity-70">
                {placing ? <><Loader2 className="h-4 w-4 animate-spin" /> Placing Order…</> : `Place Order · ${formatCurrency(total)}`}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-3">
                By placing order you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
