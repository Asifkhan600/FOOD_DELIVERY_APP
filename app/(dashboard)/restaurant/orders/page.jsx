"use client";

import { useState } from "react";
import { Check, X as XIcon, ChevronDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const TABS = ["new", "preparing", "ready", "all"];

const ORDERS_DATA = [
  { order_id: 1041, customer_name: "Ali Hassan",   items: ["Classic Smash Burger x1", "Fries x2"],      total_amount: 1390, order_status: "pending",   placed_at: "2025-01-20T15:28:00", delivery_address: "12 Model Town, Lahore" },
  { order_id: 1040, customer_name: "Sara Khan",    items: ["BBQ Bacon Burger x2"],                       total_amount: 2100, order_status: "accepted",  placed_at: "2025-01-20T15:12:00", delivery_address: "45 Gulberg III, Lahore" },
  { order_id: 1039, customer_name: "Usman Raza",   items: ["Milkshake x1", "Onion Rings x1"],            total_amount: 770,  order_status: "preparing", placed_at: "2025-01-20T14:55:00", delivery_address: "8 DHA Phase 5, Lahore" },
  { order_id: 1038, customer_name: "Maryam Ali",   items: ["Mushroom Swiss Burger x1", "Lemonade x2"],   total_amount: 1420, order_status: "ready",     placed_at: "2025-01-20T14:30:00", delivery_address: "22 Johar Town, Lahore" },
  { order_id: 1037, customer_name: "Bilal Ahmed",  items: ["Classic Smash Burger x3"],                   total_amount: 2670, order_status: "delivered", placed_at: "2025-01-20T13:45:00", delivery_address: "6 Garden Town, Lahore" },
];

const NEXT_STATUS = { pending: "accepted", accepted: "preparing", preparing: "ready", ready: "delivered" };
const NEXT_LABEL  = { pending: "Accept",   accepted: "Start Prep", preparing: "Mark Ready", ready: "Dispatched" };

export default function RestaurantOrdersPage() {
  const [orders,  setOrders]  = useState(ORDERS_DATA);
  const [activeTab, setActive] = useState("new");

  const updateStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.order_id === id ? { ...o, order_status: newStatus } : o));
    toast.success(`Order #${id} updated to ${newStatus}`);
  };

  const cancel = (id) => {
    setOrders(prev => prev.map(o => o.order_id === id ? { ...o, order_status: "cancelled" } : o));
    toast.error(`Order #${id} cancelled`);
  };

  const tabFilter = (tab) => {
    if (tab === "all")      return orders;
    if (tab === "new")      return orders.filter(o => o.order_status === "pending");
    if (tab === "preparing") return orders.filter(o => ["accepted","preparing"].includes(o.order_status));
    if (tab === "ready")    return orders.filter(o => o.order_status === "ready");
    return orders;
  };

  const displayed = tabFilter(activeTab);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage incoming and active orders</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide border-b border-border">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActive(tab)}
            className={cn("px-4 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors whitespace-nowrap -mb-px",
              activeTab === tab ? "border-brand-500 text-brand-500" : "border-transparent text-muted-foreground hover:text-foreground")}>
            {tab}
            <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
              {tabFilter(tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {displayed.length === 0 && (
          <div className="card-base p-12 text-center text-muted-foreground text-sm">No orders in this category</div>
        )}
        {displayed.map(order => (
          <div key={order.order_id} className={cn("card-base p-5 border-l-4 transition-colors",
            order.order_status === "pending"   ? "border-l-yellow-400" :
            order.order_status === "accepted"  ? "border-l-blue-400"   :
            order.order_status === "preparing" ? "border-l-orange-400" :
            order.order_status === "ready"     ? "border-l-brand-500"  :
            order.order_status === "delivered" ? "border-l-green-400"  : "border-l-red-400")}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="font-bold text-foreground">#{order.order_id}</span>
                  <StatusBadge status={order.order_status} />
                </div>
                <p className="text-sm font-medium text-foreground mb-0.5">{order.customer_name}</p>
                <p className="text-xs text-muted-foreground mb-2">{order.delivery_address}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {order.items.map((item, i) => (
                    <span key={i} className="text-xs bg-muted text-foreground px-2 py-1 rounded-md">{item}</span>
                  ))}
                </div>
                <p className="text-sm font-bold text-brand-500">{formatCurrency(order.total_amount)}</p>
              </div>

              {/* Actions */}
              {!["delivered","cancelled"].includes(order.order_status) && (
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => updateStatus(order.order_id, NEXT_STATUS[order.order_status])}
                    className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" /> {NEXT_LABEL[order.order_status]}
                  </button>
                  {order.order_status === "pending" && (
                    <button onClick={() => cancel(order.order_id)}
                      className="flex items-center gap-1.5 justify-center text-xs px-4 py-2 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors">
                      <XIcon className="h-3.5 w-3.5" /> Decline
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
