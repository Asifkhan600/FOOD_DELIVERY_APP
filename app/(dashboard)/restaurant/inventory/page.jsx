"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { AlertTriangle, X as XIcon } from "lucide-react";

const INVENTORY = [
  { item_id: 1, name: "Beef Patties",     unit: "kg",   current_stock: 12,  low_threshold: 5,  status: "ok"  },
  { item_id: 2, name: "Brioche Buns",     unit: "pcs",  current_stock: 48,  low_threshold: 20, status: "ok"  },
  { item_id: 3, name: "Cheddar Cheese",   unit: "kg",   current_stock: 3,   low_threshold: 4,  status: "low" },
  { item_id: 4, name: "Potatoes",         unit: "kg",   current_stock: 25,  low_threshold: 10, status: "ok"  },
  { item_id: 5, name: "Lettuce",          unit: "kg",   current_stock: 1.5, low_threshold: 3,  status: "low" },
  { item_id: 6, name: "Tomatoes",         unit: "kg",   current_stock: 0,   low_threshold: 2,  status: "out" },
  { item_id: 7, name: "Special Sauce",    unit: "L",    current_stock: 8,   low_threshold: 3,  status: "ok"  },
  { item_id: 8, name: "Chicken Fillets",  unit: "kg",   current_stock: 6,   low_threshold: 5,  status: "ok"  },
];

const STATUS_CONFIG = {
  ok:  { label: "In Stock",  className: "badge-green" },
  low: { label: "Low Stock", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-400 text-xs font-medium px-2 py-0.5 rounded-md" },
  out: { label: "Out of Stock", className: "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 text-xs font-medium px-2 py-0.5 rounded-md" },
};

export default function RestaurantInventoryPage() {
  const [items, setItems] = useState(INVENTORY);
  const [editId, setEditId] = useState(null);
  const [newQty, setNewQty] = useState("");

  const lowItems = items.filter(i => i.status !== "ok");

  const saveUpdate = (id) => {
    const qty = parseFloat(newQty);
    if (isNaN(qty) || qty < 0) { toast.error("Invalid quantity"); return; }
    setItems(prev => prev.map(i => {
      if (i.item_id !== id) return i;
      const status = qty === 0 ? "out" : qty < i.low_threshold ? "low" : "ok";
      return { ...i, current_stock: qty, status };
    }));
    toast.success("Stock updated!"); setEditId(null); setNewQty("");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Inventory</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Track ingredient stock levels</p>
      </div>

      {/* Alert for low stock */}
      {lowItems.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-950/20 p-4">
          <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">
              {lowItems.length} item{lowItems.length > 1 ? "s" : ""} need attention
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-0.5">
              {lowItems.map(i => i.name).join(", ")}
            </p>
          </div>
        </div>
      )}

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/40 border-b border-border">
              {["Ingredient", "Unit", "Current Stock", "Low Threshold", "Status", "Action"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {items.map(item => {
                const conf = STATUS_CONFIG[item.status];
                return (
                  <tr key={item.item_id} className={cn("hover:bg-muted/20", item.status === "out" && "bg-red-50/50 dark:bg-red-950/10")}>
                    <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.unit}</td>
                    <td className="px-4 py-3">
                      {editId === item.item_id ? (
                        <div className="flex items-center gap-2">
                          <input type="number" value={newQty} onChange={e => setNewQty(e.target.value)}
                            className="input-base w-24 text-sm py-1" autoFocus />
                          <button onClick={() => saveUpdate(item.item_id)} className="btn-primary text-xs px-2 py-1">Save</button>
                          <button onClick={() => setEditId(null)} className="text-muted-foreground hover:text-foreground"><XIcon className="h-4 w-4" /></button>
                        </div>
                      ) : (
                        <span className={cn("font-semibold", item.status === "out" ? "text-red-600" : item.status === "low" ? "text-yellow-600" : "text-foreground")}>
                          {item.current_stock} {item.unit}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{item.low_threshold} {item.unit}</td>
                    <td className="px-4 py-3"><span className={conf.className}>{conf.label}</span></td>
                    <td className="px-4 py-3">
                      <button onClick={() => { setEditId(item.item_id); setNewQty(String(item.current_stock)); }}
                        className="text-xs text-brand-500 hover:underline font-medium">Update Stock</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
