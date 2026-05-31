DELIMITER $$

CREATE PROCEDURE refund_payment(
    IN p_order_id INT
)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE payments
    SET payment_status = 'failed'
    WHERE order_id = p_order_id;

    UPDATE orders
    SET order_status = 'cancelled'
    WHERE order_id = p_order_id;

    INSERT INTO transaction_logs(
        transaction_type,
        status
    )
    VALUES(
        'Refund Payment',
        'Success'
    );

    COMMIT;

END$$

DELIMITER ;