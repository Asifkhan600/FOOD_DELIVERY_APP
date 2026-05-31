"use client";

import { useState } from "react";
import { MapPin, Phone, Package, Check, Navigation } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const CURRENT_DELIVERY = {
  order_id: 1041,
  customer: { name: "Ali Hassan", phone: "+92 300 1234567", address: "12 Model Town, Block A, Lahore" },
  restaurant: { name: "Burning Brownie", address: "45 MM Alam Rd, Gulberg III, Lahore" },
  items: ["Classic Smash Burger x1", "Crispy Fries x2"],
  total_amount: 1390,
  payment_method: "cod",
  assigned_at: "5 min ago",
};

const PENDING_QUEUE = [
  { order_id: 1042, restaurant_name: "Savour Foods",  delivery_address: "67 Garden Town, Lahore",  total_amount: 890  },
  { order_id: 1043, restaurant_name: "Pizza Palace",   delivery_address: "23 DHA Phase 6, Lahore",  total_amount: 1600 },
];

export default function RiderDeliveriesPage() {
  const [phase, setPhase] = useState("pickup"); // pickup | delivering | done

  const handlePickup = () => {
    setPhase("delivering");
    toast.success("Order picked up! Heading to customer.");
  };

  const handleDeliver = () => {
    setPhase("done");
    toast.success("🎉 Order delivered! Great job!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-foreground">Deliveries</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your current assignment</p>
      </div>

      {/* Current delivery */}
      {phase !== "done" ? (
        <div className="card-base overflow-hidden border-brand-500 border-2">
          <div className="bg-brand-500 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Navigation className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {phase === "pickup" ? "Pickup from Restaurant" : "Deliver to Customer"}
              </span>
            </div>
            <span className="text-xs text-white/80">#{CURRENT_DELIVERY.order_id}</span>
          </div>

          <div className="p-5 space-y-5">
            {/* Pickup point */}
            <div className={cn("rounded-xl p-4 border-2 transition-colors", phase === "pickup" ? "border-brand-500 bg-brand-50 dark:bg-brand-950/20" : "border-border opacity-60")}>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white text-xs font-bold shrink-0">A</div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Pickup</p>
                  <p className="font-semibold text-foreground">{CURRENT_DELIVERY.restaurant.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{CURRENT_DELIVERY.restaurant.address}</p>
                </div>
              </div>
            </div>

            {/* Drop point */}
            <div className={cn("rounded-xl p-4 border-2 transition-colors", phase === "delivering" ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-border opacity-60")}>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold shrink-0">B</div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Drop-off</p>
                  <p className="font-semibold text-foreground">{CURRENT_DELIVERY.customer.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{CURRENT_DELIVERY.customer.address}</p>
                </div>
                <a href={`tel:${CURRENT_DELIVERY.customer.phone}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              </div>
            </div>

            {/* Order info */}
            <div className="bg-muted/50 rounded-xl p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Order Items</p>
              {CURRENT_DELIVERY.items.map((item, i) => (
                <p key={i} className="text-sm text-foreground">{item}</p>
              ))}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-sm font-bold text-brand-500">{formatCurrency(CURRENT_DELIVERY.total_amount)}</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md uppercase">{CURRENT_DELIVERY.payment_method}</span>
              </div>
            </div>

            {/* Action button */}
            {phase === "pickup" ? (
              <button onClick={handlePickup}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                <Package className="h-4 w-4" /> Confirm Pickup
              </button>
            ) : (
              <button onClick={handleDeliver}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors">
                <Check className="h-4 w-4" /> Mark as Delivered
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="card-base p-12 text-center">
          <div className="text-5xl mb-3">✅</div>
          <h2 className="text-lg font-bold text-foreground">Delivery Complete!</h2>
          <p className="text-muted-foreground text-sm mt-1">You earned <span className="font-semibold text-brand-500">PKR 120</span> for this delivery</p>
          <button onClick={() => setPhase("pickup")} className="btn-primary text-sm mt-4">Next Delivery</button>
        </div>
      )}

      {/* Pending queue */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Upcoming ({PENDING_QUEUE.length})</h2>
        <div className="space-y-3">
          {PENDING_QUEUE.map(order => (
            <div key={order.order_id} className="card-base p-4 flex items-center gap-4 opacity-70">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted shrink-0">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">#{order.order_id} · {order.restaurant_name}</p>
                <p className="text-xs text-muted-foreground truncate">{order.delivery_address}</p>
              </div>
              <span className="text-sm font-semibold shrink-0">{formatCurrency(order.total_amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
