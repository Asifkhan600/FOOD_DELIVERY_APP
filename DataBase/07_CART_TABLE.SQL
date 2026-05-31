USE FOOD_DELIVERY;
CREATE TABLE cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,

    customer_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
    ON DELETE CASCADE
);