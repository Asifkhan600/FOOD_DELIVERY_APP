"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const REVENUE_DATA = [
  { day: "Mon", revenue: 42000 },
  { day: "Tue", revenue: 58000 },
  { day: "Wed", revenue: 51000 },
  { day: "Thu", revenue: 67000 },
  { day: "Fri", revenue: 89000 },
  { day: "Sat", revenue: 112000 },
  { day: "Sun", revenue: 95000 },
];

const ORDER_STATUS_DATA = [
  { name: "Delivered",  value: 342, color: "#22c55e" },
  { name: "Preparing",  value: 87,  color: "#f97316" },
  { name: "Pending",    value: 53,  color: "#eab308" },
  { name: "Cancelled",  value: 28,  color: "#ef4444" },
];

const RECENT_ORDERS = [
  { order_id: 1041, customer_name: "Ali Hassan",   restaurant_name: "Burning Brownie", total_amount: 1390, order_status: "delivered", order_date: "2025-01-20T15:30:00" },
  { order_id: 1040, customer_name: "Sara Khan",    restaurant_name: "Savour Foods",    total_amount: 890,  order_status: "preparing", order_date: "2025-01-20T15:15:00" },
  { order_id: 1039, customer_name: "Usman Raza",   restaurant_name: "Pizza Palace",    total_amount: 2100, order_status: "pending",   order_date: "2025-01-20T15:00:00" },
  { order_id: 1038, customer_name: "Maryam Ali",   restaurant_name: "Sakura Japanese", total_amount: 3200, order_status: "picked",    order_date: "2025-01-20T14:45:00" },
  { order_id: 1037, customer_name: "Bilal Ahmed",  restaurant_name: "BBQ Tonight",     total_amount: 1750, order_status: "delivered", order_date: "2025-01-20T14:30:00" },
];

const TOP_RESTAURANTS = [
  { name: "Burning Brownie", orders: 842, revenue: 1240000 },
  { name: "Savour Foods",    orders: 721, revenue: 980000  },
  { name: "BBQ Tonight",     orders: 614, revenue: 1560000 },
  { name: "Pizza Palace",    orders: 580, revenue: 870000  },
  { name: "Sakura Japanese", orders: 412, revenue: 2100000 },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue"    value="PKR 4.2M"  iconName="DollarSign"      trend={12.5}  trendLabel="vs last week" color="brand"  />
        <StatCard title="Total Orders"     value="2,510"     iconName="ShoppingBag"     trend={8.2}   trendLabel="vs last week" color="blue"   />
        <StatCard title="Active Customers" value="1,847"     iconName="Users"           trend={5.1}   trendLabel="vs last week" color="green"  />
        <StatCard title="Active Riders"    value="34"        iconName="Bike"            trend={-2.3}  trendLabel="vs last week" color="purple" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Line Chart */}
        <div className="card-base p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip formatter={v => [`PKR ${v.toLocaleString()}`, "Revenue"]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2.5} dot={{ fill: "#f97316", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="card-base p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Orders by Status</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={ORDER_STATUS_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {ORDER_STATUS_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {ORDER_STATUS_DATA.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent orders */}
        <div className="card-base overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Recent Orders</h3>
            <a href="/admin/orders" className="text-xs text-brand-500 hover:underline">View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-muted/40">
                {["Order", "Customer", "Restaurant", "Total", "Status", "Time"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-border">
                {RECENT_ORDERS.map(o => (
                  <tr key={o.order_id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">#{o.order_id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.customer_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.restaurant_name}</td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(o.total_amount)}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.order_status} /></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{formatDateTime(o.order_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top restaurants */}
        <div className="card-base overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Top Restaurants</h3>
          </div>
          <div className="divide-y divide-border">
            {TOP_RESTAURANTS.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3 px-5 py-3">
                <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.orders} orders</p>
                </div>
                <span className="text-xs font-semibold text-brand-500">{formatCurrency(r.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
