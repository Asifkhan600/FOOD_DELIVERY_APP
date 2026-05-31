USE FOOD_DELIVERY;

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,

    customer_id INT,
    restaurant_id INT,
    rider_id INT,

    customer_name VARCHAR(100),

    restaurant_name VARCHAR(100),

    delivery_address TEXT,

    total_amount DECIMAL(10,2),

    order_status ENUM(
        'pending',
        'accepted',
        'preparing',
        'picked',
        'delivered',
        'cancelled'
    ) DEFAULT 'pending',

    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id),

    FOREIGN KEY (restaurant_id)
    REFERENCES restaurants(restaurant_id),

    FOREIGN KEY (rider_id)
    REFERENCES delivery_riders(rider_id)
);