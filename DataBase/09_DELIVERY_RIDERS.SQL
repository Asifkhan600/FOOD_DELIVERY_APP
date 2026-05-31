USE FOOD_DELIVERY;

CREATE TABLE delivery_riders (
    rider_id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT UNIQUE,

    vehicle_type VARCHAR(50),

    license_number VARCHAR(100),

    availability BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);