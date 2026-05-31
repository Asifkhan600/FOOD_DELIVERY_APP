"use client";

import { formatDateTime, formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";

const LOGS = [
  { log_id: 1, order_id: 1041, action: "place_order",   status: "success", performed_by: "customer", created_at: "2025-01-20T15:30:05" },
  { log_id: 2, order_id: 1041, action: "payment",        status: "success", performed_by: "system",   created_at: "2025-01-20T15:30:08" },
  { log_id: 3, order_id: 1041, action: "accept_order",   status: "success", performed_by: "restaurant",created_at: "2025-01-20T15:32:00" },
  { log_id: 4, order_id: 1041, action: "start_preparing",status: "success", performed_by: "restaurant",created_at: "2025-01-20T15:34:00" },
  { log_id: 5, order_id: 1041, action: "assign_rider",   status: "success", performed_by: "system",   created_at: "2025-01-20T15:48:00" },
  { log_id: 6, order_id: 1040, action: "place_order",    status: "success", performed_by: "customer", created_at: "2025-01-20T15:15:00" },
  { log_id: 7, order_id: 1040, action: "payment",        status: "failed",  performed_by: "system",   created_at: "2025-01-20T15:15:03" },
  { log_id: 8, order_id: 1040, action: "payment_retry",  status: "success", performed_by: "system",   created_at: "2025-01-20T15:15:30" },
  { log_id: 9, order_id: 1039, action: "place_order",    status: "success", performed_by: "customer", created_at: "2025-01-20T15:00:00" },
  { log_id: 10,order_id: 1038, action: "place_order",    status: "success", performed_by: "customer", created_at: "2025-01-20T14:45:00" },
  { log_id: 11,order_id: 1038, action: "cancel_order",   status: "failed",  performed_by: "customer", created_at: "2025-01-20T14:46:00" },
  { log_id: 12,order_id: 1037, action: "deliver_order",  status: "success", performed_by: "rider",    created_at: "2025-01-20T14:30:00" },
];

const ACTION_COLORS = {
  place_order:    "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  payment:        "bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
  accept_order:   "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400",
  assign_rider:   "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400",
  deliver_order:  "bg-teal-100 text-teal-700 dark:bg-teal-950/30 dark:text-teal-400",
  cancel_order:   "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
};

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Transaction Logs</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Complete audit trail of all system actions</p>
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/40 border-b border-border">
              {["Log ID", "Order ID", "Action", "Performed By", "Status", "Timestamp"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {LOGS.map(l => (
                <tr key={l.log_id} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">#{l.log_id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">#{l.order_id}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${ACTION_COLORS[l.action] || "bg-muted text-muted-foreground"}`}>
                      {l.action.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground capitalize">{l.performed_by}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${l.status === "success" ? "badge-green" : "bg-red-100 text-red-700 dark:bg-red-950/30 text-xs font-medium px-2 py-0.5 rounded-md"}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{formatDateTime(l.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
