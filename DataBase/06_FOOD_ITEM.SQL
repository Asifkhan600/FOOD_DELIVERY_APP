USE FOOD_DELIVERY;
CREATE TABLE food_items (
    food_id INT PRIMARY KEY AUTO_INCREMENT,

    restaurant_id INT,
    category_id INT,

    food_name VARCHAR(100) NOT NULL,
    description TEXT,

    price DECIMAL(10,2) NOT NULL,

    image VARCHAR(255),

    availability BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (restaurant_id)
    REFERENCES restaurants(restaurant_id)
    ON DELETE CASCADE,

    FOREIGN KEY (category_id)
    REFERENCES food_categories(category_id)
);