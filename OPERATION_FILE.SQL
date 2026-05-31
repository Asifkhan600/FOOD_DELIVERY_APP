USE FOOD_DELIVERY;
SHOW TABLES;
SELECT * FROM USERS;
INSERT INTO users (

    full_name,
    email,
    password,
    phone,
    role

)
VALUES

(
    'Muhammad Asif Khan',
    'asif@gmail.com',
    '123456',
    '03001234567',
    'customer'
),

(
    'Ali Khan',
    'ali@gmail.com',
    'password123',
    '03112223344',
    'restaurant'
),

(
    'Ahmed Raza',
    'ahmed@gmail.com',
    'mypassword',
    '03223334455',
    'rider'
),

(
    'Admin User',
    'admin@gmail.com',
    'admin123',
    '03334445566',
    'admin'
);
INSERT INTO RESTAURANTS(USER_ID,RESTAURANT_NAME,
ADDRESS,CITY,RATING,OPENING_TIME,CLOSING_TIME,DELIVERY_FEE)
VALUES('10','ASIF RESTAURANT','TMG SHAHID CHOWK','TMG','4.5','8:00','10:00','100');
-- DIFFERENCE
SELECT *FROM USERS
WHERE USER_ID NOT IN (
    SELECT USER_ID
    FROM RESTAURANTS
);
-- INTERSECTION
SELECT *FROM USERS
WHERE USER_ID  IN (
    SELECT USER_ID
    FROM RESTAURANTS
);
-- CARTESIAN PRODUCT
SELECT *FROM USERS
CROSS JOIN RESTAURANTS;
-- RENAME
SELECT FULL_NAME AS NAME
FROM USERS;
DELETE FROM USERS
WHERE USER_ID=16
