"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";

const CUSTOMERS = [
  { customer_id: 1, name: "Ali Hassan",    email: "ali@example.com",    phone: "+92 300 1111111", orders_count: 24, total_spent: 42000, joined: "2024-06-15", is_active: true  },
  { customer_id: 2, name: "Sara Khan",     email: "sara@example.com",   phone: "+92 301 2222222", orders_count: 18, total_spent: 31500, joined: "2024-07-20", is_active: true  },
  { customer_id: 3, name: "Usman Raza",    email: "usman@example.com",  phone: "+92 302 3333333", orders_count: 9,  total_spent: 15800, joined: "2024-09-01", is_active: true  },
  { customer_id: 4, name: "Maryam Ali",    email: "maryam@example.com", phone: "+92 303 4444444", orders_count: 42, total_spent: 89000, joined: "2024-03-10", is_active: true  },
  { customer_id: 5, name: "Bilal Ahmed",   email: "bilal@example.com",  phone: "+92 304 5555555", orders_count: 6,  total_spent: 9200,  joined: "2024-11-05", is_active: false },
  { customer_id: 6, name: "Nadia Shah",    email: "nadia@example.com",  phone: "+92 305 6666666", orders_count: 31, total_spent: 56000, joined: "2024-05-22", is_active: true  },
  { customer_id: 7, name: "Hamza Tariq",   email: "hamza@example.com",  phone: "+92 306 7777777", orders_count: 15, total_spent: 22000, joined: "2024-08-14", is_active: true  },
  { customer_id: 8, name: "Fatima Malik",  email: "fatima@example.com", phone: "+92 307 8888888", orders_count: 3,  total_spent: 4500,  joined: "2025-01-02", is_active: true  },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const filtered = CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{CUSTOMERS.length} registered customers</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers…" className="input-base pl-9" />
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/40 border-b border-border">
              {["Customer", "Email", "Phone", "Orders", "Total Spent", "Joined", "Status"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map(c => (
                <tr key={c.customer_id} className="hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400 text-xs font-bold">
                        {getInitials(c.name)}
                      </div>
                      <span className="font-medium text-foreground">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
                  <td className="px-4 py-3 font-medium">{c.orders_count}</td>
                  <td className="px-4 py-3 font-semibold text-brand-500">{formatCurrency(c.total_spent)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(c.joined)}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${c.is_active ? "badge-green" : "badge-gray"}`}>
                      {c.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
