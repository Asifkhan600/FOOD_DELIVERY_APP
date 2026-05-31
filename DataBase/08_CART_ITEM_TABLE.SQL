USE FOOD_DELIVERY;
CREATE TABLE cart_items (
    cart_item_id INT PRIMARY KEY AUTO_INCREMENT,

    cart_id INT,
    food_id INT,

    quantity INT NOT NULL,

    FOREIGN KEY (cart_id)
    REFERENCES cart(cart_id)
    ON DELETE CASCADE,

    FOREIGN KEY (food_id)
    REFERENCES food_items(food_id)
);