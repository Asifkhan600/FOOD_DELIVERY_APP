"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency, formatDate } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const WEEKLY = [
  { day: "Mon", earned: 480  },
  { day: "Tue", earned: 620  },
  { day: "Wed", earned: 510  },
  { day: "Thu", earned: 890  },
  { day: "Fri", earned: 1050 },
  { day: "Sat", earned: 1340 },
  { day: "Sun", earned: 980  },
];

const BREAKDOWN = [
  { delivery_id: 1, order_id: 1041, base: 100, bonus: 20,  total: 120, date: "2025-01-20" },
  { delivery_id: 2, order_id: 1038, base: 130, bonus: 20,  total: 150, date: "2025-01-20" },
  { delivery_id: 3, order_id: 1035, base: 100, bonus: 10,  total: 110, date: "2025-01-19" },
  { delivery_id: 4, order_id: 1031, base: 150, bonus: 30,  total: 180, date: "2025-01-19" },
  { delivery_id: 5, order_id: 1028, base: 120, bonus: 10,  total: 130, date: "2025-01-18" },
];

const weekTotal   = WEEKLY.reduce((s, d) => s + d.earned, 0);
const monthTotal  = weekTotal * 4.2;
const todayEarned = WEEKLY[WEEKLY.length - 1].earned;

export default function RiderEarningsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Earnings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Track your income</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Today"      value={formatCurrency(todayEarned)} iconName="DollarSign" trend={12}  color="brand"  />
        <StatCard title="This Week"  value={formatCurrency(weekTotal)}   iconName="TrendingUp" trend={8.4} color="green"  />
        <StatCard title="This Month" value={formatCurrency(monthTotal)}  iconName="BarChart3"  trend={5.2} color="blue"   />
      </div>

      {/* Weekly chart */}
      <div className="card-base p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Earnings</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={WEEKLY}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}`} />
            <Tooltip formatter={v => [formatCurrency(v), "Earned"]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
            <Bar dataKey="earned" radius={[4,4,0,0]}>
              {WEEKLY.map((_, i) => <Cell key={i} fill={i === 5 ? "#f97316" : "#f97316aa"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown table */}
      <div className="card-base overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Earnings Breakdown</h3>
          <button className="btn-primary text-xs px-4 py-1.5">Request Withdrawal</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/40 border-b border-border">
              {["Delivery", "Order", "Base Pay", "Bonus", "Total", "Date"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {BREAKDOWN.map(b => (
                <tr key={b.delivery_id} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">DEL-{b.delivery_id}</td>
                  <td className="px-4 py-3 text-muted-foreground">#{b.order_id}</td>
                  <td className="px-4 py-3">{formatCurrency(b.base)}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">+{formatCurrency(b.bonus)}</td>
                  <td className="px-4 py-3 font-bold text-brand-500">{formatCurrency(b.total)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(b.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
