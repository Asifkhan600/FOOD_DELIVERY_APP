"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const REVENUE_7DAY = [
  { day: "Mon", revenue: 18000 },
  { day: "Tue", revenue: 24000 },
  { day: "Wed", revenue: 19500 },
  { day: "Thu", revenue: 31000 },
  { day: "Fri", revenue: 42000 },
  { day: "Sat", revenue: 58000 },
  { day: "Sun", revenue: 48000 },
];

const TOP_ITEMS = [
  { name: "Smash Burger",     orders: 124 },
  { name: "BBQ Bacon Burger", orders: 98  },
  { name: "Crispy Fries",     orders: 211 },
  { name: "Milkshake",        orders: 87  },
  { name: "Onion Rings",      orders: 63  },
];

const ORDERS_BY_DAY = [
  { day: "Mon", orders: 38  },
  { day: "Tue", orders: 52  },
  { day: "Wed", orders: 41  },
  { day: "Thu", orders: 67  },
  { day: "Fri", orders: 89  },
  { day: "Sat", orders: 112 },
  { day: "Sun", orders: 94  },
];

export default function RestaurantAnalyticsPage() {
  const totalRevenue = REVENUE_7DAY.reduce((s, d) => s + d.revenue, 0);
  const totalOrders  = ORDERS_BY_DAY.reduce((s, d) => s + d.orders, 0);
  const avgOrder     = Math.round(totalRevenue / totalOrders);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Last 7 days performance</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Weekly Revenue"     value={formatCurrency(totalRevenue)} iconName="DollarSign"  trend={12.4} color="brand"  />
        <StatCard title="Weekly Orders"      value={totalOrders}                  iconName="ShoppingBag" trend={8.2}  color="blue"   />
        <StatCard title="Avg Order Value"    value={formatCurrency(avgOrder)}     iconName="TrendingUp"  trend={3.1}  color="green"  />
        <StatCard title="Completion Rate"    value="94.2%"                        iconName="CheckCircle" trend={1.5}  color="purple" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenue bar */}
        <div className="card-base p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Daily Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={REVENUE_7DAY}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip formatter={v => [formatCurrency(v), "Revenue"]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {REVENUE_7DAY.map((_, i) => <Cell key={i} fill={i === 5 ? "#f97316" : "#f97316aa"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders line */}
        <div className="card-base p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Daily Orders</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ORDERS_BY_DAY}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Line type="monotone" dataKey="orders" stroke="#f97316" strokeWidth={2.5} dot={{ fill: "#f97316", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top items */}
      <div className="card-base p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Top Selling Items</h3>
        <div className="space-y-3">
          {TOP_ITEMS.sort((a,b) => b.orders - a.orders).map((item, i) => (
            <div key={item.name} className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                  <span className="text-xs font-semibold text-brand-500">{item.orders} orders</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: `${(item.orders / TOP_ITEMS[0].orders) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
