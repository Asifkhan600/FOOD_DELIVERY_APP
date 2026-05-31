import { cn } from "@/lib/utils";

const variants = {
  pending:   "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400",
  accepted:  "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400",
  preparing: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400",
  picked:    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400",
  delivered: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400",
  cancelled: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400",
  active:    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400",
  inactive:  "bg-muted text-muted-foreground border-border",
  open:      "bg-green-50 text-green-700 border-green-200",
  closed:    "bg-red-50 text-red-700 border-red-200",
};

const labels = {
  pending:   "Pending",
  accepted:  "Accepted",
  preparing: "Preparing",
  picked:    "On the Way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function StatusBadge({ status, label, className }) {
  const variant = variants[status] ?? "bg-muted text-muted-foreground border-border";
  const text    = label ?? labels[status] ?? status;

  return (
    <span className={cn(
      "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
      variant,
      className
    )}>
      {text}
    </span>
  );
}
