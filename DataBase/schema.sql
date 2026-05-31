-- ============================================================
--  Smart Food Delivery — Complete Database Schema
--  Engine: MySQL 8+ / MariaDB 10.6+
-- ============================================================

CREATE DATABASE IF NOT EXISTS FOOD_DELIVERY CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE FOOD_DELIVERY;

-- ──────────────────────────────────────────
-- 1. USERS (base auth table)
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  user_id       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(120)        NOT NULL,
  email         VARCHAR(255)        NOT NULL UNIQUE,
  password_hash VARCHAR(255)        NOT NULL,
  phone         VARCHAR(20),
  role          ENUM('customer','restaurant','rider','admin') NOT NULL DEFAULT 'customer',
  is_active     TINYINT(1)          NOT NULL DEFAULT 1,
  created_at    DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role  (role)
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 2. CUSTOMERS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  customer_id   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id       INT UNSIGNED NOT NULL UNIQUE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 3. RESTAURANTS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS restaurants (
  restaurant_id       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id             INT UNSIGNED NOT NULL UNIQUE,
  name                VARCHAR(150)    NOT NULL,
  description         TEXT,
  cuisine_type        VARCHAR(80),
  city                VARCHAR(80)     NOT NULL,
  address             VARCHAR(255),
  phone               VARCHAR(20),
  logo_url            VARCHAR(500),
  banner_url          VARCHAR(500),
  delivery_fee        DECIMAL(8,2)    NOT NULL DEFAULT 50.00,
  min_order_amount    DECIMAL(8,2)    NOT NULL DEFAULT 200.00,
  avg_delivery_time   SMALLINT        NOT NULL DEFAULT 30  COMMENT 'minutes',
  rating              DECIMAL(3,2)    NOT NULL DEFAULT 0.00,
  total_reviews       INT UNSIGNED    NOT NULL DEFAULT 0,
  is_open             TINYINT(1)      NOT NULL DEFAULT 1,
  is_active           TINYINT(1)      NOT NULL DEFAULT 1,
  opening_time        TIME            DEFAULT '09:00:00',
  closing_time        TIME            DEFAULT '23:00:00',
  created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_city   (city),
  INDEX idx_rating (rating)
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 4. FOOD CATEGORIES
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS food_categories (
  category_id   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT UNSIGNED NOT NULL,
  name          VARCHAR(80)  NOT NULL,
  display_order TINYINT      NOT NULL DEFAULT 0,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 5. FOOD ITEMS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS food_items (
  item_id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  restaurant_id   INT UNSIGNED    NOT NULL,
  category_id     INT UNSIGNED,
  name            VARCHAR(150)    NOT NULL,
  description     TEXT,
  price           DECIMAL(10,2)   NOT NULL,
  image_url       VARCHAR(500),
  is_available    TINYINT(1)      NOT NULL DEFAULT 1,
  is_featured     TINYINT(1)      NOT NULL DEFAULT 0,
  calories        SMALLINT UNSIGNED,
  prep_time       TINYINT UNSIGNED COMMENT 'minutes',
  rating          DECIMAL(3,2)    NOT NULL DEFAULT 0.00,
  total_reviews   INT UNSIGNED    NOT NULL DEFAULT 0,
  created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id)   REFERENCES food_categories(category_id) ON DELETE SET NULL,
  INDEX idx_restaurant (restaurant_id),
  INDEX idx_available  (is_available)
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 6. DELIVERY RIDERS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS delivery_riders (
  rider_id      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id       INT UNSIGNED NOT NULL UNIQUE,
  vehicle_type  VARCHAR(60),
  vehicle_reg   VARCHAR(30),
  cnic          VARCHAR(15)  UNIQUE,
  rating        DECIMAL(3,2) NOT NULL DEFAULT 5.00,
  total_deliveries INT UNSIGNED NOT NULL DEFAULT 0,
  status        ENUM('available','busy','offline') NOT NULL DEFAULT 'offline',
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 7. CUSTOMER ADDRESSES
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customer_addresses (
  address_id    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  customer_id   INT UNSIGNED NOT NULL,
  label         ENUM('home','work','other') NOT NULL DEFAULT 'home',
  street        VARCHAR(255) NOT NULL,
  city          VARCHAR(80)  NOT NULL,
  is_default    TINYINT(1)   NOT NULL DEFAULT 0,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 8. COUPONS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coupons (
  coupon_id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code              VARCHAR(30)  NOT NULL UNIQUE,
  discount_type     ENUM('fixed','percentage') NOT NULL DEFAULT 'fixed',
  discount_value    DECIMAL(8,2) NOT NULL,
  max_discount      DECIMAL(8,2),
  min_order_amount  DECIMAL(8,2) NOT NULL DEFAULT 0,
  usage_limit       INT UNSIGNED NOT NULL DEFAULT 1,
  used_count        INT UNSIGNED NOT NULL DEFAULT 0,
  valid_from        DATE,
  valid_until       DATE,
  is_active         TINYINT(1)   NOT NULL DEFAULT 1,
  created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_code (code)
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 9. ORDERS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  order_id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  customer_id       INT UNSIGNED NOT NULL,
  restaurant_id     INT UNSIGNED NOT NULL,
  rider_id          INT UNSIGNED,
  coupon_id         INT UNSIGNED,
  delivery_address  VARCHAR(255) NOT NULL,
  delivery_city     VARCHAR(80)  NOT NULL,
  special_instructions TEXT,
  subtotal          DECIMAL(10,2) NOT NULL,
  delivery_fee      DECIMAL(8,2)  NOT NULL DEFAULT 50.00,
  tax_amount        DECIMAL(8,2)  NOT NULL DEFAULT 0,
  discount_amount   DECIMAL(8,2)  NOT NULL DEFAULT 0,
  total_amount      DECIMAL(10,2) NOT NULL,
  order_status      ENUM('pending','accepted','preparing','picked','delivered','cancelled') NOT NULL DEFAULT 'pending',
  payment_method    ENUM('card','cod','wallet') NOT NULL DEFAULT 'cod',
  payment_status    ENUM('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
  estimated_delivery DATETIME,
  delivered_at      DATETIME,
  created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id)   REFERENCES customers(customer_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
  FOREIGN KEY (rider_id)      REFERENCES delivery_riders(rider_id) ON DELETE SET NULL,
  FOREIGN KEY (coupon_id)     REFERENCES coupons(coupon_id) ON DELETE SET NULL,
  INDEX idx_customer   (customer_id),
  INDEX idx_restaurant (restaurant_id),
  INDEX idx_status     (order_status),
  INDEX idx_created    (created_at)
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 10. ORDER ITEMS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  order_item_id   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id        INT UNSIGNED    NOT NULL,
  item_id         INT UNSIGNED    NOT NULL,
  item_name       VARCHAR(150)    NOT NULL,
  unit_price      DECIMAL(10,2)   NOT NULL,
  quantity        TINYINT UNSIGNED NOT NULL DEFAULT 1,
  total_price     DECIMAL(10,2)   NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (item_id)  REFERENCES food_items(item_id)
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 11. PAYMENTS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  payment_id      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id        INT UNSIGNED    NOT NULL UNIQUE,
  amount          DECIMAL(10,2)   NOT NULL,
  method          ENUM('card','cod','wallet') NOT NULL,
  status          ENUM('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
  gateway_ref     VARCHAR(100),
  created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 12. TRANSACTION LOGS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS transaction_logs (
  log_id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id      INT UNSIGNED    NOT NULL,
  action        VARCHAR(60)     NOT NULL,
  performed_by  ENUM('customer','restaurant','rider','system','admin') NOT NULL DEFAULT 'system',
  status        ENUM('success','failed') NOT NULL DEFAULT 'success',
  notes         TEXT,
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  INDEX idx_order (order_id)
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 13. REVIEWS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  review_id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id      INT UNSIGNED    NOT NULL UNIQUE,
  customer_id   INT UNSIGNED    NOT NULL,
  restaurant_id INT UNSIGNED    NOT NULL,
  rating        TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment       TEXT,
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id)      REFERENCES orders(order_id)      ON DELETE CASCADE,
  FOREIGN KEY (customer_id)   REFERENCES customers(customer_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- 14. RIDER EARNINGS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rider_earnings (
  earning_id    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  rider_id      INT UNSIGNED    NOT NULL,
  order_id      INT UNSIGNED    NOT NULL,
  base_pay      DECIMAL(8,2)    NOT NULL,
  bonus         DECIMAL(8,2)    NOT NULL DEFAULT 0,
  total         DECIMAL(8,2)    NOT NULL,
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (rider_id) REFERENCES delivery_riders(rider_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- SEED: Default admin user (password: Admin@123)
-- ──────────────────────────────────────────
INSERT IGNORE INTO users (name, email, password_hash, role) VALUES
('Admin', 'admin@smartfood.pk', '$2a$12$placeholder_hash_change_this', 'admin');
