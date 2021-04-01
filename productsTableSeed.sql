USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Electric Toothbrush", "Health and Beauty", 5.72, 37),
("Hairbrush", "Health and Beauty", 7.99, 15),
("Toaster", "Housewares", 23.98, 9),
("Rice Cooker", "Housewares", 29.99, 7),
("Skateboard", "Recreation", 54.87, 5),
("Tennis Racquet", "Recreation", 124.99, 8),
("Sandisk USB Thumbdrive 128GB", "Computers", 23.99, 30),
("Brother Printer", "Computers", 219.98, 3),
("Vitamin C Capsules 500mg 100ct", "Supplements", 15.99, 23),
("Vitamin D tablets 100mg 50ct", "Supplements", 12.99, 19);

SELECT * FROM products;