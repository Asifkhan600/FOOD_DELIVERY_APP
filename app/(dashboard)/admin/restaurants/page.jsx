"use client";

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { StarRating } from "@/components/common/StarRating";
import { cn } from "@/lib/utils";

const RESTAURANTS = [
  { restaurant_id: 1, name: "Burning Brownie", city: "Lahore",    cuisine_type: "Burgers",  rating: 4.8, total_orders: 842, revenue: 1240000, is_active: true  },
  { restaurant_id: 2, name: "Savour Foods",    city: "Lahore",    cuisine_type: "Biryani",  rating: 4.6, total_orders: 721, revenue: 980000,  is_active: true  },
  { restaurant_id: 3, name: "Sakura Japanese", city: "Karachi",   cuisine_type: "Sushi",    rating: 4.7, total_orders: 412, revenue: 2100000, is_active: true  },
  { restaurant_id: 4, name: "Pizza Palace",    city: "Islamabad", cuisine_type: "Pizza",    rating: 4.5, total_orders: 580, revenue: 870000,  is_active: false },
  { restaurant_id: 5, name: "BBQ Tonight",     city: "Lahore",    cuisine_type: "BBQ",      rating: 4.4, total_orders: 614, revenue: 1560000, is_active: true  },
];

export default function AdminRestaurantsPage() {
  const [search, setSearch] = useState("");
  const [data,   setData]   = useState(RESTAURANTS);
  const [modal,  setModal]  = useState(false);

  const filtered = data.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.city.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id) => {
    setData(prev => prev.map(r => r.restaurant_id === id ? { ...r, is_active: !r.is_active } : r));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Restaurants</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{data.length} registered restaurants</p>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary text-sm flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Add Restaurant
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search restaurants…" className="input-base pl-9" />
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/40 border-b border-border">
              {["Name", "City", "Cuisine", "Rating", "Orders", "Revenue", "Status", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map(r => (
                <tr key={r.restaurant_id} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium text-foreground">{r.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.city}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.cuisine_type}</td>
                  <td className="px-4 py-3"><StarRating rating={r.rating} size="sm" /></td>
                  <td className="px-4 py-3 text-muted-foreground">{r.total_orders}</td>
                  <td className="px-4 py-3 font-medium">{formatCurrency(r.revenue)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(r.restaurant_id)}>
                      {r.is_active
                        ? <ToggleRight className="h-5 w-5 text-green-500" />
                        : <ToggleLeft  className="h-5 w-5 text-muted-foreground" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
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
          <div className="relative card-base p-6 w-full max-w-lg z-10">
            <h3 className="font-semibold text-foreground mb-5">Add New Restaurant</h3>
            <div className="grid grid-cols-2 gap-4">
              {["Restaurant Name", "City", "Cuisine Type", "Delivery Fee (PKR)", "Min Order (PKR)", "Phone"].map(f => (
                <div key={f} className={f === "Restaurant Name" ? "col-span-2" : ""}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">{f}</label>
                  <input placeholder={f} className="input-base" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-secondary flex-1 text-sm" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn-primary flex-1 text-sm" onClick={() => setModal(false)}>Add Restaurant</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
