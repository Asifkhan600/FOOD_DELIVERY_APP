"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Star, Clock, MapPin, CheckCircle2, Package, ChefHat, Bike, Home } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "pending",   label: "Order Placed",  Icon: Package,    desc: "We received your order" },
  { key: "accepted",  label: "Accepted",       Icon: CheckCircle2, desc: "Restaurant confirmed" },
  { key: "preparing", label: "Preparing",      Icon: ChefHat,    desc: "Your food is being prepared" },
  { key: "picked",    label: "On the Way",     Icon: Bike,       desc: "Rider picked up your order" },
  { key: "delivered", label: "Delivered",      Icon: Home,       desc: "Enjoy your meal!" },
];

const MOCK_ORDER = {
  order_id: "ORD-20250120-001",
  restaurant_name: "Burning Brownie",
  items: [
    { name: "Classic Smash Burger", quantity: 1, price: 890 },
    { name: "Crispy Fries", quantity: 2, price: 250 },
  ],
  total_amount: 1490,
  delivery_address: "12 MM Alam Road, Gulberg III, Lahore",
};

const MOCK_RIDER = {
  name: "Ahmad Hassan",
  phone: "+92 311 234 5678",
  vehicle: "Honda 125",
  rating: 4.9,
  avatar: "AH",
};

export default function TrackingPage({ params }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [eta, setEta] = useState(25);

  // Simulate live status updates
  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex(prev => {
        if (prev < STEPS.length - 1) {
          setEta(e => Math.max(0, e - 6));
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentStep = STEPS[stepIndex];
  const isDelivered = stepIndex === STEPS.length - 1;

  return (
    <div className="page-container py-10 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs text-muted-foreground mb-1">Order #{MOCK_ORDER.order_id}</p>
        <h1 className="text-2xl font-bold text-foreground">Track Your Order</h1>
        <p className="text-muted-foreground text-sm mt-1">From <span className="font-medium text-foreground">{MOCK_ORDER.restaurant_name}</span></p>
      </div>

      {/* ETA card */}
      {!isDelivered && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="card-base p-6 mb-6 bg-brand-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brand-100 text-sm font-medium">Estimated Arrival</p>
              <p className="text-4xl font-bold mt-1">{eta} min</p>
              <p className="text-brand-200 text-xs mt-1">{currentStep.desc}</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <currentStep.Icon className="h-8 w-8 text-white" />
            </div>
          </div>
        </motion.div>
      )}

      {isDelivered && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="card-base p-6 mb-6 border-green-200 bg-green-50 dark:bg-green-950/20 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-lg font-bold text-green-700 dark:text-green-400">Order Delivered!</h2>
          <p className="text-sm text-green-600 dark:text-green-500 mt-1">Enjoy your meal. Don't forget to leave a review!</p>
        </motion.div>
      )}

      {/* Progress stepper */}
      <div className="card-base p-6 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-6">Order Progress</h2>
        <div className="relative">
          {/* Line */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />
          <div className="absolute left-4 top-4 w-0.5 bg-brand-500 transition-all duration-700"
            style={{ height: `${(stepIndex / (STEPS.length - 1)) * 100}%` }} />

          <div className="space-y-6">
            {STEPS.map((step, i) => {
              const done    = i < stepIndex;
              const current = i === stepIndex;
              return (
                <div key={step.key} className="flex items-start gap-5">
                  <div className={cn(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500",
                    done    ? "border-brand-500 bg-brand-500 text-white" :
                    current ? "border-brand-500 bg-background" :
                              "border-border bg-background text-muted-foreground"
                  )}>
                    {done ? <CheckCircle2 className="h-4 w-4" /> : <step.Icon className="h-3.5 w-3.5" />}
                    {current && (
                      <span className="absolute -inset-1 rounded-full border-2 border-brand-400 animate-ping opacity-40" />
                    )}
                  </div>
                  <div className={cn("pt-0.5", !done && !current && "opacity-40")}>
                    <p className={cn("text-sm font-semibold", current && "text-brand-500")}>{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Rider info */}
        <div className="card-base p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Your Rider</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white font-semibold">
              {MOCK_RIDER.avatar}
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">{MOCK_RIDER.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {MOCK_RIDER.rating} · {MOCK_RIDER.vehicle}
              </div>
            </div>
          </div>
          <a href={`tel:${MOCK_RIDER.phone}`}
            className="flex items-center justify-center gap-2 w-full rounded-lg border border-border py-2 text-sm font-medium hover:bg-muted transition-colors">
            <Phone className="h-4 w-4 text-brand-500" /> Call Rider
          </a>
        </div>

        {/* Delivery address */}
        <div className="card-base p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Delivery Address</h3>
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">{MOCK_ORDER.delivery_address}</p>
          </div>
        </div>
      </div>

      {/* Order summary */}
      <div className="card-base p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Order Summary</h3>
        <div className="space-y-2.5 mb-3">
          {MOCK_ORDER.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
              <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-3 flex justify-between font-bold text-sm">
          <span>Total Paid</span>
          <span className="text-brand-500">{formatCurrency(MOCK_ORDER.total_amount)}</span>
        </div>
      </div>
    </div>
  );
}
