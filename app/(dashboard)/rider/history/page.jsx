"use client";

import { formatDate, formatCurrency } from "@/lib/utils";
import { StatCard } from "@/components/dashboard/StatCard";

const HISTORY = [
  { delivery_id: 1, order_id: 1041, restaurant: "Burning Brownie",  customer: "Ali Hassan",  distance: "3.2 km", earnings: 120, time: "18 min", date: "2025-01-20" },
  { delivery_id: 2, order_id: 1038, restaurant: "Savour Foods",     customer: "Sara Khan",   distance: "5.1 km", earnings: 150, time: "28 min", date: "2025-01-20" },
  { delivery_id: 3, order_id: 1035, restaurant: "Pizza Palace",     customer: "Usman Raza",  distance: "2.8 km", earnings: 110, time: "15 min", date: "2025-01-19" },
  { delivery_id: 4, order_id: 1031, restaurant: "Sakura Japanese",  customer: "Maryam Ali",  distance: "6.5 km", earnings: 180, time: "35 min", date: "2025-01-19" },
  { delivery_id: 5, order_id: 1028, restaurant: "BBQ Tonight",      customer: "Bilal Ahmed", distance: "4.2 km", earnings: 130, time: "22 min", date: "2025-01-18" },
  { delivery_id: 6, order_id: 1024, restaurant: "Sweet Tooth",      customer: "Nadia Shah",  distance: "1.9 km", earnings: 90,  time: "12 min", date: "2025-01-18" },
];

const totalDeliveries = HISTORY.length;
const totalEarnings   = HISTORY.reduce((s, d) => s + d.earnings, 0);
const avgEarnings     = Math.round(totalEarnings / totalDeliveries);

export default function RiderHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Delivery History</h1>
        <p className="text-sm text-muted-foreground mt-0.5">All your completed deliveries</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Total Deliveries" value={totalDeliveries}             iconName="Package"   color="brand"  />
        <StatCard title="Total Earned"     value={formatCurrency(totalEarnings)} iconName="DollarSign" color="green"  />
        <StatCard title="Avg per Delivery" value={formatCurrency(avgEarnings)}   iconName="TrendingUp" color="blue"   />
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/40 border-b border-border">
              {["Order", "Restaurant", "Customer", "Distance", "Time", "Earnings", "Date"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {HISTORY.map(d => (
                <tr key={d.delivery_id} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">#{d.order_id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.restaurant}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.customer}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.distance}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.time}</td>
                  <td className="px-4 py-3 font-semibold text-brand-500">{formatCurrency(d.earnings)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(d.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
