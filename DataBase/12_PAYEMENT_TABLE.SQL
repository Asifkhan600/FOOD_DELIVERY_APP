USE FOOD_DELIVERY;

CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,

    order_id INT,

    payment_method ENUM(
        'cash',
        'card',
        'wallet'
    ),

    payment_status ENUM(
        'pending',
        'paid',
        'failed'
    ) DEFAULT 'pending',

    paid_at TIMESTAMP NULL,

    FOREIGN KEY (order_id)
    REFERENCES orders(order_id)
);