"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, User, ChefHat, Bike, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

const ROLES = [
  { value: "customer", label: "Customer", Icon: User, desc: "Order food online" },
  { value: "restaurant", label: "Restaurant Owner", Icon: ChefHat, desc: "Manage your restaurant" },
  { value: "rider", label: "Delivery Rider", Icon: Bike, desc: "Deliver & earn" },
];

export default function SignupPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [role, setRole] = useState("customer");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingRole, setExistingRole] = useState(null);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      restaurant_name: "",
      address: "",
      city: "",
      opening_time: "",
      closing_time: "",
      delivery_fee: "",
      vehicle_type: "",
      license_number: "",
    },
  });

  const password = watch("password");
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setExistingRole(null);
    reset();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setExistingRole(null);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone || null,
        role,
      };

      // Add role-specific fields
      if (role === "restaurant") {
        payload.restaurant_name = data.restaurant_name;
        payload.address = data.address;
        payload.city = data.city;
        payload.delivery_fee = parseFloat(data.delivery_fee);
        if (data.opening_time) payload.opening_time = data.opening_time;
        if (data.closing_time) payload.closing_time = data.closing_time;
      } else if (role === "rider") {
        payload.vehicle_type = data.vehicle_type;
        payload.license_number = data.license_number;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        if (res.status === 409 && json.existing_role) {
          setExistingRole(json.existing_role);
        }
        throw new Error(json.error || "Registration failed");
      }

      // Set user in store
      if (json.data) setUser(json.data);

      // Welcome toast
      toast.custom((t) => (
        <div
          className={cn(
            "flex items-center gap-3 bg-card border border-border rounded-xl shadow-lg px-5 py-4 max-w-sm transition-all",
            t.visible ? "animate-fade-in" : "opacity-0"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 shrink-0">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">
              Welcome, {data.name.split(" ")[0]}! 🎉
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your {role} account is ready to go!
            </p>
          </div>
        </div>
      ), { duration: 5000 });

      router.push("/");
    } catch (err) {
      // Show error toast with specific message
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Create account</h1>
        <p className="text-muted-foreground text-sm mt-1">Get started with Smart Food Delivery</p>
      </div>

      {/* Role selector */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {ROLES.map(({ value, label, Icon, desc }) => (
          <button
            key={value}
            type="button"
            onClick={() => handleRoleChange(value)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all",
              role === value
                ? "border-brand-500 bg-brand-50 dark:bg-brand-950/20"
                : "border-border hover:border-brand-200"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                role === value ? "text-brand-500" : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-xs font-semibold leading-tight",
                role === value
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-foreground"
              )}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Existing role warning */}
      {existingRole && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            This email is already registered as a <strong>{existingRole}</strong>. You cannot create multiple accounts with the same email address.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Base fields (for all roles) */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Full Name
          </label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
            placeholder="e.g. Ali Hassan"
            className={cn("input-base", errors.name && "border-destructive")}
          />
          {errors.name && (
            <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Email address
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email",
              },
            })}
            placeholder="you@example.com"
            className={cn("input-base", errors.email && "border-destructive")}
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone (required for restaurant & rider, optional for customer) */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Phone {(role === "restaurant" || role === "rider") && <span className="text-destructive">*</span>}
          </label>
          <input
            {...register("phone", {
              required:
                role === "restaurant" || role === "rider"
                  ? "Phone is required for this role"
                  : false,
              pattern: {
                value: /^[\d\s\-\+\(\)]+$/,
                message: "Invalid phone number",
              },
            })}
            placeholder="+92 300 1234567"
            className={cn("input-base", errors.phone && "border-destructive")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", {
                required: "Password required",
                minLength: { value: 8, message: "Min 8 characters" },
              })}
              placeholder="Min. 8 characters"
              className={cn(
                "input-base pr-10",
                errors.password && "border-destructive"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPass ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm",
              validate: (v) => v === password || "Passwords don't match",
            })}
            placeholder="Re-enter password"
            className={cn(
              "input-base",
              errors.confirmPassword && "border-destructive"
            )}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Restaurant-specific fields */}
        {role === "restaurant" && (
          <>
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Restaurant Information
              </h3>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Restaurant Name <span className="text-destructive">*</span>
              </label>
              <input
                {...register("restaurant_name", {
                  required: "Restaurant name is required",
                  minLength: {
                    value: 2,
                    message: "At least 2 characters",
                  },
                })}
                placeholder="e.g. Ali's Biryani House"
                className={cn(
                  "input-base",
                  errors.restaurant_name && "border-destructive"
                )}
              />
              {errors.restaurant_name && (
                <p className="text-xs text-destructive mt-1">
                  {errors.restaurant_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Address <span className="text-destructive">*</span>
              </label>
              <input
                {...register("address", {
                  required: "Address is required",
                  minLength: { value: 5, message: "At least 5 characters" },
                })}
                placeholder="e.g. 123 Main Street, Block B"
                className={cn(
                  "input-base",
                  errors.address && "border-destructive"
                )}
              />
              {errors.address && (
                <p className="text-xs text-destructive mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                City <span className="text-destructive">*</span>
              </label>
              <input
                {...register("city", {
                  required: "City is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
                placeholder="e.g. Karachi"
                className={cn("input-base", errors.city && "border-destructive")}
              />
              {errors.city && (
                <p className="text-xs text-destructive mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Opening Time
                </label>
                <input
                  type="time"
                  {...register("opening_time")}
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Closing Time
                </label>
                <input
                  type="time"
                  {...register("closing_time")}
                  className="input-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Delivery Fee (PKR) <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register("delivery_fee", {
                  required: "Delivery fee is required",
                  min: { value: 0, message: "Must be 0 or greater" },
                })}
                placeholder="e.g. 150"
                className={cn(
                  "input-base",
                  errors.delivery_fee && "border-destructive"
                )}
              />
              {errors.delivery_fee && (
                <p className="text-xs text-destructive mt-1">
                  {errors.delivery_fee.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* Rider-specific fields */}
        {role === "rider" && (
          <>
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Rider Information
              </h3>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Vehicle Type <span className="text-destructive">*</span>
              </label>
              <select
                {...register("vehicle_type", {
                  required: "Vehicle type is required",
                })}
                className={cn(
                  "input-base",
                  errors.vehicle_type && "border-destructive"
                )}
              >
                <option value="">Select vehicle type</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="bicycle">Bicycle</option>
                <option value="car">Car</option>
                <option value="scooter">Scooter</option>
              </select>
              {errors.vehicle_type && (
                <p className="text-xs text-destructive mt-1">
                  {errors.vehicle_type.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                License Number <span className="text-destructive">*</span>
              </label>
              <input
                {...register("license_number", {
                  required: "License number is required",
                  minLength: {
                    value: 5,
                    message: "At least 5 characters",
                  },
                })}
                placeholder="e.g. ABC123XYZ"
                className={cn(
                  "input-base",
                  errors.license_number && "border-destructive"
                )}
              />
              {errors.license_number && (
                <p className="text-xs text-destructive mt-1">
                  {errors.license_number.message}
                </p>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-sm py-2.5 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Creating account…
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-500 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
