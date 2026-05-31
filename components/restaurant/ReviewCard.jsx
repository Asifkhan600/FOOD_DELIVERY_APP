"use client";

import { StarRating } from "@/components/common/StarRating";
import { timeAgo, getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ReviewCard({ review }) {
  const { customer_name, rating, comment, created_at } = review;

  return (
    <div className="card-base p-5">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400 text-sm font-bold">
          {getInitials(customer_name)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="font-semibold text-foreground text-sm">{customer_name}</p>
            <span className="text-xs text-muted-foreground shrink-0">
              {created_at ? timeAgo(created_at) : ""}
            </span>
          </div>
          <StarRating rating={rating} size="sm" />
          {comment && (
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{comment}</p>
          )}
        </div>
      </div>
    </div>
  );
}
