DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(8,2),
    stock_quantity INT DEFAULT 0,
    product_sales DECIMAL(8,2) DEFAULT 0,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments(
    department_id int AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(8,2),
    PRIMARY KEY (department_id)
);