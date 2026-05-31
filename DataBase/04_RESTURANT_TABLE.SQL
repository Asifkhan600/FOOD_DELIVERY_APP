USE FOOD_DELIVERY;
CREATE TABLE restaurants (
    restaurant_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,

    restaurant_name VARCHAR(100) NOT NULL,
    address TEXT,
    city VARCHAR(50),

    rating DECIMAL(2,1) DEFAULT 0,

    opening_time TIME,
    closing_time TIME,

    delivery_fee DECIMAL(10,2),

    status ENUM('open','closed') DEFAULT 'open',

    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);