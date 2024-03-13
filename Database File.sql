create database QuitQDB ; 

USE QuitQDB;

CREATE TABLE Users (
    UserId INT IDENTITY(10000,1) PRIMARY KEY,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    FullName NVARCHAR(100) NOT NULL,
    PhoneNumber NVARCHAR(20) NOT NULL,
    Address NVARCHAR(255) NOT NULL ,
    Password NVARCHAR(16) NOT NULL ,
    Gender NVARCHAR(10) CHECK (Gender IN ('Male', 'Female', 'Other'))
);


CREATE TABLE Seller (
    SellerId INT IDENTITY(100,1) PRIMARY KEY,
    Seller_Email NVARCHAR(255) UNIQUE NOT NULL,
    Seller_FullName NVARCHAR(100) NOT NULL,
    Seller_PhoneNumber NVARCHAR(20)NOT NULL,
    Seller_Address NVARCHAR(255) NOT NULL ,
    Seller_Password NVARCHAR(16) NOT NULL ,
    Seller_Gender NVARCHAR(10) CHECK (Seller_Gender IN ('Male', 'Female', 'Other'))
);



CREATE TABLE Administrator (
    AdminId INT IDENTITY(1000,1) PRIMARY KEY,
    Admin_Email NVARCHAR(255) UNIQUE NOT NULL,
    Admin_FullName NVARCHAR(100) NOT NULL,
    Admin_PhoneNumber NVARCHAR(20)NOT NULL,
    Admin_Password NVARCHAR(16) NOT NULL ,
);


CREATE TABLE Categories (
    CategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Category_Name NVARCHAR(100) UNIQUE NOT NULL
);


CREATE TABLE Products (
	ProductId INT IDENTITY(1,1) PRIMARY KEY,
	Product_Name NVARCHAR(255) NOT NULL,
	Description NVARCHAR(255),
	Price DECIMAL(10, 2) NOT NULL,
	Quantity_In_Stock INT NOT NULL,
	CategoryId INT NOT NULL,
	SellerId INT NOT NULL,
	ProductUrl text,
	CONSTRAINT FK_Products_Categories FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_Products_Seller FOREIGN KEY (SellerId) REFERENCES Seller(SellerId) ON UPDATE CASCADE ON DELETE CASCADE
);



CREATE TABLE Cart (
    CartId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
	ProductId INT NOT NULL,
	Quantity INT NOT NULL,
	Amount DECIMAL(10,2) ,
    Created_at DATETIME DEFAULT GETDATE(),
	CONSTRAINT FK_Cart_Users FOREIGN KEY (UserId) REFERENCES Users(UserId) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_Cart_Products FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON UPDATE CASCADE ON DELETE CASCADE
);



CREATE TABLE Orders (
    OrderId INT IDENTITY(1,1)  PRIMARY KEY,
    UserId INT NOT NULL,
	Order_Date DATETIME DEFAULT GETDATE(),
	Shipping_Address NVARCHAR(500) NOT NULL,
	Amount DECIMAL(10,2),
	Status NVARCHAR(20),
	CONSTRAINT FK_Orders_Users FOREIGN KEY (UserId) REFERENCES Users(UserId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Order_Items (
    OrderItemId INT IDENTITY(1,1)  PRIMARY KEY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    Item_Total_Price DECIMAL(10, 2)  ,
	CONSTRAINT FK_Order_Items_Products FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT FK_Order_Items_Orders FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON UPDATE CASCADE ON DELETE CASCADE
);



CREATE TABLE Payments (
    PaymentId INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT NOT NULL,
    PaymentDate DATE DEFAULT GETDATE() NOT NULL,
    PaymentStatus NVARCHAR(50) ,
	CONSTRAINT Fk_Payments_Orders FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON UPDATE CASCADE ON DELETE CASCADE
);




-------------------------Triggers-----------------------------------------------------------------------------------------------------------------

CREATE or alter TRIGGER Update_stock_quantity
ON Order_Items
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Products
    SET Quantity_In_Stock = Quantity_In_Stock - i.Quantity
    FROM Products
    INNER JOIN inserted i ON Products.ProductId = i.ProductId;
END;


CREATE TRIGGER Order_Amount
ON Order_items
AFTER UPDATE , Delete
AS 
BEGIN
	 UPDATE Orders
	 set Amount=(SELECT SUM(Order_Items.Item_Total_Price) FROM Order_Items GROUP BY Order_Items.OrderId HAVING Order_Items.OrderId=Orders.OrderId)
END;



INSERT INTO Users (Email, FullName, PhoneNumber, Address, Password, Gender)
VALUES ('dineshsg@gmail.com', 'Dinesh Solanki G', '9535905175', '123 Main St, Bangalore Karnataka', 'dinesh123', 'Male');

INSERT INTO Seller (Seller_Email, Seller_FullName, Seller_PhoneNumber, Seller_Address, Seller_Password, Seller_Gender)
VALUES 
    ('seller1@gmail.com', 'Seller1', '9535905171', '123 Main Street, Bangalore 560001', 'seller1', 'Female'),
    ('seller2@gmail.com', 'Seller2', '9535905172', '456 Elm Street, Bangalore 560002', 'seller2', 'Male'),
    ('seller3@gmail.com', 'Seller3', '9535905173', '789 Oak Street, Bangalore 560003', 'seller3', 'Female'),
    ('seller4@gmail.com', 'Seller4', '9535905174', '101 Pine Street, Bangalore 560004', 'seller4', 'Male'),
    ('seller5@gmail.com', 'Seller5', '9535905175', '202 Maple Street, Bangalore 560005', 'seller5', 'Female'),
    ('seller6@gmail.com', 'Seller6', '9535905176', '303 Cedar Street, Bangalore 560006', 'seller6', 'Male'),
    ('seller7@gmail.com', 'Seller7', '9535905177', '404 Birch Street, Bangalore 560007', 'seller7', 'Female');


INSERT INTO Administrator (Admin_Email, Admin_FullName, Admin_PhoneNumber, Admin_Password)
VALUES ('dinesh@gmail.com', 'dinesh', '9535905179', 'dinesh123');

INSERT INTO Categories (Category_Name) VALUES 
    ('Electronics'),
    ('Clothing'),
    ('Home Decor'),
    ('Books'),
    ('Pet Accessories'),
    ('Snacks'),
    ('Home Accessories');




SELECT * FROM Users;
SELECT * FROM Seller;
SELECT * FROM Administrator;
SELECT * FROM Categories;
SELECT * FROM Products;
SELECT * FROM Cart;
SELECT * FROM Orders;
SELECT * FROM Order_Items;
SELECT * FROM Payments;



--
INSERT INTO Products (Product_Name, Description, Price, Quantity_In_Stock, CategoryId, SellerId, ProductUrl)
VALUES
    ('Smartphone X', 'High-performance smartphone with the latest features.', 45000.00, 50, 1, 100, 'https://media.wired.com/photos/64542519f2de86183cf5b286/master/w_1600%2Cc_limit/Motorola-Moto-G-Power-5G-review-Featured-Gear.jpg'),
    ('Laptop Pro', 'Powerful laptop for professional use with a sleek design.', 95000.00, 30, 1, 100, 'https://sm.ign.com/ign_in/deal/t/the-alienw/the-alienware-m17-17-amd-ryzen-9-rtx-3070-ti-gaming-laptop-d_yyh2.jpg'),
    ('Wireless Earbuds', 'Premium wireless earbuds with noise cancellation.', 11000.00, 100, 1, 100, 'https://media.wired.com/photos/652d5d6f7089374af4e74fc4/master/pass/Jlab-Jbuds-Mini-SOURCE-JLab-Gear.jpg'),
    ('4K Smart TV', 'Large-screen 4K smart TV for an immersive viewing experience.', 64000.00, 20, 1, 100, 'https://www.hindustantimes.com/ht-img/img/2023/09/19/550x309/LED_TV_1695123123749_1695123147285.JPG'),
    ('Gaming Console', 'Next-gen gaming console with advanced graphics and performance.', 35000.00, 15, 1, 100, 'https://phantom-marca.unidadeditorial.es/18b979df565f72126a8eaea36c2df406/resize/828/f/jpg/assets/multimedia/imagenes/2023/12/11/17022938196238.jpg'),
    ('Digital Camera', 'High-resolution digital camera for capturing stunning images.', 56000.00, 25, 1, 100, 'https://i.pcmag.com/imagery/roundups/018cwxjHcVMwiaDIpTnZJ8H-22..v1570842461.jpg'),
    ('Fitness Tracker', 'Smart fitness tracker to monitor your health and activities.', 5000.00, 50, 1, 100, 'https://i.pcmag.com/imagery/encyclopedia-terms/fitness-tracker-_fbsurge.fit_lim.size_1050x.jpg'),
    ('Home Security System', 'Complete home security system with cameras and sensors.', 42000.00, 10, 1, 100, 'https://www.safehome.org/app/uploads/2023/08/SimpliSafe-has-some-new-and-improved-equipment-to-test..png'),
    ('Smart Thermostat', 'Energy-efficient smart thermostat for home temperature control.', 8900.00, 40, 1, 100, 'https://cdn.mos.cms.futurecdn.net/Ek2kyrb7BqbAZXepGvvVYL.jpg'),
    ('Portable Bluetooth Speaker', 'Compact and portable Bluetooth speaker for on-the-go music.', 3300.00, 80, 1, 100, 'https://www.hindustantimes.com/ht-img/img/2023/12/28/550x309/pexels-photo-11103381_1703745149861_1703745194683.jpeg');

--

INSERT INTO Products (Product_Name, Description, Price, Quantity_In_Stock, CategoryId, SellerId, ProductUrl)
VALUES
    ('Mens Jeans', 'Classic blue jeans for a casual and comfortable look.', 1499.00, 50, 2, 101, 'https://assets.ajio.com/medias/sys_master/root/20220808/Z5T0/62f0ebc7aeb26921afce50d9/-473Wx593H-464781661-blue-MODEL.jpg'),
    ('Womens Dress', 'Elegant dress for special occasions, available in various colors.', 2499.00, 30, 2, 101, 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/24566284/2023/8/21/091dcd7a-5e1e-452e-8e7e-73cf85859deb1692590890198EthnicDresses1.jpg'),
    ('T-shirt Pack', 'Set of three cotton T-shirts in different colors for everyday wear.', 999.00, 100, 2, 101, 'https://www.thewalkdeal.com/cdn/shop/products/6_03621829-4342-4a18-9090-1a4303263eca.jpg'),
    ('Sports Jacket', 'Stylish sports jacket for a trendy and active lifestyle.', 1999.00, 20, 2, 101, 'https://5.imimg.com/data5/SELLER/Default/2021/5/ON/WY/VV/1756364/mens-sport-jacket-500x500.jpg'),
    ('Casual Shoes', 'Comfortable and fashionable casual shoes for men and women.', 1299.00, 15, 2, 101, 'https://5.imimg.com/data5/SELLER/Default/2022/11/IY/DU/OD/116453489/white-casual-shoes-for-men-500x500.jpg'),
    ('Winter Coat', 'Warm and stylish winter coat to keep you cozy in cold weather.', 3499.00, 25, 2, 101, 'https://images-cdn.ubuy.co.in/6546adb5d66af35d6f1afa49-zshow-girls-39-winter-coat-long-hooded.jpg'),
    ('Sunglasses', 'Fashionable sunglasses to add a touch of style to your look.', 799.00, 50, 2, 101, 'https://www.verywellhealth.com/thmb/CXkPB3b0u5u9oz7BylGvwGpVIAc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-730132839-5a1e0b74482c520037eed28c.jpg'),
    ('Leather Belt', 'High-quality leather belt for a polished and sophisticated appearance.', 599.00, 10, 2, 101, 'https://cdn.shopclues.com/images1/thumbnails/98159/640/1/144586455-98159142-1654996902.jpg'),
    ('Formal Shirt', 'Classic formal shirt for a professional and refined look.', 1699.00, 40, 2, 101, 'https://5.imimg.com/data5/SELLER/Default/2023/7/326604149/SV/WZ/AS/193245561/men-formal-shirts.jpg'),
    ('Handbag', 'Chic handbag to complement your outfit and carry your essentials.', 1599.00, 80, 2, 101, 'https://5.imimg.com/data5/SELLER/Default/2022/5/UZ/VS/OX/76808230/geocarter-handbag-fashion-satchel-purse-top-handle-tote-for-women.jpg');


INSERT INTO Products (Product_Name, Description, Price, Quantity_In_Stock, CategoryId, SellerId, ProductUrl)
VALUES
    ('Cozy Throw Blanket', 'Soft and cozy throw blanket for chilly evenings.', 799.00, 40, 3, 102, 'https://www.jiomart.com/images/product/original/rvqoy1ju1t/nivasam-plush-blanket-500-gsm-lightweight-cozy-ultra-soft-premium-luxury-throw-for-double-bed-sofa-couch-travel-camping-200x240-cm-or-80x95-inches-product-images-orvqoy1ju1t-p597898587-0-202301270228.jpg'),
    ('Decorative Wall Clock', 'Elegant wall clock to add a stylish touch to your home.', 1299.00, 35, 3, 102, 'https://5.imimg.com/data5/SELLER/Default/2021/1/FR/ZF/QG/79340086/136347235-447439539968224-8117387608901771126-o.jpg'),
    ('Ceramic Flower Vases', 'Set of three ceramic vases to showcase your favorite flowers.', 899.00, 45, 3, 102, 'https://5.imimg.com/data5/SELLER/Default/2021/3/RA/HN/ID/119233132/flower-pot-blue-pottery-fp001-rs-399-one-pc-.jpg'),
    ('Faux Fur Rug', 'Luxurious faux fur rug to enhance the comfort of your living space.', 2499.00, 40, 3, 102, 'https://5.imimg.com/data5/SELLER/Default/2021/11/VI/XZ/XU/34782322/81skrpbahgl-sl1500-jpg.jpg'),
    ('Modern Table Lamp', 'Sleek and modern table lamp for ambient lighting in any room.', 1499.00, 38, 3, 102, 'https://5.imimg.com/data5/SELLER/Default/2021/8/AE/UA/OS/94577002/wowcrafts-modern-round-shape-table-lamp-500x500.jpg'),
    ('Throw Pillow Set', 'Set of decorative throw pillows to add a pop of color to your sofa.', 699.00, 50, 3, 102, 'https://i.pinimg.com/originals/d3/85/61/d385618593ebe7188ca05529368a1f3c.jpg'),
    ('Wall Art Canvas', 'Abstract wall art canvas to create a focal point in your home.', 1899.00, 32, 3, 102, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHhFm-YgwsqNvPUIBrclmB1aaevX4Rr2jxsw&usqp=CAU'),
    ('Cotton Bedding Set', 'Comfortable and stylish cotton bedding set for a good night sleep', 2199.00, 42, 3, 102, 'https://5.imimg.com/data5/ANDROID/Default/2022/7/OA/SX/WC/63235302/product-jpeg-500x500.jpg'),
    ('Ceramic Dinnerware Set', 'Complete ceramic dinnerware set for elegant dining at home.', 1799.00, 48, 3, 102, 'https://5.imimg.com/data5/SELLER/Default/2022/12/LP/VQ/DQ/90557106/stoneware-dinnerware.jpg'),
    ('Candle Holder Set', 'Set of decorative candle holders to create a warm atmosphere.', 999.00, 35, 3, 102, 'https://5.imimg.com/data5/SELLER/Default/2023/1/QN/GF/TU/78222702/74-500x500.jpg');
    
    

 


INSERT INTO Products (Product_Name, Description, Price, Quantity_In_Stock, CategoryId, SellerId, ProductUrl)
VALUES 
    ('The Great Gatsby', 'Classic novel by F. Scott Fitzgerald', 129, 50, 4, 103, 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471173936/the-great-gatsby-9781471173936_hr.jpg'),
    ('To Kill a Mockingbird', 'Classic novel by Harper Lee', 109, 40, 4, 103, 'https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg'),
    ('Harry Potter and the Philosopher''s Stone', 'First book in the Harry Potter series', 599, 30, 4, 103, 'https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg'),
    ('1984', 'Dystopian novel by George Orwell', 199, 45, 4, 103, 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg'),
    ('The Catcher in the Rye', 'Classic novel by J.D. Salinger', 99, 55, 4, 103, 'https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF1000,1000_QL80_.jpg');

INSERT INTO Products (Product_Name, Description, Price, Quantity_In_Stock, CategoryId, SellerId, ProductUrl)
VALUES 
    ('Pet Bed', 'Soft and cozy bed for your pet', 799.99, 20, 5, 104, 'https://www.jiomart.com/images/product/original/rv0q1tgtzn/sitsnooze-dog-bed-ultra-soft-polyester-filled-round-shape-pet-bed-made-from-fleece-so-highly-machine-washable-cozy-place-for-your-furry-friend-size-large-color-blue-product-images-orv0q1tgtzn-p597641636-1-202301171418.png?im=Resize=(1000,1000)'),
    ('Cat Toy Set', 'Assorted toys for cats', 349.99, 30, 5, 104, 'https://images-cdn.ubuy.ae/63919cbbf6c07f4e207456b3-21-pcs-cat-toys-kitten-toys-assortments.jpg'),
    ('Dog Leash', 'Durable leash for dogs', 449.99, 25, 5, 104, 'https://m.media-amazon.com/images/I/61XeCsmCNXL.jpg'),
    ('Pet Grooming Kit', 'Kit containing grooming tools for pets', 699.99, 15, 5, 104, 'https://m.media-amazon.com/images/I/61AdoOztqGL._AC_UF1000,1000_QL80_.jpg'),
    ('Bird Cage', 'Spacious cage for birds', 1099.99, 10, 5, 104, 'https://images-cdn.ubuy.co.in/633b25ddd836bf2f7579ae7c-ubuy-online-shopping.jpg');

INSERT INTO Products (Product_Name, Description, Price, Quantity_In_Stock, CategoryId, SellerId, ProductUrl)
VALUES 
    ('Potato Chips', 'Classic potato chips for a tasty snack.', 20, 50, 6, 105, 'https://fetchnbuy.in/cdn/shop/products/40100617_8-bingo-potato-chips-original-style-chilli-sprinkled_grande.jpg'),
    ('Chocolate Bars', 'Assorted chocolate bars for a sweet treat.', 50, 40, 6, 105, 'https://cdnprod.mafretailproxy.com/sys-master-root/h9f/h47/47992725274654/480Wx480H_1206350_main.jpg'),
    ('Mixed Nuts', 'A healthy mix of nuts for a satisfying snack.', 30, 35, 6, 105, 'https://images-cdn.ubuy.co.in/65a76c03dea8c9074b327075-signature-39-s-kirkland-fancy-mixed.jpg'),
    ('Popcorn', 'Butter-flavored popcorn for a movie night at home.', 10, 45, 6, 105, 'https://5.imimg.com/data5/YN/EH/MY-17088358/img-20170912-wa0039.jpg'),
    ('Energy Bars', 'Nutritious energy bars for a quick and healthy snack.', 20, 40, 6, 105, 'https://www.bigbasket.com/media/uploads/p/l/40130163-2_14-gooddiet-nutrition-energy-bar-dates-walnut.jpg');
  
INSERT INTO Products (Product_Name, Description, Price, Quantity_In_Stock, CategoryId, SellerId, ProductUrl)
VALUES 
    ('Smart TV 4K', 'High-quality 55-inch smart TV with 4K resolution.', 54999.00, 50, 14, 111, 'https://th.bing.com/th/id/OIP.gqKOsm6rUHCl5sV0WynO7AHaE8?rs=1&pid=ImgDetMain'),
    ('Refrigerator with French Doors', 'Energy-efficient refrigerator with spacious French doors.', 89999.00, 40, 14, 111, 'https://images.homedepot-static.com/productImages/eeb5f3e9-25d8-4149-8480-98579a1ef4a5/svn/stainless-steel-ge-french-door-refrigerators-gne25jskss-64_1000.jpg'),
    ('Washing Machine - Front Load', 'Front-loading washing machine with multiple wash programs.', 64999.00, 35, 14, 111, 'https://th.bing.com/th/id/OIP.5kdHds5giFNR-iy_Bn0AXAHaLH?rs=1&pid=ImgDetMain'),
    ('Air Purifier - HEPA Filter', 'HEPA filter air purifier for clean and fresh indoor air.', 18999.00, 45, 14, 111, 'https://www.honeywellstore.com/store/images/products/large_images/hpa5100b-honeywell-insight-series-hepa-air-purifiers.jpg'),
    ('Robotic Vacuum Cleaner', 'Smart robotic vacuum cleaner for efficient cleaning.', 29999.00, 40, 14, 111, 'https://i5.walmartimages.com/asr/27d099b3-aff6-41af-97d6-ce6a80ad0982_1.a3b9c134c1d8004084661286fece8371.jpeg'),
    ('Electric Kettle - Stainless Steel', 'Stainless steel electric kettle for quick and convenient boiling.', 2499.00, 50, 14, 111, 'https://assets.epicurious.com/photos/5ad6389443f92a3268c0b8c5/5:4/w_6780,h_5424,c_limit/The-Best-Electric-Kettle-11042018.jpg'),
    ('LED Desk Lamp', 'Adjustable LED desk lamp for focused lighting.', 1299.00, 35, 14, 111, 'https://i5.walmartimages.com/asr/0a1fb1fa-dd6c-412a-a8a0-ad4ef171181d_1.aecceb6045d25d3a8c4406c5d1a0e278.jpeg'),
    ('Bluetooth Speaker System', 'Wireless Bluetooth speaker system for immersive audio.', 4499.00, 40, 14, 111, 'https://th.bing.com/th/id/OIP.yLq6g_xjvQTpy4OefmzzEQAAAA?rs=1&pid=ImgDetMain'),
    ('Coffee Maker - Programmable', 'Programmable coffee maker for brewing the perfect cup.', 3999.00, 45, 14, 111, 'https://images.homedepot-static.com/productImages/dd7ee63c-e01e-4cb4-91c0-ede1a731fe3d/svn/black-mr-coffee-coffee-makers-bvmc-dmx85-rb-64_1000.jpg'),
    ('Electric Fan - Tower', 'Tower-style electric fan with oscillation for cooling.', 3499.00, 38, 14, 111, 'https://th.bing.com/th/id/OIP.WAUWtkNy2LxD9-n2k33t7gHaHa?rs=1&pid=ImgDetMain');

INSERT INTO Products (Product_Name, Description, Price, Quantity_In_Stock, CategoryId, SellerId, ProductUrl)
VALUES 
    ('Smart TV 4K', 'High-quality 55-inch smart TV with 4K resolution.', 54999.00, 50, 7, 106, 'https://th.bing.com/th/id/OIP.gqKOsm6rUHCl5sV0WynO7AHaE8?rs=1&pid=ImgDetMain'),
    ('Refrigerator with French Doors', 'Energy-efficient refrigerator with spacious French doors.', 89999.00, 40, 7, 106, 'https://images.homedepot-static.com/productImages/eeb5f3e9-25d8-4149-8480-98579a1ef4a5/svn/stainless-steel-ge-french-door-refrigerators-gne25jskss-64_1000.jpg'),
    ('Washing Machine - Front Load', 'Front-loading washing machine with multiple wash programs.', 64999.00, 35, 7, 106, 'https://th.bing.com/th/id/OIP.5kdHds5giFNR-iy_Bn0AXAHaLH?rs=1&pid=ImgDetMain'),
    ('Air Purifier - HEPA Filter', 'HEPA filter air purifier for clean and fresh indoor air.', 18999.00, 45, 7, 106, 'https://www.honeywellstore.com/store/images/products/large_images/hpa5100b-honeywell-insight-series-hepa-air-purifiers.jpg'),
    ('Robotic Vacuum Cleaner', 'Smart robotic vacuum cleaner for efficient cleaning.', 29999.00, 40, 7, 106, 'https://i5.walmartimages.com/asr/27d099b3-aff6-41af-97d6-ce6a80ad0982_1.a3b9c134c1d8004084661286fece8371.jpeg'),
    ('Electric Kettle - Stainless Steel', 'Stainless steel electric kettle for quick and convenient boiling.', 2499.00, 50, 7, 106, 'https://assets.epicurious.com/photos/5ad6389443f92a3268c0b8c5/5:4/w_6780,h_5424,c_limit/The-Best-Electric-Kettle-11042018.jpg'),
    ('LED Desk Lamp', 'Adjustable LED desk lamp for focused lighting.', 1299.00, 35, 7, 106, 'https://i5.walmartimages.com/asr/0a1fb1fa-dd6c-412a-a8a0-ad4ef171181d_1.aecceb6045d25d3a8c4406c5d1a0e278.jpeg'),
    ('Bluetooth Speaker System', 'Wireless Bluetooth speaker system for immersive audio.', 4499.00, 40, 7, 106, 'https://th.bing.com/th/id/OIP.yLq6g_xjvQTpy4OefmzzEQAAAA?rs=1&pid=ImgDetMain'),
    ('Coffee Maker - Programmable', 'Programmable coffee maker for brewing the perfect cup.', 3999.00, 45, 7, 106, 'https://images.homedepot-static.com/productImages/dd7ee63c-e01e-4cb4-91c0-ede1a731fe3d/svn/black-mr-coffee-coffee-makers-bvmc-dmx85-rb-64_1000.jpg'),
    ('Electric Fan - Tower', 'Tower-style electric fan with oscillation for cooling.', 3499.00, 38, 7, 106, 'https://th.bing.com/th/id/OIP.WAUWtkNy2LxD9-n2k33t7gHaHa?rs=1&pid=ImgDetMain');
