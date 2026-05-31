USE FOOD_DELIVERY;
CREATE TABLE inventory (
    inventory_id INT PRIMARY KEY AUTO_INCREMENT,

    food_id INT,

    quantity_available INT,

    FOREIGN KEY (food_id)
    REFERENCES food_items(food_id)
);