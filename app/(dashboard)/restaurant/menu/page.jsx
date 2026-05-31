"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const MENU_DATA = [
  { item_id: 1, name: "Classic Smash Burger", category: "Burgers", price: 890,  is_available: true,  image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&auto=format&fit=crop" },
  { item_id: 2, name: "BBQ Bacon Burger",      category: "Burgers", price: 1050, is_available: true,  image_url: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=100&auto=format&fit=crop" },
  { item_id: 3, name: "Mushroom Swiss Burger", category: "Burgers", price: 980,  is_available: false, image_url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=100&auto=format&fit=crop" },
  { item_id: 4, name: "Crispy Fries",          category: "Sides",   price: 250,  is_available: true,  image_url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100&auto=format&fit=crop" },
  { item_id: 5, name: "Onion Rings",           category: "Sides",   price: 320,  is_available: true,  image_url: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=100&auto=format&fit=crop" },
  { item_id: 6, name: "Classic Milkshake",     category: "Drinks",  price: 450,  is_available: true,  image_url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=100&auto=format&fit=crop" },
];

const CATEGORIES = [...new Set(MENU_DATA.map(i => i.category))];

export default function RestaurantMenuPage() {
  const [items,      setItems]      = useState(MENU_DATA);
  const [activeCat,  setActiveCat]  = useState("All");
  const [modal,      setModal]      = useState(false);
  const [editItem,   setEditItem]   = useState(null);
  const [form,       setForm]       = useState({ name: "", category: "Burgers", price: "", description: "" });

  const toggleAvailability = (id) => {
    setItems(prev => prev.map(i => i.item_id === id ? { ...i, is_available: !i.is_available } : i));
  };

  const filtered = activeCat === "All" ? items : items.filter(i => i.category === activeCat);

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error("Name and price required"); return; }
    if (editItem) {
      setItems(prev => prev.map(i => i.item_id === editItem.item_id ? { ...i, ...form, price: parseFloat(form.price) } : i));
      toast.success("Item updated!");
    } else {
      setItems(prev => [...prev, { item_id: Date.now(), ...form, price: parseFloat(form.price), is_available: true, image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&auto=format&fit=crop" }]);
      toast.success("Item added!");
    }
    setModal(false); setEditItem(null); setForm({ name: "", category: "Burgers", price: "", description: "" });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Menu Management</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{items.length} items</p>
        </div>
        <button onClick={() => { setEditItem(null); setForm({ name: "", category: "Burgers", price: "", description: "" }); setModal(true); }}
          className="btn-primary text-sm flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {["All", ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            className={cn("px-4 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap transition-colors",
              activeCat === cat ? "bg-brand-500 text-white border-brand-500" : "border-border text-muted-foreground hover:border-brand-300")}>
            {cat}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.item_id} className="card-base overflow-hidden">
            <div className="relative h-36 bg-muted">
              <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <label className="relative inline-flex cursor-pointer">
                  <input type="checkbox" checked={item.is_available} onChange={() => toggleAvailability(item.item_id)} className="sr-only peer" />
                  <div className="w-9 h-5 bg-muted rounded-full peer-checked:bg-brand-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4 shadow-sm" />
                </label>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-medium text-foreground text-sm leading-tight">{item.name}</h3>
                <span className="text-sm font-bold text-brand-500 shrink-0">{formatCurrency(item.price)}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{item.category} · {item.is_available ? "Available" : "Unavailable"}</p>
              <div className="flex gap-2">
                <button onClick={() => { setEditItem(item); setForm({ name: item.name, category: item.category, price: String(item.price), description: "" }); setModal(true); }}
                  className="flex-1 flex items-center justify-center gap-1.5 btn-secondary text-xs py-1.5">
                  <Edit2 className="h-3.5 w-3.5" /> Edit
                </button>
                <button onClick={() => { setItems(p => p.filter(i => i.item_id !== item.item_id)); toast.success("Item deleted"); }}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModal(false)} />
          <div className="relative card-base p-6 w-full max-w-md z-10">
            <h3 className="font-semibold mb-5">{editItem ? "Edit Item" : "Add Menu Item"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Item Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-base" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Category *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-base">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="New Category">New Category</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Price (PKR) *</label>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="input-base" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="input-base resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-secondary flex-1 text-sm" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn-primary flex-1 text-sm" onClick={handleSave}>{editItem ? "Save Changes" : "Add Item"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
