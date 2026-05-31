"use client";

import { useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Check, X as XIcon, Clock } from "lucide-react";
import toast from "react-hot-toast";

const INCOMING = [
  { order_id: 1041, customer_name: "Ali Hassan",  items: [{ name: "Smash Burger x1" }, { name: "Fries x2" }], total_amount: 1390, order_status: "pending",  placed_at: "2 min ago" },
  { order_id: 1040, customer_name: "Sara Khan",   items: [{ name: "BBQ Burger x2" }],                          total_amount: 2100, order_status: "accepted", placed_at: "8 min ago" },
  { order_id: 1039, customer_name: "Usman Raza",  items: [{ name: "Milkshake x1" }, { name: "Fries x1" }],    total_amount: 700,  order_status: "preparing",placed_at: "14 min ago" },
];

export default function RestaurantOverviewPage() {
  const [orders, setOrders] = useState(INCOMING);

  const updateStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.order_id === id ? { ...o, order_status: status } : o));
    toast.success(`Order #${id} → ${status}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Restaurant Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Today's snapshot</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Orders"   value="28"          iconName="ShoppingBag"  trend={14.3}  trendLabel="vs yesterday" color="brand"  />
        <StatCard title="Today's Revenue"  value="PKR 42,500"  iconName="DollarSign"   trend={8.7}   trendLabel="vs yesterday" color="green"  />
        <StatCard title="Pending Orders"   value="3"           iconName="Clock"        color="blue"  />
        <StatCard title="Active Menu Items"value="24"          iconName="UtensilsCrossed" color="purple" />
      </div>

      {/* Incoming orders */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Live Orders</h2>
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.order_id} className="card-base p-4 flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground text-sm">#{order.order_id}</span>
                  <StatusBadge status={order.order_status} />
                  <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />{order.placed_at}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{order.customer_name}</p>
                <p className="text-xs text-foreground">{order.items.map(i => i.name).join(", ")}</p>
                <p className="text-sm font-bold text-brand-500 mt-1">{formatCurrency(order.total_amount)}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {order.order_status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(order.order_id, "accepted")}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => updateStatus(order.order_id, "cancelled")}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
                      <XIcon className="h-4 w-4" />
                    </button>
                  </>
                )}
                {order.order_status === "accepted" && (
                  <button onClick={() => updateStatus(order.order_id, "preparing")}
                    className="btn-primary text-xs px-3 py-1.5">Start Preparing</button>
                )}
                {order.order_status === "preparing" && (
                  <button onClick={() => updateStatus(order.order_id, "ready")}
                    className="btn-primary text-xs px-3 py-1.5">Mark Ready</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
