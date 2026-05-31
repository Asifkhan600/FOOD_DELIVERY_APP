USE FOOD_DELIVERY;
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,

    customer_id INT,

    restaurant_id INT,

    rating INT CHECK (rating BETWEEN 1 AND 5),

    comment TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id),

    FOREIGN KEY (restaurant_id)
    REFERENCES restaurants(restaurant_id)
);