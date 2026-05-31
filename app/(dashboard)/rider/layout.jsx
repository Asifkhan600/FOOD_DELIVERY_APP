"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UtensilsCrossed, MapPin, Clock, DollarSign, LogOut, Menu, ChevronRight, Power } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import toast from "react-hot-toast";

const NAV = [
  { href: "/rider",          label: "Deliveries", Icon: MapPin      },
  { href: "/rider/history",  label: "History",    Icon: Clock       },
  { href: "/rider/earnings", label: "Earnings",   Icon: DollarSign  },
];

export default function RiderLayout({ children }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline,    setIsOnline]    = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout(); router.push("/"); toast.success("Logged out");
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-charcoal-900">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-charcoal-700">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
          <UtensilsCrossed className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Rider App</p>
          <p className="text-xs text-charcoal-400">Smart Food Delivery</p>
        </div>
      </div>

      {/* Online/Offline toggle */}
      <div className="px-4 py-4 border-b border-charcoal-700">
        <button onClick={() => { setIsOnline(v => !v); toast.success(isOnline ? "You are now offline" : "You are now online!"); }}
          className={cn("flex items-center gap-2.5 w-full rounded-lg px-3 py-3 text-sm font-semibold transition-colors",
            isOnline ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-charcoal-800 text-charcoal-400 border border-charcoal-600")}>
          <Power className="h-4 w-4" />
          {isOnline ? "🟢 Online — Ready for Orders" : "⭕ Offline"}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== "/rider" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-brand-500 text-white" : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white")}>
              <Icon className="h-4 w-4 shrink-0" />
              {label}
              {active && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="border-t border-charcoal-700 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
              {getInitials(user.name)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-charcoal-400">Delivery Rider</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-charcoal-400 hover:text-white hover:bg-charcoal-800 transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-muted/30 overflow-hidden">
      <aside className="hidden lg:block w-60 shrink-0"><Sidebar /></aside>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-60"><Sidebar /></div>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-charcoal-900 border-b border-charcoal-700">
          <button onClick={() => setSidebarOpen(true)} className="text-white"><Menu className="h-5 w-5" /></button>
          <span className="text-sm font-semibold text-white">Rider</span>
          <span className={cn("ml-auto text-xs font-medium px-2 py-0.5 rounded-full", isOnline ? "bg-green-500/20 text-green-400" : "bg-charcoal-700 text-charcoal-400")}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
