USE FOOD_DELIVERY;

CREATE TABLE transaction_logs (

    log_id INT PRIMARY KEY AUTO_INCREMENT,

    transaction_type VARCHAR(100),

    status VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);