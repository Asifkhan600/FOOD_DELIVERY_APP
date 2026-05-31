"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User, MapPin, ShoppingBag, CreditCard, Edit2, Plus, Trash2, LogOut } from "lucide-react";
import { formatCurrency, formatDateTime, getInitials, getOrderStatusColor } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";

const TABS = [
  { key: "profile",  label: "Profile",         Icon: User },
  { key: "orders",   label: "Order History",   Icon: ShoppingBag },
  { key: "addresses",label: "Saved Addresses", Icon: MapPin },
  { key: "payments", label: "Payment History", Icon: CreditCard },
];

const MOCK_ORDERS = [
  { order_id: 1001, restaurant_name: "Burning Brownie", order_date: "2025-01-18T14:30:00", total_amount: 1390, order_status: "delivered", items_count: 3 },
  { order_id: 1002, restaurant_name: "Savour Foods",    order_date: "2025-01-15T19:45:00", total_amount: 890,  order_status: "delivered", items_count: 2 },
  { order_id: 1003, restaurant_name: "Pizza Palace",    order_date: "2025-01-10T12:20:00", total_amount: 2100, order_status: "cancelled", items_count: 4 },
  { order_id: 1004, restaurant_name: "Sakura Japanese", order_date: "2025-01-05T20:10:00", total_amount: 3200, order_status: "delivered", items_count: 5 },
];

const MOCK_ADDRESSES = [
  { address_id: 1, label: "Home",   street: "Phase 2, Hayatabad", city: "Peshawar", is_default: true  },
  { address_id: 2, label: "Office", street: "Saddar Road, Cantt", city: "Peshawar", is_default: false },
];

const MOCK_PAYMENTS = [
  { payment_id: 1, order_id: 1001, amount: 1390, method: "cod",  status: "paid",    created_at: "2025-01-18T14:35:00" },
  { payment_id: 2, order_id: 1002, amount: 890,  method: "card", status: "paid",    created_at: "2025-01-15T19:50:00" },
  { payment_id: 3, order_id: 1003, amount: 2100, method: "cod",  status: "refunded",created_at: "2025-01-10T12:25:00" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [name,  setName]  = useState(user?.name  || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (!user) router.push("/login"); }, [user, router]);
  if (!user) return null;

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast.success("Profile updated!");
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    router.push("/");
    toast.success("Signed out");
  };

  return (
    <div className="page-container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card-base p-5 text-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white text-xl font-bold mx-auto mb-3">
              {getInitials(user.name)}
            </div>
            <h2 className="font-semibold text-foreground">{user.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
            <span className="inline-block mt-2 badge badge-orange capitalize">{user.role}</span>
          </div>
          <div className="card-base overflow-hidden">
            {TABS.map(({ key, label, Icon }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={cn("flex items-center gap-3 w-full px-4 py-3 text-sm font-medium border-b border-border last:border-0 transition-colors",
                  activeTab === key ? "bg-brand-50 text-brand-600 dark:bg-brand-950/20 dark:text-brand-400" : "text-foreground hover:bg-muted")}>
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
            <button onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="card-base p-6">
              <h2 className="font-semibold text-foreground mb-6">Personal Information</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="input-base" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                  <input value={user.email} disabled className="input-base opacity-60 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Phone</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+92 300 1234567" className="input-base" />
                </div>
                <button onClick={handleSaveProfile} disabled={saving} className="btn-primary text-sm">
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="card-base overflow-hidden">
              <div className="p-5 border-b border-border">
                <h2 className="font-semibold text-foreground">Order History</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{MOCK_ORDERS.length} orders placed</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      {["Order ID", "Restaurant", "Date", "Items", "Total", "Status", ""].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MOCK_ORDERS.map(o => (
                      <tr key={o.order_id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">#{o.order_id}</td>
                        <td className="px-4 py-3 text-muted-foreground">{o.restaurant_name}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{formatDateTime(o.order_date)}</td>
                        <td className="px-4 py-3 text-muted-foreground">{o.items_count} items</td>
                        <td className="px-4 py-3 font-semibold">{formatCurrency(o.total_amount)}</td>
                        <td className="px-4 py-3"><StatusBadge status={o.order_status} /></td>
                        <td className="px-4 py-3">
                          <Link href={`/tracking/${o.order_id}`} className="text-xs text-brand-500 hover:underline">Track</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-foreground">Saved Addresses</h2>
                <button className="btn-primary text-sm flex items-center gap-1.5"><Plus className="h-4 w-4" /> Add Address</button>
              </div>
              {MOCK_ADDRESSES.map(addr => (
                <div key={addr.address_id} className="card-base p-5 flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-950/30 shrink-0">
                    <MapPin className="h-5 w-5 text-brand-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">{addr.label}</span>
                      {addr.is_default && <span className="badge-orange">Default</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{addr.street}</p>
                    <p className="text-xs text-muted-foreground">{addr.city}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors"><Edit2 className="h-4 w-4 text-muted-foreground" /></button>
                    <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="h-4 w-4 text-destructive" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div className="card-base overflow-hidden">
              <div className="p-5 border-b border-border">
                <h2 className="font-semibold text-foreground">Payment History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      {["Payment ID", "Order", "Amount", "Method", "Status", "Date"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MOCK_PAYMENTS.map(p => (
                      <tr key={p.payment_id} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">#{p.payment_id}</td>
                        <td className="px-4 py-3 text-muted-foreground">#{p.order_id}</td>
                        <td className="px-4 py-3 font-semibold">{formatCurrency(p.amount)}</td>
                        <td className="px-4 py-3 capitalize text-muted-foreground">{p.method}</td>
                        <td className="px-4 py-3">
                          <span className={cn("badge", p.status === "paid" ? "badge-green" : p.status === "refunded" ? "badge-orange" : "badge-gray")}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{formatDateTime(p.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
