"use client";

import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { formatCurrency, getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const RIDERS = [
  { rider_id: 1, name: "Ahmad Hassan",   phone: "+92 311 1111111", vehicle: "Honda 125",     rating: 4.9, deliveries: 842, earnings: 126000, status: "available" },
  { rider_id: 2, name: "Zain Akhtar",    phone: "+92 312 2222222", vehicle: "Yamaha YBR",    rating: 4.7, deliveries: 634, earnings: 95000,  status: "busy"      },
  { rider_id: 3, name: "Faisal Butt",    phone: "+92 313 3333333", vehicle: "Honda CG 125",  rating: 4.5, deliveries: 421, earnings: 63000,  status: "offline"   },
  { rider_id: 4, name: "Tariq Mehmood",  phone: "+92 314 4444444", vehicle: "Suzuki GR 150", rating: 4.8, deliveries: 1020, earnings: 153000, status: "available" },
  { rider_id: 5, name: "Imran Siddiqui", phone: "+92 315 5555555", vehicle: "Honda 70",      rating: 4.3, deliveries: 287, earnings: 43000,  status: "busy"      },
];

const STATUS_COLORS = {
  available: "badge-green",
  busy:      "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 text-xs font-medium px-2 py-0.5 rounded-md",
  offline:   "badge-gray",
};

export default function AdminRidersPage() {
  const [modal, setModal] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Delivery Riders</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{RIDERS.length} riders registered</p>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary text-sm flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Add Rider
        </button>
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/40 border-b border-border">
              {["Rider", "Phone", "Vehicle", "Rating", "Deliveries", "Earnings", "Status"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {RIDERS.map(r => (
                <tr key={r.rider_id} className="hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-charcoal-200 dark:bg-charcoal-700 text-foreground text-xs font-bold">
                        {getInitials(r.name)}
                      </div>
                      <span className="font-medium text-foreground">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.vehicle}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{r.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{r.deliveries.toLocaleString()}</td>
                  <td className="px-4 py-3 font-semibold text-brand-500">{formatCurrency(r.earnings)}</td>
                  <td className="px-4 py-3">
                    <span className={cn("badge", STATUS_COLORS[r.status])}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModal(false)} />
          <div className="relative card-base p-6 w-full max-w-md z-10">
            <h3 className="font-semibold mb-5">Add New Rider</h3>
            <div className="space-y-4">
              {["Full Name", "Phone Number", "CNIC Number", "Vehicle Type", "Vehicle Registration"].map(f => (
                <div key={f}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">{f}</label>
                  <input placeholder={f} className="input-base" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-secondary flex-1 text-sm" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn-primary flex-1 text-sm" onClick={() => setModal(false)}>Add Rider</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
