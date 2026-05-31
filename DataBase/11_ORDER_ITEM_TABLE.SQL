USE FOOD_DELIVERY;
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,

    order_id INT,

    food_id INT,

    food_name VARCHAR(100),

    quantity INT,

    price DECIMAL(10,2),

    subtotal DECIMAL(10,2),

    FOREIGN KEY (order_id)
    REFERENCES orders(order_id)
    ON DELETE CASCADE,

    FOREIGN KEY (food_id)
    REFERENCES food_items(food_id)
);