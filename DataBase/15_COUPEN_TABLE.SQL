USE FOOD_DELIVERY;
CREATE TABLE coupons (
    coupon_id INT PRIMARY KEY AUTO_INCREMENT,

    coupon_code VARCHAR(50) UNIQUE,

    discount_percentage INT,

    expiry_date DATE
);