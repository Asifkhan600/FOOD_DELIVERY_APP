import Link from "next/link";
import { UtensilsCrossed, CheckCircle2 } from "lucide-react";

const perks = [
  "500+ local restaurants at your fingertips",
  "Live order tracking — know exactly where your food is",
  "Exclusive deals and coupons every week",
];

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col justify-between bg-charcoal-900 p-12">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
            <UtensilsCrossed className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-white text-base">Smart Food Delivery</span>
        </Link>

        <div>
          <h2 className="text-3xl font-bold text-white leading-snug mb-4">
            Hungry? We've got<br />
            <span className="text-brand-400">you covered.</span>
          </h2>
          <p className="text-charcoal-400 text-sm leading-relaxed mb-8">
            Join thousands of food lovers ordering from top restaurants — fast, fresh, and reliable.
          </p>
          <ul className="space-y-3">
            {perks.map(p => (
              <li key={p} className="flex items-start gap-3 text-sm text-charcoal-300">
                <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-charcoal-600">
          © {new Date().getFullYear()} Smart Food Delivery. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
              <UtensilsCrossed className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-foreground">Smart Food Delivery</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
