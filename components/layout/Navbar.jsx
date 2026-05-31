"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Menu, X, Sun, Moon, Search,
  MapPin, ChevronDown, User, LogOut, LayoutDashboard,
  UtensilsCrossed, Store, Bike, Check,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { cn, getInitials } from "@/lib/utils";
import { PAKISTAN_CITIES, DEFAULT_CITY } from "@/lib/constants";
import { hydrateAuthFromServer } from "@/lib/hydrate-auth";
import toast from "react-hot-toast";

const navLinks = [
  { href: "/",            label: "Home"        },
  { href: "/restaurants", label: "Restaurants" },
];

export function Navbar() {
  const pathname  = usePathname();
  const router    = useRouter();
  const { theme, setTheme } = useTheme();

  const [mounted,       setMounted]       = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [userMenuOpen,  setUserMenuOpen]  = useState(false);
  const [cityMenuOpen,  setCityMenuOpen]  = useState(false);
  const [selectedCity,  setSelectedCity]  = useState(DEFAULT_CITY);

  const cityRef = useRef(null);

  const totalItems = useCartStore((s) => s.totalItems());
  const { user, logout, setUser } = useAuthStore();

  // Load saved city and hydrate auth from server JWT
  useEffect(() => {
    const init = async () => {
      // First, try to hydrate from server JWT
      await hydrateAuthFromServer(setUser);
      
      // Then load saved city from localStorage
      const saved = localStorage.getItem("sfd_city");
      if (saved) {
        const found = PAKISTAN_CITIES.find(c => c.code === saved);
        if (found) setSelectedCity(found);
      }
      
      // Mark as mounted last to prevent hydration flicker
      setMounted(true);
    };
    
    init();
  }, [setUser]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setCityMenuOpen(false);
  }, [pathname]);

  // Close city picker on outside click
  useEffect(() => {
    const handler = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) setCityMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    localStorage.setItem("sfd_city", city.code);
    setCityMenuOpen(false);
    toast.success(`Showing restaurants in ${city.name}`);
    if (pathname === "/restaurants") router.refresh();
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    logout();
    router.push("/");
    toast.success("Logged out successfully");
  };

  const isActive = (href) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
               : "bg-background border-b border-border"
    )}>
      <div className="page-container">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
              <UtensilsCrossed className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-[15px] tracking-tight hidden sm:block">
              Smart Food Delivery
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-brand-50 text-brand-600 dark:bg-brand-950/30 dark:text-brand-400"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Search ── */}
          <div className="hidden lg:flex flex-1 max-w-xs mx-4">
            <Link href="/restaurants"
              className="flex w-full items-center gap-2 rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground hover:border-brand-300 transition-colors">
              <Search className="h-4 w-4 shrink-0" />
              <span>Search restaurants…</span>
            </Link>
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-1.5">

            {/* ── City Picker ── */}
            <div ref={cityRef} className="relative hidden md:block">
              <button
                onClick={() => setCityMenuOpen(v => !v)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                <span className="font-medium max-w-[80px] truncate">{selectedCity.name}</span>
                <ChevronDown className={cn("h-3 w-3 transition-transform", cityMenuOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {cityMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-border bg-popover shadow-card-lg z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-xs font-semibold text-foreground">Delivering to</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Select your city to see restaurants</p>
                    </div>

                    {/* Popular cities */}
                    <div className="p-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1">Popular Cities</p>
                      {PAKISTAN_CITIES.filter(c => c.popular).map(city => (
                        <button key={city.code} onClick={() => handleSelectCity(city)}
                          className={cn(
                            "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors",
                            selectedCity.code === city.code && "bg-brand-50 dark:bg-brand-950/20"
                          )}>
                          <div className="flex items-center gap-2.5">
                            <MapPin className={cn("h-3.5 w-3.5 shrink-0", selectedCity.code === city.code ? "text-brand-500" : "text-muted-foreground")} />
                            <div className="text-left">
                              <p className={cn("font-medium text-sm", selectedCity.code === city.code && "text-brand-600 dark:text-brand-400")}>{city.name}</p>
                              <p className="text-[10px] text-muted-foreground">{city.province} · {city.restaurants}+ restaurants</p>
                            </div>
                          </div>
                          {selectedCity.code === city.code && <Check className="h-3.5 w-3.5 text-brand-500 shrink-0" />}
                        </button>
                      ))}
                    </div>

                    {/* All cities */}
                    <div className="border-t border-border p-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1">All Cities</p>
                      <div className="max-h-40 overflow-y-auto scrollbar-thin space-y-0.5">
                        {PAKISTAN_CITIES.filter(c => !c.popular).map(city => (
                          <button key={city.code} onClick={() => handleSelectCity(city)}
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-sm hover:bg-muted transition-colors",
                              selectedCity.code === city.code && "bg-brand-50 dark:bg-brand-950/20"
                            )}>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{city.name}</span>
                              <span className="text-[10px] text-muted-foreground/60">{city.province}</span>
                            </div>
                            {selectedCity.code === city.code && <Check className="h-3 w-3 text-brand-500" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme */}
            {mounted && (
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}

            {/* Cart */}
            <Link href="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white min-w-[18px] h-[18px] px-1">
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </Link>

            {/* User menu */}
            {mounted && (
              user ? (
                <div className="relative">
                  <button onClick={() => setUserMenuOpen(v => !v)}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-xs font-semibold text-white">
                      {getInitials(user.name)}
                    </div>
                    <span className="hidden md:block text-sm font-medium">{user.name.split(" ")[0]}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-popover shadow-card-lg z-50">
                        <div className="p-3 border-b border-border">
                          <p className="text-sm font-semibold">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <div className="p-1.5 space-y-0.5">
                          <Link href="/profile" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors">
                            <User className="h-4 w-4 text-muted-foreground" /> My Profile
                          </Link>
                          {user.role === "admin" && (
                            <Link href="/admin" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors">
                              <LayoutDashboard className="h-4 w-4 text-muted-foreground" /> Admin Dashboard
                            </Link>
                          )}
                          {user.role === "restaurant" && (
                            <Link href="/restaurant" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors">
                              <Store className="h-4 w-4 text-muted-foreground" /> Restaurant Panel
                            </Link>
                          )}
                          {user.role === "rider" && (
                            <Link href="/rider" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors">
                              <Bike className="h-4 w-4 text-muted-foreground" /> Rider Dashboard
                            </Link>
                          )}
                          <button onClick={handleLogout}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                            <LogOut className="h-4 w-4" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login"  className="btn-ghost text-sm">Sign in</Link>
                  <Link href="/signup" className="btn-primary text-sm py-2 px-4">Get Started</Link>
                </div>
              )
            )}

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(v => !v)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background overflow-hidden">
            <div className="page-container py-4 space-y-1">
              {/* City picker (mobile) */}
              <div className="flex items-center gap-2 px-3 py-2 mb-2">
                <MapPin className="h-4 w-4 text-brand-500" />
                <span className="text-sm font-medium">{selectedCity.name}</span>
                <select
                  value={selectedCity.code}
                  onChange={e => handleSelectCity(PAKISTAN_CITIES.find(c => c.code === e.target.value))}
                  className="ml-auto text-xs border border-border rounded-lg px-2 py-1 bg-background"
                >
                  {PAKISTAN_CITIES.map(c => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>

              <Link href="/restaurants"
                className="flex items-center gap-2 rounded-lg border border-input bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground mb-2">
                <Search className="h-4 w-4" /> Search restaurants…
              </Link>

              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(link.href) ? "bg-brand-50 text-brand-600 dark:bg-brand-950/30 dark:text-brand-400" : "text-foreground hover:bg-muted"
                  )}>
                  {link.label}
                </Link>
              ))}

              {mounted && (
                !user ? (
                  <div className="pt-3 space-y-2 border-t border-border">
                    <Link href="/login"  className="btn-secondary w-full text-center block">Sign in</Link>
                    <Link href="/signup" className="btn-primary  w-full text-center block">Get Started</Link>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-border space-y-0.5">
                    <div className="flex items-center gap-3 px-3 py-2 mb-1">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Link href="/profile" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm hover:bg-muted">
                      <User className="h-4 w-4" /> My Profile
                    </Link>
                    <button onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {userMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />}
    </header>
  );
}
