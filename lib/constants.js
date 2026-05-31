export const APP_NAME        = "Smart Food Delivery";
export const APP_TAGLINE     = "Fresh food, delivered fast.";
export const APP_DESCRIPTION = "Order from your favorite local restaurants and get food delivered to your doorstep in under 30 minutes.";
export const CONTACT_PHONE   = "03030345009";
export const CONTACT_ADDRESS = "Peshawar, Pakistan";

export const DEFAULT_PAGE_SIZE = 12;
export const ADMIN_PAGE_SIZE   = 20;
export const TAX_RATE          = 0.05;

// ── Pakistan Cities ────────────────────────────────────────────────
export const PAKISTAN_CITIES = [
  { name: "Peshawar",     province: "KPK",      code: "pew", lat: 34.0151, lng: 71.5249, restaurants: 120, popular: true  },
  { name: "Lahore",       province: "Punjab",   code: "lhe", lat: 31.5204, lng: 74.3587, restaurants: 480, popular: true  },
  { name: "Karachi",      province: "Sindh",    code: "khi", lat: 24.8607, lng: 67.0011, restaurants: 620, popular: true  },
  { name: "Islamabad",    province: "Federal",  code: "isb", lat: 33.6844, lng: 73.0479, restaurants: 310, popular: true  },
  { name: "Rawalpindi",   province: "Punjab",   code: "rwp", lat: 33.5651, lng: 73.0169, restaurants: 195, popular: true  },
  { name: "Faisalabad",   province: "Punjab",   code: "lyp", lat: 31.4504, lng: 73.1350, restaurants: 210, popular: false },
  { name: "Multan",       province: "Punjab",   code: "mux", lat: 30.1575, lng: 71.5249, restaurants: 160, popular: false },
  { name: "Quetta",       province: "Baloch",   code: "uet", lat: 30.1798, lng: 66.9750, restaurants: 85,  popular: false },
  { name: "Mardan",       province: "KPK",      code: "mdd", lat: 34.1980, lng: 72.0404, restaurants: 45,  popular: false },
  { name: "Abbottabad",   province: "KPK",      code: "abt", lat: 34.1463, lng: 73.2117, restaurants: 60,  popular: false },
  { name: "Hyderabad",    province: "Sindh",    code: "hdd", lat: 25.3960, lng: 68.3578, restaurants: 110, popular: false },
  { name: "Sialkot",      province: "Punjab",   code: "skt", lat: 32.4945, lng: 74.5229, restaurants: 90,  popular: false },
  { name: "Gujranwala",   province: "Punjab",   code: "gwl", lat: 32.1877, lng: 74.1945, restaurants: 130, popular: false },
  { name: "Sukkur",       province: "Sindh",    code: "skz", lat: 27.7052, lng: 68.8574, restaurants: 55,  popular: false },
  { name: "Bahawalpur",   province: "Punjab",   code: "bwp", lat: 29.3956, lng: 71.6836, restaurants: 75,  popular: false },
];

export const DEFAULT_CITY = PAKISTAN_CITIES[0]; // Peshawar

// ── Featured Restaurants ───────────────────────────────────────────
export const FEATURED_RESTAURANTS = [
  { restaurant_id: 1, name: "Burning Brownie",     cuisine_type: "Burgers · Fast Food",  rating: 4.8, total_reviews: 1240, delivery_fee: 0,   avg_delivery_time: 25, is_open: true,  city: "Peshawar", banner_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop" },
  { restaurant_id: 2, name: "Shandana's Kitchen",  cuisine_type: "Pakistani · Desi",     rating: 4.7, total_reviews: 890,  delivery_fee: 40,  avg_delivery_time: 35, is_open: true,  city: "Peshawar", banner_url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop" },
  { restaurant_id: 3, name: "Pizza Master",        cuisine_type: "Pizza · Italian",      rating: 4.5, total_reviews: 670,  delivery_fee: 50,  avg_delivery_time: 30, is_open: true,  city: "Lahore",   banner_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop" },
  { restaurant_id: 4, name: "Chai Wala",           cuisine_type: "Beverages · Snacks",   rating: 4.6, total_reviews: 540,  delivery_fee: 30,  avg_delivery_time: 20, is_open: true,  city: "Peshawar", banner_url: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format&fit=crop" },
  { restaurant_id: 5, name: "Karahi House",        cuisine_type: "Pakistani · Karahi",   rating: 4.9, total_reviews: 2100, delivery_fee: 60,  avg_delivery_time: 40, is_open: true,  city: "Islamabad",banner_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop" },
  { restaurant_id: 6, name: "Sushi Garden",        cuisine_type: "Japanese · Sushi",     rating: 4.4, total_reviews: 320,  delivery_fee: 80,  avg_delivery_time: 45, is_open: false, city: "Karachi",  banner_url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop" },
  { restaurant_id: 7, name: "Biryani Centre",      cuisine_type: "Biryani · Rice",       rating: 4.8, total_reviews: 3200, delivery_fee: 0,   avg_delivery_time: 30, is_open: true,  city: "Lahore",   banner_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop" },
  { restaurant_id: 8, name: "The Dessert Lab",     cuisine_type: "Desserts · Bakery",    rating: 4.7, total_reviews: 780,  delivery_fee: 45,  avg_delivery_time: 25, is_open: true,  city: "Peshawar", banner_url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop" },
  { restaurant_id: 9, name: "Tandoori Nights",     cuisine_type: "BBQ · Grills",         rating: 4.6, total_reviews: 1100, delivery_fee: 55,  avg_delivery_time: 35, is_open: true,  city: "Rawalpindi",banner_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop" },
  { restaurant_id: 10, name: "Sandwich Republic",  cuisine_type: "Sandwiches · Wraps",   rating: 4.3, total_reviews: 420,  delivery_fee: 35,  avg_delivery_time: 20, is_open: true,  city: "Peshawar", banner_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop" },
];

// ── Categories ─────────────────────────────────────────────────────
export const DEFAULT_CATEGORIES = [
  { name: "Pizza",       slug: "pizza",       icon: "🍕" },
  { name: "Burgers",     slug: "burgers",     icon: "🍔" },
  { name: "Biryani",     slug: "biryani",     icon: "🍚" },
  { name: "BBQ",         slug: "bbq",         icon: "🍖" },
  { name: "Chinese",     slug: "chinese",     icon: "🥡" },
  { name: "Sushi",       slug: "sushi",       icon: "🍱" },
  { name: "Desserts",    slug: "desserts",    icon: "🍰" },
  { name: "Drinks",      slug: "drinks",      icon: "🥤" },
  { name: "Healthy",     slug: "healthy",     icon: "🥗" },
  { name: "Sandwiches",  slug: "sandwiches",  icon: "🥪" },
  { name: "Desi",        slug: "desi",        icon: "🫕" },
  { name: "Bakery",      slug: "bakery",      icon: "🥐" },
];

export const ORDER_STATUSES = [
  { value: "pending",   label: "Pending",    step: 0 },
  { value: "accepted",  label: "Accepted",   step: 1 },
  { value: "preparing", label: "Preparing",  step: 2 },
  { value: "picked",    label: "On the way", step: 3 },
  { value: "delivered", label: "Delivered",  step: 4 },
  { value: "cancelled", label: "Cancelled",  step: -1 },
];

export const RESTAURANT_SORT_OPTIONS = [
  { value: "rating",        label: "Top Rated" },
  { value: "delivery_fee",  label: "Lowest Delivery Fee" },
  { value: "delivery_time", label: "Fastest Delivery" },
  { value: "name",          label: "A–Z" },
];

export const PAYMENT_METHODS = [
  { value: "card",   label: "Credit / Debit Card", icon: "💳" },
  { value: "cod",    label: "Cash on Delivery",     icon: "💵" },
  { value: "wallet", label: "Wallet Balance",        icon: "👛" },
];

export const RATING_OPTIONS = [
  { value: "4.5", label: "4.5+ Excellent" },
  { value: "4",   label: "4.0+ Very Good" },
  { value: "3.5", label: "3.5+ Good" },
  { value: "3",   label: "3.0+ Average" },
];

export const ADMIN_NAV = [
  { href: "/admin",               label: "Overview",     icon: "LayoutDashboard" },
  { href: "/admin/orders",        label: "Orders",       icon: "ShoppingBag"     },
  { href: "/admin/restaurants",   label: "Restaurants",  icon: "Store"           },
  { href: "/admin/customers",     label: "Customers",    icon: "Users"           },
  { href: "/admin/riders",        label: "Riders",       icon: "Bike"            },
  { href: "/admin/categories",    label: "Categories",   icon: "Tag"             },
  { href: "/admin/coupons",       label: "Coupons",      icon: "Ticket"          },
  { href: "/admin/transactions",  label: "Transactions", icon: "Receipt"         },
];

export const RESTAURANT_NAV = [
  { href: "/restaurant",           label: "Overview",  icon: "LayoutDashboard" },
  { href: "/restaurant/orders",    label: "Orders",    icon: "ShoppingBag"     },
  { href: "/restaurant/menu",      label: "Menu",      icon: "UtensilsCrossed" },
  { href: "/restaurant/inventory", label: "Inventory", icon: "Package"         },
  { href: "/restaurant/analytics", label: "Analytics", icon: "BarChart3"       },
];

export const RIDER_NAV = [
  { href: "/rider",          label: "Deliveries", icon: "MapPin"     },
  { href: "/rider/history",  label: "History",    icon: "Clock"      },
  { href: "/rider/earnings", label: "Earnings",   icon: "DollarSign" },
];

export const TESTIMONIALS = [
  { id: 1, name: "Sara Ahmed",    role: "Regular Customer",    rating: 5, comment: "Incredibly fast delivery! Food arrived hot and fresh. Highly recommended!",           avatar: "SA" },
  { id: 2, name: "Ali Khan",      role: "Food Enthusiast",     rating: 5, comment: "Best food delivery in the city. Wide selection and real-time tracking is amazing.",     avatar: "AK" },
  { id: 3, name: "Fatima Noor",   role: "Working Professional",rating: 4, comment: "Love how I can track my order live. Interface is clean and ordering takes a minute.",   avatar: "FN" },
  { id: 4, name: "Zain Raza",     role: "Food Blogger",        rating: 5, comment: "Discovered so many new restaurants. Curation is excellent and delivery is reliable.",   avatar: "ZR" },
];

export const PLACEHOLDER_RESTAURANT = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop";
export const PLACEHOLDER_FOOD       = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop";
