CREATE TABLE Customers (
    Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100),
    Email NVARCHAR(100)
);

CREATE TABLE Orders (
    Id INT PRIMARY KEY IDENTITY,
    CustomerId INT,
    OrderDate DATETIME,
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (CustomerId) REFERENCES Customers(Id)
);

CREATE TABLE OrderItems (
    Id INT PRIMARY KEY IDENTITY,
    OrderId INT,
    ProductName NVARCHAR(100),
    Quantity INT,
    UnitPrice DECIMAL(10, 2),
    FOREIGN KEY (OrderId) REFERENCES Orders(Id)
);

-- Insert Customers
INSERT INTO Customers (Name, Email)
VALUES 
    (N'Nguyễn Văn A', 'a@example.com'),
    (N'Lê Thị B', 'b@example.com'),
    (N'Trần Văn C', 'c@example.com');

-- Insert Orders
INSERT INTO Orders (CustomerId, OrderDate, TotalAmount)
VALUES 
    (1, '2025-06-01 10:30:00', 250.00),
    (2, '2025-06-02 14:45:00', 150.00),
    (1, '2025-06-03 09:20:00', 400.00);

-- Insert OrderItems
INSERT INTO OrderItems (OrderId, ProductName, Quantity, UnitPrice)
VALUES 
    (1, N'Bút bi Thiên Long', 10, 5.00),
    (1, N'Tập học sinh', 5, 10.00),
    (2, N'Cặp học sinh', 1, 150.00),
    (3, N'Balo laptop', 2, 200.00);
