import { cn } from "@/lib/utils";

// ── Skeleton Base ──────────────────────────────────────────────
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
}

// ── Restaurant Card Skeleton ───────────────────────────────────
export function RestaurantCardSkeleton() {
  return (
    <div className="card-base overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-4 pt-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

// ── Food Card Skeleton ─────────────────────────────────────────
export function FoodCardSkeleton() {
  return (
    <div className="card-base flex gap-3 p-3">
      <Skeleton className="h-20 w-20 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-16 mt-2" />
      </div>
    </div>
  );
}

// ── Page Header Skeleton ───────────────────────────────────────
export function PageHeaderSkeleton() {
  return (
    <div className="space-y-3 mb-8">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-5 w-96" />
    </div>
  );
}

// ── Table Row Skeleton ─────────────────────────────────────────
export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

// ── Stat Card Skeleton ─────────────────────────────────────────
export function StatCardSkeleton() {
  return (
    <div className="card-base p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-3 w-36" />
    </div>
  );
}
