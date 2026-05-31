// User roles enumeration
export enum UserRole {
  CUSTOMER = 'customer',
  RESTAURANT = 'restaurant',
  RIDER = 'rider',
  ADMIN = 'admin',
}

// Base user interface
export interface BaseUser {
  user_id: number;
  full_name: string;
  email: string;
  phone?: string;
  created_at: string;
}

// Customer-specific interface
export interface Customer extends BaseUser {
  role: UserRole.CUSTOMER;
  customer_id?: number;
  profile_image?: string;
}

// Restaurant owner interface
export interface Restaurant extends BaseUser {
  role: UserRole.RESTAURANT;
  restaurant_id?: number;
  restaurant_name: string;
  address?: string;
  city?: string;
  rating?: number;
  opening_time?: string;
  closing_time?: string;
  delivery_fee?: number;
  status?: 'open' | 'closed';
}

// Delivery rider interface
export interface DeliveryRider extends BaseUser {
  role: UserRole.RIDER;
  rider_id?: number;
  vehicle_type?: string;
  license_number?: string;
  availability?: boolean;
}

// Admin interface
export interface Admin extends BaseUser {
  role: UserRole.ADMIN;
  admin_id?: number;
  permissions?: string[];
}

// Union type for all user types
export type User = Customer | Restaurant | DeliveryRider | Admin;

// Signup form data by role
export interface CustomerSignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole.CUSTOMER;
}

export interface RestaurantSignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  restaurant_name: string;
  address: string;
  city: string;
  opening_time?: string;
  closing_time?: string;
  delivery_fee: number;
  role: UserRole.RESTAURANT;
}

export interface RiderSignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  vehicle_type: string;
  license_number: string;
  role: UserRole.RIDER;
}

export type SignupData = CustomerSignupData | RestaurantSignupData | RiderSignupData;
