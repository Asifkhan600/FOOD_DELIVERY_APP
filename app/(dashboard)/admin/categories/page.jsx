"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { DEFAULT_CATEGORIES } from "@/lib/constants";
import toast from "react-hot-toast";

export default function AdminCategoriesPage() {
  const [cats,  setCats]  = useState(DEFAULT_CATEGORIES.map((c, i) => ({ ...c, id: i + 1, items: Math.floor(Math.random() * 80) + 10 })));
  const [modal, setModal] = useState(false);
  const [newName,  setNewName]  = useState("");
  const [newEmoji, setNewEmoji] = useState("🍽️");

  const handleAdd = () => {
    if (!newName.trim()) return;
    setCats(prev => [...prev, { id: Date.now(), name: newName, icon: newEmoji, slug: newName.toLowerCase().replace(/\s+/g,"-"), items: 0 }]);
    setNewName(""); setNewEmoji("🍽️"); setModal(false);
    toast.success("Category added!");
  };

  const handleDelete = (id) => {
    setCats(prev => prev.filter(c => c.id !== id));
    toast.success("Category deleted");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Food Categories</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{cats.length} categories</p>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary text-sm flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cats.map(c => (
          <div key={c.id} className="card-base p-4 text-center group relative">
            <div className="text-3xl mb-2">{c.icon}</div>
            <h3 className="font-semibold text-foreground text-sm">{c.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{c.items} items</p>
            <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
              <button className="p-1 rounded-md bg-background border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Edit2 className="h-3 w-3" />
              </button>
              <button onClick={() => handleDelete(c.id)} className="p-1 rounded-md bg-background border border-border hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModal(false)} />
          <div className="relative card-base p-6 w-full max-w-sm z-10">
            <h3 className="font-semibold mb-5">Add Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Emoji Icon</label>
                <input value={newEmoji} onChange={e => setNewEmoji(e.target.value)} placeholder="🍽️" className="input-base text-2xl" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Category Name</label>
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Sea Food" className="input-base" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-secondary flex-1 text-sm" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn-primary flex-1 text-sm" onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
