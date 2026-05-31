import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ rating = 0, max = 5, size = "md", showCount, count }) {
  const sizeMap = { sm: "h-3 w-3", md: "h-4 w-4", lg: "h-5 w-5" };
  const iconClass = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const half   = !filled && i < rating;
          return (
            <Star
              key={i}
              className={cn(
                iconClass,
                filled ? "fill-amber-400 text-amber-400" :
                half   ? "fill-amber-200 text-amber-400" :
                          "fill-transparent text-muted-foreground/40"
              )}
            />
          );
        })}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </div>
  );
}
