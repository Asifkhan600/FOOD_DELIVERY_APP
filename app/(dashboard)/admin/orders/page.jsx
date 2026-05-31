"use client";

import { useState } from "react";
import { Search, Filter, Eye, CheckCircle2, XCircle } from "lucide-react";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cn } from "@/lib/utils";

const STATUSES = ["all", "pending", "accepted", "preparing", "picked", "delivered", "cancelled"];

const ORDERS = [
  { order_id: 1041, customer_name: "Ali Hassan",   restaurant_name: "Burning Brownie",  total_amount: 1390, order_status: "delivered", order_date: "2025-01-20T15:30:00", items: 3 },
  { order_id: 1040, customer_name: "Sara Khan",    restaurant_name: "Savour Foods",     total_amount: 890,  order_status: "preparing", order_date: "2025-01-20T15:15:00", items: 2 },
  { order_id: 1039, customer_name: "Usman Raza",   restaurant_name: "Pizza Palace",     total_amount: 2100, order_status: "pending",   order_date: "2025-01-20T15:00:00", items: 4 },
  { order_id: 1038, customer_name: "Maryam Ali",   restaurant_name: "Sakura Japanese",  total_amount: 3200, order_status: "picked",    order_date: "2025-01-20T14:45:00", items: 5 },
  { order_id: 1037, customer_name: "Bilal Ahmed",  restaurant_name: "BBQ Tonight",      total_amount: 1750, order_status: "delivered", order_date: "2025-01-20T14:30:00", items: 3 },
  { order_id: 1036, customer_name: "Nadia Shah",   restaurant_name: "Green Garden",     total_amount: 680,  order_status: "cancelled", order_date: "2025-01-20T14:00:00", items: 2 },
  { order_id: 1035, customer_name: "Hamza Tariq",  restaurant_name: "Sweet Tooth",      total_amount: 450,  order_status: "delivered", order_date: "2025-01-20T13:30:00", items: 1 },
  { order_id: 1034, customer_name: "Fatima Malik", restaurant_name: "Dragon Palace",    total_amount: 1890, order_status: "accepted",  order_date: "2025-01-20T13:00:00", items: 4 },
];

export default function AdminOrdersPage() {
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected,     setSelected]     = useState(null);
  const [page,         setPage]         = useState(1);

  const filtered = ORDERS.filter(o => {
    const matchSearch = o.customer_name.toLowerCase().includes(search.toLowerCase()) || String(o.order_id).includes(search) || o.restaurant_name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.order_status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Orders Management</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{ORDERS.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders…" className="input-base pl-9" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border capitalize transition-colors",
                statusFilter === s ? "bg-brand-500 text-white border-brand-500" : "border-border text-muted-foreground hover:border-brand-300")}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/40 border-b border-border">
              {["Order ID", "Customer", "Restaurant", "Items", "Total", "Status", "Date", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map(o => (
                <tr key={o.order_id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground">#{o.order_id}</td>
                  <td className="px-4 py-3 text-foreground">{o.customer_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.restaurant_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.items}</td>
                  <td className="px-4 py-3 font-medium">{formatCurrency(o.total_amount)}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.order_status} /></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{formatDateTime(o.order_date)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(o)} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">No orders found</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {ORDERS.length} orders</p>
          <div className="flex gap-1.5">
            {[1,2,3].map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={cn("h-7 w-7 text-xs rounded-md transition-colors", page === p ? "bg-brand-500 text-white" : "hover:bg-muted text-muted-foreground")}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="relative card-base p-6 w-full max-w-md z-10">
            <h3 className="font-semibold text-foreground mb-4">Order #{selected.order_id}</h3>
            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span>{selected.customer_name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Restaurant</span><span>{selected.restaurant_name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-semibold">{formatCurrency(selected.total_amount)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><StatusBadge status={selected.order_status} /></div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary flex-1 text-sm" onClick={() => setSelected(null)}>Close</button>
              <button className="btn-primary flex-1 text-sm">Update Status</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
