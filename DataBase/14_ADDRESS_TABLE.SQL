USE FOOD_DELIVERY;

CREATE TABLE addresses (
    address_id INT PRIMARY KEY AUTO_INCREMENT,

    customer_id INT,

    address_line TEXT,

    city VARCHAR(50),

    postal_code VARCHAR(20),

    is_default BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
);