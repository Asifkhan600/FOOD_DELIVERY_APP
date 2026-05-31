import Link from "next/link";
import { ShieldX } from "lucide-react";

export const metadata = { title: "403 – Access Denied | Smart Food Delivery" };

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30 mx-auto mb-5">
          <ShieldX className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
        <p className="text-muted-foreground text-sm mb-6">
          You don't have permission to view this page. Please sign in with the correct account or go back home.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-secondary text-sm">← Back to Home</Link>
          <Link href="/login" className="btn-primary text-sm">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
