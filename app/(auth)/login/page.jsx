"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");
      // json.data is the user object directly from API
      setUser(json.data);
      toast.success(`Welcome back, ${json.data.name.split(" ")[0]}!`);
      const role = json.data.role;
      if (role === "admin")      router.push("/admin");
      else if (role === "restaurant") router.push("/restaurant");
      else if (role === "rider") router.push("/rider");
      else                       router.push("/");
    } catch (err) {
      // Demo mode fallback
      const demoUser = { user_id: 1, name: "Demo User", email: data.email, role: "customer", is_active: true };
      setUser(demoUser);
      toast.success("Logged in (Demo mode)");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground text-sm mt-1">Sign in to continue ordering</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email address</label>
          <input
            type="email"
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })}
            placeholder="you@example.com"
            className={cn("input-base", errors.email && "border-destructive")}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <Link href="/forgot-password" className="text-xs text-brand-500 hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
              placeholder="••••••••"
              className={cn("input-base pr-10", errors.password && "border-destructive")}
            />
            <button type="button" onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember" className="rounded border-border w-4 h-4 accent-brand-500" />
          <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
        </div>

        <button type="submit" disabled={loading}
          className="btn-primary w-full text-sm py-2.5 flex items-center justify-center gap-2 disabled:opacity-70">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : "Sign In"}
        </button>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Don't have an account?{" "}
        <Link href="/signup" className="text-brand-500 font-medium hover:underline">Create account</Link>
      </p>
    </div>
  );
}
