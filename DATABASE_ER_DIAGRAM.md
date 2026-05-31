# Smart Food Delivery - Entity Relationship Diagram (ERD)

## Database Schema Overview

This document describes the database schema for the Smart Food Delivery platform, including all tables, relationships, and data integrity constraints.

---

## ER Diagram (Text Format)

```
┌────────────────────┐
│      USERS         │
├────────────────────┤
│ user_id (PK)       │
│ full_name          │
│ email (UNIQUE)     │◄──────────┐
│ password           │           │
│ phone              │           │
│ role (ENUM)        │           │
│ created_at         │           │
└────────────────────┘           │
        │                        │
        │ 1:N                    │
        ├─────────────────────────────┐
        │                             │
        ▼                             │
┌─────────────────────┐    ┌──────────────────────┐
│   CUSTOMERS         │    │   RESTAURANTS        │
├─────────────────────┤    ├──────────────────────┤
│ customer_id (PK)    │    │ restaurant_id (PK)   │
│ user_id (FK)        │    │ user_id (FK)         │
│ profile_image       │    │ restaurant_name      │
│                     │    │ address              │
└─────────────────────┘    │ city                 │
        │                  │ rating               │
        │ 1:N              │ opening_time         │
        │                  │ closing_time         │
        │                  │ delivery_fee         │
        │                  │ status               │
        │                  └──────────────────────┘
        │                           │
        │                           │ 1:N
        │                           │
        │                  ┌────────▼────────────┐
        │                  │   FOOD_ITEMS        │
        │                  ├─────────────────────┤
        │                  │ item_id (PK)        │
        │                  │ restaurant_id (FK)  │
        │                  │ category_id (FK)    │
        │                  │ name                │
        │                  │ description         │
        │                  │ price               │
        │                  │ image               │
        │                  │ available           │
        │                  │ created_at          │
        │                  └─────────────────────┘
        │                           │
        │                           ▲
        │                           │ M:N
        │                           │
        │                  ┌────────┴────────────┐
        │                  │   CART_ITEMS        │
        │                  ├─────────────────────┤
        │                  │ cart_item_id (PK)   │
        │                  │ cart_id (FK)        │
        │                  │ item_id (FK)        │
        │                  │ quantity            │
        │                  │ price               │
        │                  │ special_requests    │
        │                  └─────────────────────┘
        │                           ▲
        │                           │ 1:N
        │                           │
        │                  ┌────────┴────────────┐
        │                  │      CARTS          │
        │                  ├─────────────────────┤
        │                  │ cart_id (PK)        │
        │                  │ customer_id (FK)    │
        │                  │ total_price         │
        │                  │ created_at          │
        │                  │ updated_at          │
        │                  └─────────────────────┘
        │
        │ 1:N
        │
        ▼
┌─────────────────────┐
│      ORDERS         │
├─────────────────────┤
│ order_id (PK)       │
│ customer_id (FK)    │◄──┐
│ restaurant_id (FK)  │   │
│ rider_id (FK)       │   │ 1:N
│ total_amount        │   │
│ delivery_fee        │   │
│ status              │   │
│ delivery_address    │   │
│ notes               │   │
│ created_at          │   │
└─────────────────────┘   │
        │                 │
        │ 1:N             │
        │                 │
        ▼                 │
┌─────────────────────┐   │
│   ORDER_ITEMS       │   │
├─────────────────────┤   │
│ order_item_id (PK)  │   │
│ order_id (FK)       │   │
│ item_id (FK)        │   │
│ quantity            │   │
│ price               │   │
│ special_requests    │   │
└─────────────────────┘   │
                          │
┌─────────────────────┐   │
│   DELIVERY_RIDERS   │   │
├─────────────────────┤   │
│ rider_id (PK)       │   │
│ user_id (FK)        │───┘
│ vehicle_type        │
│ license_number      │
│ availability        │
└─────────────────────┘
        │
        │ 1:N
        │
        ▼
┌──────────────────────────┐
│  PAYMENT_TRANSACTIONS    │
├──────────────────────────┤
│ payment_id (PK)          │
│ order_id (FK)            │
│ customer_id (FK)         │
│ amount                   │
│ status                   │
│ payment_method           │
│ transaction_id           │
│ created_at               │
└──────────────────────────┘

┌────────────────────┐
│  FOOD_CATEGORIES   │
├────────────────────┤
│ category_id (PK)   │
│ name               │
│ image              │
│ description        │
└────────────────────┘

┌─────────────────────┐
│   ADDRESSES         │
├─────────────────────┤
│ address_id (PK)     │
│ customer_id (FK)    │
│ address             │
│ city                │
│ area                │
│ zip_code            │
│ is_default          │
│ created_at          │
└─────────────────────┘

┌─────────────────────┐
│    REVIEWS          │
├─────────────────────┤
│ review_id (PK)      │
│ order_id (FK)       │
│ customer_id (FK)    │
│ restaurant_id (FK)  │
│ rating              │
│ comment             │
│ created_at          │
└─────────────────────┘

┌──────────────────────┐
│  ORDER_STATUS_LOG    │
├──────────────────────┤
│ log_id (PK)          │
│ order_id (FK)        │
│ status               │
│ updated_at           │
│ notes                │
└──────────────────────┘

┌──────────────────────┐
│      COUPONS         │
├──────────────────────┤
│ coupon_id (PK)       │
│ code                 │
│ discount_type        │
│ discount_value       │
│ min_order_amount     │
│ max_uses             │
│ uses_count           │
│ valid_from           │
│ valid_until          │
│ active               │
│ created_at           │
└──────────────────────┘

┌───────────────────────┐
│   TRANSACTION_LOG     │
├───────────────────────┤
│ transaction_id (PK)   │
│ user_id (FK)          │
│ type (income/expense) │
│ amount                │
│ reference_id          │
│ description           │
│ created_at            │
└───────────────────────┘

┌────────────────────┐
│    INVENTORY       │
├────────────────────┤
│ inventory_id (PK)  │
│ item_id (FK)       │
│ quantity           │
│ last_restocked     │
│ updated_at         │
└────────────────────┘
```

---

## Detailed Table Schemas

### 1. USERS Table
**Purpose**: Store user account information for all user types  
**Primary Key**: user_id  
**Unique Constraints**: email

```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('customer','restaurant','rider','admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_email (email),
    KEY idx_role (role)
);
```

**Fields**:
- `user_id`: Unique identifier
- `full_name`: User's full name (2-100 characters)
- `email`: Email address (unique, used for login)
- `password`: Bcrypt hashed password (8+ characters when plain)
- `phone`: Contact phone number
- `role`: User type (customer, restaurant, rider, admin)
- `created_at`: Account creation timestamp

---

### 2. CUSTOMERS Table
**Purpose**: Store customer-specific information  
**Foreign Key**: user_id → users.user_id (1:1 relationship)

```sql
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    profile_image VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    KEY idx_user_id (user_id)
);
```

---

### 3. RESTAURANTS Table
**Purpose**: Store restaurant information  
**Foreign Key**: user_id → users.user_id (1:1 relationship)

```sql
CREATE TABLE restaurants (
    restaurant_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    restaurant_name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0,
    opening_time TIME,
    closing_time TIME,
    delivery_fee DECIMAL(10,2),
    status ENUM('open','closed') DEFAULT 'open',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    KEY idx_city (city),
    KEY idx_rating (rating)
);
```

---

### 4. DELIVERY_RIDERS Table
**Purpose**: Store delivery rider information  
**Foreign Key**: user_id → users.user_id (1:1 relationship)

```sql
CREATE TABLE delivery_riders (
    rider_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    vehicle_type VARCHAR(50),
    license_number VARCHAR(100),
    availability BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    KEY idx_user_id (user_id),
    KEY idx_availability (availability)
);
```

---

### 5. FOOD_CATEGORIES Table
**Purpose**: Store food categories (Biryani, Chinese, Fast Food, etc.)

```sql
CREATE TABLE food_categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    KEY idx_name (name)
);
```

---

### 6. FOOD_ITEMS Table
**Purpose**: Store menu items for restaurants  
**Foreign Keys**: restaurant_id, category_id

```sql
CREATE TABLE food_items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES food_categories(category_id),
    KEY idx_restaurant_id (restaurant_id),
    KEY idx_available (available)
);
```

---

### 7. ADDRESSES Table
**Purpose**: Store customer delivery addresses  
**Foreign Key**: customer_id → customers.customer_id

```sql
CREATE TABLE addresses (
    address_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    area VARCHAR(100),
    zip_code VARCHAR(20),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    KEY idx_customer_id (customer_id)
);
```

---

### 8. CARTS Table
**Purpose**: Store shopping carts for customers

```sql
CREATE TABLE carts (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    total_price DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    KEY idx_customer_id (customer_id)
);
```

---

### 9. CART_ITEMS Table
**Purpose**: Store items in shopping carts  
**Foreign Keys**: cart_id, item_id

```sql
CREATE TABLE cart_items (
    cart_item_id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    special_requests TEXT,
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES food_items(item_id) ON DELETE CASCADE,
    KEY idx_cart_id (cart_id)
);
```

---

### 10. ORDERS Table
**Purpose**: Store all orders  
**Foreign Keys**: customer_id, restaurant_id, rider_id

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    rider_id INT,
    total_amount DECIMAL(12,2) NOT NULL,
    delivery_fee DECIMAL(10,2),
    status ENUM('pending','accepted','preparing','ready','on_way','delivered','cancelled') DEFAULT 'pending',
    delivery_address TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    FOREIGN KEY (rider_id) REFERENCES delivery_riders(rider_id),
    KEY idx_customer_id (customer_id),
    KEY idx_restaurant_id (restaurant_id),
    KEY idx_status (status),
    KEY idx_created_at (created_at)
);
```

---

### 11. ORDER_ITEMS Table
**Purpose**: Store items in each order  
**Foreign Keys**: order_id, item_id

```sql
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    special_requests TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES food_items(item_id),
    KEY idx_order_id (order_id)
);
```

---

### 12. ORDER_STATUS_LOG Table
**Purpose**: Track order status changes

```sql
CREATE TABLE order_status_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    KEY idx_order_id (order_id),
    KEY idx_updated_at (updated_at)
);
```

---

### 13. PAYMENT_TRANSACTIONS Table
**Purpose**: Store payment information

```sql
CREATE TABLE payment_transactions (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    customer_id INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    status ENUM('pending','completed','failed','refunded') DEFAULT 'pending',
    payment_method ENUM('credit_card','debit_card','wallet','cod','mobile_wallet') NOT NULL,
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    KEY idx_order_id (order_id),
    KEY idx_status (status)
);
```

---

### 14. COUPONS Table
**Purpose**: Store promotional coupons

```sql
CREATE TABLE coupons (
    coupon_id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type ENUM('percentage','fixed_amount') NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    min_order_amount DECIMAL(10,2),
    max_uses INT,
    uses_count INT DEFAULT 0,
    valid_from DATETIME NOT NULL,
    valid_until DATETIME NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_code (code),
    KEY idx_active (active)
);
```

---

### 15. REVIEWS Table
**Purpose**: Store customer reviews and ratings

```sql
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    customer_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    KEY idx_restaurant_id (restaurant_id),
    KEY idx_rating (rating)
);
```

---

### 16. TRANSACTION_LOG Table
**Purpose**: Track all financial transactions

```sql
CREATE TABLE transaction_log (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('income','expense','refund','payout') NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    reference_id INT,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    KEY idx_user_id (user_id),
    KEY idx_type (type)
);
```

---

### 17. INVENTORY Table
**Purpose**: Track food item inventory

```sql
CREATE TABLE inventory (
    inventory_id INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    last_restocked DATETIME,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES food_items(item_id) ON DELETE CASCADE,
    KEY idx_item_id (item_id)
);
```

---

## Relationships Summary

| From Table | To Table | Relationship | Type |
|------------|----------|--------------|------|
| users | customers | user_id | 1:1 |
| users | restaurants | user_id | 1:1 |
| users | delivery_riders | user_id | 1:1 |
| customers | addresses | customer_id | 1:N |
| customers | orders | customer_id | 1:N |
| customers | carts | customer_id | 1:1 |
| restaurants | food_items | restaurant_id | 1:N |
| restaurants | orders | restaurant_id | 1:N |
| food_categories | food_items | category_id | 1:N |
| carts | cart_items | cart_id | 1:N |
| food_items | cart_items | item_id | 1:N |
| food_items | order_items | item_id | 1:N |
| food_items | inventory | item_id | 1:1 |
| orders | order_items | order_id | 1:N |
| orders | payment_transactions | order_id | 1:1 |
| orders | order_status_log | order_id | 1:N |
| orders | reviews | order_id | 1:1 |
| delivery_riders | orders | rider_id | 1:N |
| users | transaction_log | user_id | 1:N |

---

## Indexes & Performance Optimization

### Key Indexes
```sql
-- Users
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_role ON users(role);

-- Restaurants
CREATE INDEX idx_city ON restaurants(city);
CREATE INDEX idx_rating ON restaurants(rating);

-- Orders
CREATE INDEX idx_customer_id ON orders(customer_id);
CREATE INDEX idx_restaurant_id ON orders(restaurant_id);
CREATE INDEX idx_status ON orders(status);
CREATE INDEX idx_created_at ON orders(created_at);

-- Food Items
CREATE INDEX idx_restaurant_items ON food_items(restaurant_id);
CREATE INDEX idx_available ON food_items(available);
```

---

## Data Integrity Constraints

1. **Primary Keys**: All tables have unique primary keys
2. **Foreign Keys**: All relationships enforced with FK constraints
3. **Unique Constraints**: Email is unique in users table
4. **Check Constraints**: Rating must be 1-5 in reviews
5. **Default Values**: Timestamps, boolean flags with defaults
6. **ON DELETE CASCADE**: Related records deleted automatically

---

## Query Patterns

### Common Queries

1. **Get restaurant menu with items**
```sql
SELECT fi.item_id, fi.name, fi.price, fc.name as category
FROM food_items fi
JOIN food_categories fc ON fi.category_id = fc.category_id
WHERE fi.restaurant_id = ? AND fi.available = 1;
```

2. **Get customer orders history**
```sql
SELECT o.order_id, r.restaurant_name, o.total_amount, o.status, o.created_at
FROM orders o
JOIN restaurants r ON o.restaurant_id = r.restaurant_id
WHERE o.customer_id = ?
ORDER BY o.created_at DESC;
```

3. **Get rider available orders**
```sql
SELECT o.order_id, r.restaurant_name, o.delivery_address, o.total_amount
FROM orders o
JOIN restaurants r ON o.restaurant_id = r.restaurant_id
WHERE o.status = 'ready' AND o.rider_id IS NULL
ORDER BY o.created_at ASC;
```

4. **Calculate restaurant daily earnings**
```sql
SELECT DATE(o.created_at) as date, 
       SUM(o.total_amount * 0.15) as commission,
       COUNT(o.order_id) as order_count
FROM orders o
WHERE o.restaurant_id = ? AND o.status IN ('delivered', 'completed')
GROUP BY DATE(o.created_at);
```

---

## Database Normalization

The schema follows **Third Normal Form (3NF)**:

1. **1NF**: All columns contain atomic values
2. **2NF**: All non-key attributes depend on entire primary key
3. **3NF**: All non-key attributes depend only on primary key

---

## Scalability Considerations

1. **Partitioning**: Orders table can be partitioned by date/month
2. **Archiving**: Old completed orders can be archived
3. **Read Replicas**: Multiple read-only database replicas
4. **Caching**: Redis cache for frequently accessed data
5. **Sharding**: Partition data by city/region for large scale

---

## Security Measures

1. **Password Hashing**: Bcrypt with 12+ rounds
2. **Data Encryption**: Sensitive data encrypted at rest
3. **Access Control**: Role-based database access
4. **Audit Trail**: Transaction logs for all changes
5. **Foreign Key Constraints**: Referential integrity
6. **Input Validation**: Parameterized queries to prevent SQL injection

---

**Schema Version**: 1.0  
**Last Updated**: May 31, 2024  
**Compatibility**: MySQL 8.0+
