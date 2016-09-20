CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  ItemID INT AUTO_INCREMENT NOT NULL,
  ProductName VARCHAR(45) NOT NULL,
  DepartmentName VARCHAR(45) NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  StockQuantity INT(10) NOT NULL,
  primary key(ItemID)
);

SELECT * FROM products;

INSERT INTO products(ProductName,DepartmentName,Price,StockQuantity) VALUES ("Dog Food","Pets",3.99,100),
("DOOM","VideoGames",59.99,100),
("Sunglasses","Apparel",19.99,100),
("TShirt","Apparel",15.99,100),
("Monopoly","Board Games",29.99,100),
("Towel","Apparel",9.99,100),
("Mad Max","Movies",19.99,100),
("Jeans","Apparel",19.99,100),
("Laptop","Computers",1549.99,100),
("Shoes","Apparel",39.99,100)
