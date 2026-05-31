"use client";

import { useState } from "react";
import { Search, Plus, Trash2, Copy, CheckCircle2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const COUPONS_DATA = [
  { coupon_id: 1, code: "SAVE50",   discount_type: "fixed",      discount_value: 50,  min_order_amount: 500,  usage_limit: 1000, used_count: 342, valid_until: "2025-03-31", is_active: true  },
  { coupon_id: 2, code: "FIRST20",  discount_type: "percentage", discount_value: 20,  min_order_amount: 300,  usage_limit: 500,  used_count: 198, valid_until: "2025-02-28", is_active: true  },
  { coupon_id: 3, code: "WEEKEND15",discount_type: "percentage", discount_value: 15,  min_order_amount: 700,  usage_limit: 200,  used_count: 87,  valid_until: "2025-01-31", is_active: true  },
  { coupon_id: 4, code: "BIRYANI30",discount_type: "fixed",      discount_value: 30,  min_order_amount: 400,  usage_limit: 300,  used_count: 300, valid_until: "2025-01-15", is_active: false },
];

export default function AdminCouponsPage() {
  const [data,  setData]  = useState(COUPONS_DATA);
  const [modal, setModal] = useState(false);
  const [copied, setCopied] = useState(null);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    toast.success(`Copied: ${code}`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Coupons</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{data.length} coupons created</p>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary text-sm flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Add Coupon
        </button>
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/40 border-b border-border">
              {["Code", "Type", "Value", "Min Order", "Usage", "Valid Until", "Status", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {data.map(c => (
                <tr key={c.coupon_id} className="hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono font-bold">{c.code}</code>
                      <button onClick={() => copyCode(c.code)} className="text-muted-foreground hover:text-foreground">
                        {copied === c.code ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{c.discount_type}</td>
                  <td className="px-4 py-3 font-medium text-brand-500">
                    {c.discount_type === "percentage" ? `${c.discount_value}%` : formatCurrency(c.discount_value)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatCurrency(c.min_order_amount)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-brand-500 rounded-full" style={{ width: `${(c.used_count / c.usage_limit) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{c.used_count}/{c.usage_limit}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{formatDate(c.valid_until)}</td>
                  <td className="px-4 py-3">
                    <span className={cn("badge", c.is_active ? "badge-green" : "badge-gray")}>{c.is_active ? "Active" : "Expired"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModal(false)} />
          <div className="relative card-base p-6 w-full max-w-md z-10">
            <h3 className="font-semibold mb-5">Create Coupon</h3>
            <div className="space-y-4">
              {[["Code", "e.g. SAVE50"], ["Discount Value", "e.g. 50"], ["Min Order Amount", "e.g. 300"], ["Usage Limit", "e.g. 500"], ["Valid Until", ""]].map(([label, ph]) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
                  <input placeholder={ph} type={label === "Valid Until" ? "date" : "text"} className="input-base" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Discount Type</label>
                <select className="input-base"><option value="fixed">Fixed Amount</option><option value="percentage">Percentage</option></select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-secondary flex-1 text-sm" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn-primary flex-1 text-sm" onClick={() => { setModal(false); toast.success("Coupon created!"); }}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
