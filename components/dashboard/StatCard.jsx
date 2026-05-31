"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import * as LucideIcons from "lucide-react";

export function StatCard({ title, value, iconName, trend, trendLabel, color = "brand" }) {
  const Icon = LucideIcons[iconName] || LucideIcons.BarChart3;
  const isPositive = trend >= 0;

  const colorMap = {
    brand:  "bg-brand-100 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400",
    green:  "bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400",
    blue:   "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
  };

  return (
    <div className="card-base p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", colorMap[color] || colorMap.brand)}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
      {trend !== undefined && (
        <div className="flex items-center gap-1.5">
          {isPositive ? <TrendingUp className="h-3.5 w-3.5 text-green-500" /> : <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
          <span className={cn("text-xs font-medium", isPositive ? "text-green-600" : "text-red-500")}>
            {isPositive ? "+" : ""}{trend}%
          </span>
          {trendLabel && <span className="text-xs text-muted-foreground">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
