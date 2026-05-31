# 🍕 Smart Food Delivery - Complete Platform

A comprehensive, modern food delivery platform built with **Next.js**, **React**, **MySQL**, and **TypeScript**. Designed for customers, restaurants, delivery riders, and admins.

![Smart Food Delivery](https://img.shields.io/badge/Status-Active%20Development-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)
![React](https://img.shields.io/badge/React-18-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0%2B-blue)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Database Setup](#database-setup)
6. [Configuration](#configuration)
7. [Running the Application](#running-the-application)
8. [Project Structure](#project-structure)
9. [Documentation](#documentation)
10. [Contributing](#contributing)
11. [License](#license)

---

## 🎯 Project Overview

**Smart Food Delivery** is a next-generation food delivery platform that connects:
- 🛒 **Customers** - Browse and order food with real-time tracking
- 🍔 **Restaurants** - Manage menus, orders, and operations
- 🏍️ **Delivery Riders** - Accept orders and earn money
- 👨‍💼 **Admins** - Manage platform, users, and finances

### Vision
To revolutionize the food delivery industry with transparent pricing, superior technology, and better margins for all stakeholders.

### Key Differentiators
- ✅ **Lower Commission Rates**: 10-15% vs competitors' 25-30%
- ✅ **Better UX**: Modern, fast, mobile-first platform
- ✅ **Type-Safe**: Built with TypeScript
- ✅ **Scalable**: Designed for millions of orders
- ✅ **Transparent**: Clear pricing, real-time tracking

---

## ✨ Features

### For Customers
- 🔍 **Restaurant Discovery** - Search, filter, and browse restaurants
- 🛒 **Easy Ordering** - Customizable items, save favorites
- 💳 **Multiple Payment Options** - Card, wallet, COD, mobile wallets
- 📍 **Real-Time Tracking** - Live order and rider tracking
- ⭐ **Ratings & Reviews** - Share feedback and see others' reviews
- 💰 **Coupons & Promotions** - Exclusive deals and discounts

### For Restaurants
- 📋 **Menu Management** - Add, edit, manage food items
- 📊 **Order Management** - Accept/reject orders, track status
- 📈 **Analytics Dashboard** - Revenue, top items, customer insights
- 🎯 **Promotional Tools** - Create offers, manage discounts
- 💰 **Financial Tracking** - Transparent commission, earnings
- 🔔 **Real-Time Notifications** - Instant order alerts

### For Delivery Riders
- 📦 **Smart Order Assignment** - Optimized route suggestions
- 💵 **Earnings Tracking** - Real-time earnings and bonuses
- 📱 **Easy Navigation** - Built-in GPS with offline maps
- 📊 **Performance Metrics** - Rating, reviews, earning history
- 💸 **Quick Withdrawals** - Multiple payout methods
- 🎖️ **Incentive Programs** - Daily bonuses, weekly targets

### For Admins
- 👥 **User Management** - Manage customers, restaurants, riders
- 💼 **Financial Dashboard** - Revenue, payouts, commissions
- 🎟️ **Promotion Management** - Create and track coupons
- 📞 **Support System** - Handle customer issues
- 📊 **Platform Analytics** - Performance metrics, KPIs
- 🔒 **System Configuration** - Settings, policies, features

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.2 (React 18)
- **Styling**: Tailwind CSS 3.x
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **Authentication**: JWT + Cookies
- **Password Hashing**: bcryptjs
- **Database ORM**: Direct MySQL queries

### Database
- **DBMS**: MySQL 8.0+
- **Tables**: 17 normalized tables
- **Relationships**: Proper FK constraints
- **Indexes**: Optimized for common queries

### Infrastructure
- **Hosting**: Vercel (Frontend), AWS RDS (Database)
- **Package Manager**: npm
- **Version Control**: Git

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm installed
- MySQL 8.0+ installed and running
- Git installed
- A code editor (VS Code recommended)

### Step 1: Clone Repository
```bash
git clone https://github.com/Asifkhan600/FOOD_DELIVERY_APP.git
cd FOOD_DELIVERY_APP
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=FOOD_DELIVERY

# JWT Configuration
JWT_SECRET=your-secret-key-min-32-characters-long

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🗄️ Database Setup

### Step 1: Create Database
```bash
mysql -u root -p < DataBase/01_CREATE_DATABASE.SQL
```

### Step 2: Run All Table Scripts
```bash
# Run all SQL files in order
mysql -u root -p FOOD_DELIVERY < DataBase/02_USERS_TABLE.SQL
mysql -u root -p FOOD_DELIVERY < DataBase/03_CUSTOUMERS_TABLE.SQL
mysql -u root -p FOOD_DELIVERY < DataBase/04_RESTURANT_TABLE.SQL
# ... continue with all files
```

### Alternative: Run Complete Schema
```bash
mysql -u root -p FOOD_DELIVERY < DataBase/schema.sql
```

### Verify Database
```bash
mysql -u root -p -e "USE FOOD_DELIVERY; SHOW TABLES;"
```

Expected output: 17+ tables including users, customers, restaurants, orders, etc.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DB_HOST | MySQL server host | localhost |
| DB_PORT | MySQL server port | 3306 |
| DB_USER | MySQL username | root |
| DB_PASSWORD | MySQL password | password |
| DB_NAME | Database name | FOOD_DELIVERY |
| JWT_SECRET | JWT signing secret (32+ chars) | your-secret-key... |
| NEXT_PUBLIC_API_URL | API base URL | http://localhost:3000 |
| NODE_ENV | Environment | development/production |

### Database Configuration
Edit `lib/db.js` to update MySQL connection pool settings:
```javascript
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "FOOD_DELIVERY",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
```

---

## 🎬 Running the Application

### Development Mode
```bash
npm run dev
```
Application will start at: http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

### With Live Reloading
```bash
npm run dev
```

### Linting
```bash
npm run lint
```

---

## 📁 Project Structure

```
FOOD_DELIVERY_APP/
├── app/
│   ├── (auth)/                    # Authentication pages
│   │   ├── login/
│   │   ├── signup/               # Role-based signup page
│   │   └── forgot-password/
│   ├── (dashboard)/              # Protected routes
│   │   ├── admin/               # Admin panel
│   │   ├── restaurant/          # Restaurant dashboard
│   │   └── rider/               # Rider interface
│   ├── (public)/                # Public pages
│   │   ├── page.jsx            # Home page
│   │   ├── restaurants/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── food/[id]/
│   ├── api/                     # API routes
│   │   ├── auth/               # Authentication endpoints
│   │   ├── orders/
│   │   ├── restaurants/
│   │   └── coupons/
│   ├── globals.css
│   └── layout.jsx
│
├── components/
│   ├── common/
│   │   ├── Skeletons.jsx
│   │   ├── StarRating.jsx
│   │   └── StatusBadge.jsx
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── CategoriesSection.jsx
│   │   └── FeaturedRestaurants.jsx
│   ├── dashboard/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Providers.jsx
│   └── restaurant/
│
├── lib/
│   ├── db.js                   # Database connection
│   ├── auth.js                 # Authentication utilities
│   ├── validation.js           # Validation rules
│   ├── utils.js
│   └── constants.js
│
├── types/
│   └── user.ts                 # TypeScript interfaces
│
├── store/
│   ├── authStore.js            # Authentication state
│   └── cartStore.js            # Cart state
│
├── middleware.js               # NextAuth middleware
├── package.json
├── next.config.js
├── tailwind.config.js
├── jsconfig.json
├── .env.local                  # Environment variables
│
├── DataBase/
│   ├── 01_CREATE_DATABASE.SQL
│   ├── 02_USERS_TABLE.SQL
│   ├── 03_CUSTOUMERS_TABLE.SQL
│   └── ... (17 SQL files)
│
├── BUSINESS_PLAN.md            # Comprehensive business plan
├── DATABASE_ER_DIAGRAM.md      # Database schema & relationships
├── SIGNUP_DOCUMENTATION.md     # Signup system documentation
└── README.md                   # This file
```

---

## 📚 Documentation

### Available Documents

1. **[BUSINESS_PLAN.md](./BUSINESS_PLAN.md)**
   - Executive summary
   - Market analysis & competitive landscape
   - Revenue model (commission, ads, premium services)
   - Financial projections (Year 1-3)
   - Operational plan & organizational structure
   - Growth strategy and expansion phases
   - Funding requirements (50M PKR)

2. **[DATABASE_ER_DIAGRAM.md](./DATABASE_ER_DIAGRAM.md)**
   - Complete ER diagram (ASCII format)
   - 17 table schemas with detailed descriptions
   - Relationships and foreign keys
   - Indexes and performance optimization
   - Query patterns and examples
   - Normalization (3NF) details

3. **[SIGNUP_DOCUMENTATION.md](./SIGNUP_DOCUMENTATION.md)**
   - Role-based registration system
   - Field validation rules per role
   - Duplicate account prevention
   - API endpoint documentation
   - Error handling & responses
   - Security considerations

4. **[API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)**
   - Complete API testing examples
   - cURL commands for each endpoint
   - Error scenarios and responses
   - JavaScript/React examples
   - Postman collection template

5. **[UI_FLOW_GUIDE.md](./UI_FLOW_GUIDE.md)**
   - Signup UI flow for each role
   - Form field visibility matrix
   - Responsive design details
   - Accessibility features
   - Loading and success states

---

## 🔐 Authentication

### User Roles
- **Customer** - Browse and order food
- **Restaurant** - Manage restaurant and orders
- **Rider** - Accept and deliver orders
- **Admin** - Manage platform and users

### Login Flow
```
1. User enters email & password
2. API validates credentials against users table
3. Password compared using bcrypt
4. JWT token generated (7-day expiry)
5. Token stored in HTTP-only cookie
6. User redirected to role-specific dashboard
```

### Signup Flow
See [SIGNUP_DOCUMENTATION.md](./SIGNUP_DOCUMENTATION.md) for details.

---

## 💾 Database Schema

### Key Tables
- **users** - All user accounts (16 fields)
- **customers** - Customer profiles (links to users)
- **restaurants** - Restaurant information
- **delivery_riders** - Rider profiles and vehicles
- **orders** - All order records
- **food_items** - Menu items per restaurant
- **payment_transactions** - Payment records
- **coupons** - Promotional codes
- **reviews** - Customer ratings & feedback

See [DATABASE_ER_DIAGRAM.md](./DATABASE_ER_DIAGRAM.md) for complete schema.

---

## 🧪 Testing

### Manual Testing

#### Customer Signup
1. Navigate to `/signup`
2. Select "Customer" role (default)
3. Fill: Name, Email, Password, Phone (optional)
4. Click "Create Account"

#### Restaurant Signup
1. Navigate to `/signup`
2. Click "Restaurant Owner"
3. Fill all required fields including restaurant details
4. Click "Create Account"

#### Duplicate Prevention Test
1. Register as Customer with email: test@example.com
2. Try to register as Restaurant with same email
3. Expect error: "Email already registered as customer"

### API Testing
See [API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md) for cURL examples and Postman collection.

---

## 🚀 Deployment

### Deploy to Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### AWS RDS (Database)
1. Create MySQL 8.0 instance on AWS RDS
2. Update DB_HOST to RDS endpoint
3. Run database scripts on RDS instance

### Environment Variables (Production)
Set these in your hosting platform:
```
DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_PASSWORD=secure-password
JWT_SECRET=long-random-string-min-32-chars
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

---

## 🛣️ API Routes

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/[id]` - Get restaurant details

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders

### Coupons
- `POST /api/coupons/validate` - Validate coupon code

See [SIGNUP_DOCUMENTATION.md](./SIGNUP_DOCUMENTATION.md) for detailed API documentation.

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: Ensure MySQL is running and credentials are correct in `.env.local`

### Port 3000 Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Or run on different port
PORT=3001 npm run dev
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## 📊 Key Metrics

### Performance Targets
- Page Load Time: < 2 seconds
- API Response Time: < 500ms
- Database Query Time: < 50ms
- Uptime: 99.9%

### Business Metrics (Year 1)
- Daily Active Users: 10,000+
- Daily Orders: 10,000+
- Active Restaurants: 500+
- Active Riders: 2,000+
- Monthly Revenue: 18,000,000 PKR

See [BUSINESS_PLAN.md](./BUSINESS_PLAN.md) for detailed projections.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use camelCase for variables and functions
- Use PascalCase for components and classes
- Write descriptive commit messages
- Add comments for complex logic
- Format code with Prettier

---

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 Contact & Support

- **Email**: asif@smartfooddelivery.com
- **GitHub Issues**: https://github.com/Asifkhan600/FOOD_DELIVERY_APP/issues
- **Documentation**: See [BUSINESS_PLAN.md](./BUSINESS_PLAN.md)

---

## 🙏 Acknowledgments

- Built with Next.js and modern web technologies
- Inspired by successful food delivery platforms
- Community feedback and contributions

---

## 📈 Roadmap

### Phase 1: MVP (Current)
- ✅ User authentication (all roles)
- ✅ Restaurant signup and menu management
- ✅ Customer ordering system
- ✅ Order tracking
- ✅ Basic admin panel

### Phase 2: Scale (Q3 2024)
- Rider assignment and navigation
- Payment integration
- Real-time notifications
- Analytics dashboard
- Promotional campaigns

### Phase 3: Advanced (Q4 2024)
- Cloud kitchens support
- Subscription model
- AI-powered recommendations
- Multi-region deployment
- Mobile app (React Native)

### Phase 4: Enterprise (2025)
- B2B services
- API marketplace
- Advanced analytics
- Global expansion

---

**Last Updated**: May 31, 2024  
**Version**: 1.0.0  
**Status**: Active Development 🚀

For more details, visit our [Documentation](./BUSINESS_PLAN.md).
