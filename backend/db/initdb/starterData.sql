CREATE DATABASE PizzeriaTest;
USE PizzeriaTest;

-- Main User Info
CREATE TABLE Users (
  UserID INT NOT NULL AUTO_INCREMENT,
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  -- Optional PFP
  ProfilePicture VARCHAR(255),
  Email VARCHAR(255) NOT NULL,
  PhoneNumber VARCHAR(25) NOT NULL,
  -- Optional because OAuth doesnt have password
  PasswordHash VARCHAR(255),
  -- OAuth, Site Login, or Other
  Provider VARCHAR(50),
  RegisterAt DATETIME,
  LastLogin DATETIME,
  PRIMARY KEY (UserID)
);

CREATE TABLE Addresses (
  AddressID INT NOT NULL AUTO_INCREMENT,
  UserID INT NOT NULL,
  State VARCHAR(20) NOT NULL,
  City VARCHAR(50) NOT NULL,
  StreetAddress VARCHAR(100) NOT NULL,
  ZipCode VARCHAR(10) NOT NULL,
  IsDefault BOOLEAN NOT NULL,
  PRIMARY KEY (AddressId),
  FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

CREATE TABLE Orders (
  OrderID INT NOT NULL AUTO_INCREMENT,
  UserID INT NOT NULL,
  TotalPrice MEDIUMINT NOT NULL,
  CheckoutTime DATETIME NOT NULL,
  -- Fix This
  DeliveryMethod ENUM("Pickup", "Delivery") NOT NULL,
  Instructions VARCHAR(500),
  Status VARCHAR(50) NOT NULL,
  PRIMARY KEY (OrderID),
  FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

CREATE TABLE Modifiers (
  ModifierID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(100) NOT NULL,
  DisplayText VARCHAR(100) NOT NULL,
  IsRequired BOOLEAN NOT NULL,
  MaxSelection INT,
  -- Double check this
  ModifierType ENUM("RADIO", "CHECKBOX"),
  DefaultOptionID INT,
  DisplayOrder INT NOT NULL,
  IsActive BOOLEAN NOT NULL,
  IsAvailable BOOLEAN NOT NULL,
  Description VARCHAR(255),
  PRIMARY KEY (ModifierID)
);

CREATE TABLE Sections (
  SectionID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(100) NOT NULL,
  DisplayName VARCHAR(100) NOT NULL,
  DisplayOrder INT NOT NULL,
  IsActive BOOLEAN NOT NULL,
  IsAvailable BOOLEAN NOT NULL,
  PRIMARY KEY (SectionID)
);

CREATE TABLE MenuItems (
  ItemID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(100) NOT NULL,
  BasePrice MEDIUMINT,
  Description VARCHAR(500),
  ImageLink VARCHAR(2048),
  IsActive BOOLEAN NOT NULL,
  IsAvailable BOOLEAN NOT NULL,
  DisplayOrder INT NOT NULL,
  IsFeatured BOOLEAN NOT NULL,
  PRIMARY KEY (ItemID)
);

CREATE TABLE SectionItems (
  ComboID INT NOT NULL AUTO_INCREMENT,
  SectionID INT NOT NULL,
  ItemID INT NOT NULL,
  DisplayOrder INT NOT NULL, 
  IsActive BOOLEAN NOT NULL,
  IsAvailable BOOLEAN NOT NULL,
  PRIMARY KEY (ComboID),
  FOREIGN KEY (SectionID) REFERENCES Sections (SectionID),
  FOREIGN KEY (ItemID) REFERENCES MenuItems (ItemID)
);

CREATE TABLE SelectionOptions (
  SelectionOptionID INT NOT NULL AUTO_INCREMENT,
  OptionName VARCHAR(50) NOT NULL,
  PRIMARY KEY (SelectionOptionID)
);

CREATE TABLE ModifierOptions (
  OptionID INT NOT NULL AUTO_INCREMENT,
  ModifierID INT NOT NULL,
  Name VARCHAR(100) NOT NULL, 
  DisplayText VARCHAR(50) NOT NULL,
  IsActive BOOLEAN NOT NULL,
  IsAvailable BOOLEAN NOT NULL,
  BasePrice MEDIUMINT,
  SelectionOptionID INT,
  PRIMARY KEY (OptionID),
  FOREIGN KEY (ModifierID) REFERENCES Modifiers (ModifierID),
  FOREIGN KEY (SelectionOptionID) REFERENCES SelectionOptions (SelectionOptionID)
);

CREATE TABLE OptionOptionPrices (
  ComboID INT NOT NULL AUTO_INCREMENT,
  ParentOptionID INT NOT NULL,
  DependentOptionID INT NOT NULL,
  Price MEDIUMINT NOT NULL,
  IsActive BOOLEAN NOT NULL,
  IsAvailable BOOLEAN NOT NULL,
  PRIMARY KEY (ComboID),
  FOREIGN KEY (ParentOptionID) REFERENCES ModifierOptions (OptionID),
  FOREIGN KEY (DependentOptionID) REFERENCES ModifierOptions (OptionID)
);

CREATE TABLE ItemModifiers (
  ComboID INT NOT NULL AUTO_INCREMENT,
  ItemID INT NULL,
  ModifierID INT NULL,
  DisplayOrder INT NOT NULL, 
  IsActive BOOLEAN NOT NULL,
  IsAvailable BOOLEAN NOT NULL,
  PRIMARY KEY (ComboID),
  FOREIGN KEY (ItemID) REFERENCES MenuItems (ItemID),
  FOREIGN KEY (ModifierID) REFERENCES Modifiers (ModifierID)
);

CREATE TABLE ItemOptionPrices (
  ComboID INT NOT NULL AUTO_INCREMENT,
  ItemID INT NOT NULL,
  OptionID INT NOT NULL,
  Price MEDIUMINT NOT NULL,
  IsActive BOOLEAN NOT NULL,
  IsAvailable BOOLEAN NOT NULL,
  PRIMARY KEY (ComboID),
  FOREIGN KEY (ItemID) REFERENCES MenuItems (ItemID),
  FOREIGN KEY (OptionID) REFERENCES ModifierOptions (OptionID)
);

CREATE TABLE OrderItems (
  OrderItemID INT NOT NULL AUTO_INCREMENT,
  OrderID INT NOT NULL,
  ItemID INT NOT NULL,
  ItemPrice MEDIUMINT NOT NULL,
  PRIMARY KEY (OrderItemID),
  FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
  FOREIGN KEY (ItemID) REFERENCES MenuItems (ItemID)
);

CREATE TABLE OrderItemModifiers (
  OrderItemModifierID INT NOT NULL AUTO_INCREMENT,
  OrderItemID INT NOT NULL,
  ModifierOptionID INT NOT NULL,
  SelectionOptionID INT,
  PRIMARY KEY (OrderItemModifierID),
  FOREIGN KEY (OrderItemID) REFERENCES OrderItems (OrderItemID),
  FOREIGN KEY (ModifierOptionID) REFERENCES ModifierOptions (OptionID),
  FOREIGN KEY (SelectionOptionID) REFERENCES SelectionOptions (SelectionOptionID)
);
