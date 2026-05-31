"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UtensilsCrossed, LayoutDashboard, ShoppingBag, Store, Users, Bike, Tag, Ticket, Receipt, LogOut, Menu, X, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { ADMIN_NAV } from "@/lib/constants";
import toast from "react-hot-toast";

const ICON_MAP = { LayoutDashboard, ShoppingBag, Store, Users, Bike, Tag, Ticket, Receipt };

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout(); router.push("/"); toast.success("Logged out");
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-charcoal-900">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-charcoal-700">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
          <UtensilsCrossed className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Admin Panel</p>
          <p className="text-xs text-charcoal-400">Smart Food Delivery</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {ADMIN_NAV.map(({ href, label, icon }) => {
          const Icon = ICON_MAP[icon] || LayoutDashboard;
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-brand-500 text-white" : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"
              )}>
              <Icon className="h-4 w-4 shrink-0" />
              {label}
              {active && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      {user && (
        <div className="border-t border-charcoal-700 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
              {getInitials(user.name)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-charcoal-400 truncate">{user.email}</p>
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
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 shrink-0 overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-60 overflow-y-auto">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-charcoal-900 border-b border-charcoal-700">
          <button onClick={() => setSidebarOpen(true)} className="text-white">
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-white">Admin Panel</span>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
