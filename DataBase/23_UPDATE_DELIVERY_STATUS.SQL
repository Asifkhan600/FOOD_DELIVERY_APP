DELIMITER $$

CREATE PROCEDURE update_delivery_status(
    IN p_order_id INT,
    IN p_status VARCHAR(20)
)
BEGIN

    START TRANSACTION;

    UPDATE orders
    SET order_status = p_status
    WHERE order_id = p_order_id;

    INSERT INTO transaction_logs(
        transaction_type,
        status
    )
    VALUES(
        'Update Delivery Status',
        'Success'
    );

    COMMIT;

END$$

DELIMITER ;
CALL update_delivery_status(
    1,
    'delivered'
);