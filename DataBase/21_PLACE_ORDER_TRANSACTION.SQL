USE FOOD_DELIVERY;
DELIMITER $$

CREATE PROCEDURE place_order_transaction(
    IN p_customer_id INT,
    IN p_restaurant_id INT,
    IN p_rider_id INT,
    IN p_customer_name VARCHAR(100),
    IN p_restaurant_name VARCHAR(100),
    IN p_delivery_address TEXT,
    IN p_total_amount DECIMAL(10,2),
    IN p_payment_method VARCHAR(20)
)
BEGIN

    DECLARE v_order_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;

        INSERT INTO transaction_logs(
            transaction_type,
            status
        )
        VALUES(
            'Place Order',
            'Failed'
        );

        SELECT 'Transaction Failed' AS message;
    END;

    START TRANSACTION;

    INSERT INTO orders (
        customer_id,
        restaurant_id,
        rider_id,
        customer_name,
        restaurant_name,
        delivery_address,
        total_amount
    )
    VALUES (
        p_customer_id,
        p_restaurant_id,
        p_rider_id,
        p_customer_name,
        p_restaurant_name,
        p_delivery_address,
        p_total_amount
    );

    SET v_order_id = LAST_INSERT_ID();

    INSERT INTO payments (
        order_id,
        payment_method,
        payment_status
    )
    VALUES (
        v_order_id,
        p_payment_method,
        'paid'
    );

    DELETE FROM cart_items
    WHERE cart_id IN (
        SELECT cart_id
        FROM cart
        WHERE customer_id = p_customer_id
    );

    INSERT INTO transaction_logs(
        transaction_type,
        status
    )
    VALUES(
        'Place Order',
        'Success'
    );

    COMMIT;

    SELECT 'Order Placed Successfully' AS message;

END$$

DELIMITER ;