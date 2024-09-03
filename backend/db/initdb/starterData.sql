CREATE DATABASE pizzeria_test;
USE pizzeria_test;

-- Main User Info
CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  -- Optional PFP
  profile_picture VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(25) NOT NULL,
  -- Optional because OAuth doesnt have password
  password_hash VARCHAR(255),
  -- OAuth, Site Login, or Other
  provider VARCHAR(50),
  registered_at DATETIME,
  last_login DATETIME,
  PRIMARY KEY (user_id)
);

CREATE TABLE addresses (
  address_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  state VARCHAR(20) NOT NULL,
  city VARCHAR(50) NOT NULL,
  street_address VARCHAR(100) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  is_default BOOLEAN NOT NULL,
  PRIMARY KEY (address_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE orders (
  order_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_price MEDIUMINT NOT NULL,
  checkout_time DATETIME NOT NULL,
  -- Fix This
  delivery_method ENUM("Pickup", "Delivery") NOT NULL,
  instructions VARCHAR(500),
  status VARCHAR(50) NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE modifiers (
  modifier_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  display_text VARCHAR(100) NOT NULL,
  is_required BOOLEAN NOT NULL,
  max_selection INT,
  -- Double check this
  modifier_type ENUM("RADIO", "CHECKBOX"),
  default_option_id INT,
  display_order INT NOT NULL,
  is_active BOOLEAN NOT NULL,
  is_available BOOLEAN NOT NULL,
  description VARCHAR(255),
  PRIMARY KEY (modifier_id)
);

CREATE TABLE sections (
  section_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  display_text VARCHAR(100) NOT NULL,
  display_order INT NOT NULL,
  is_active BOOLEAN NOT NULL,
  is_available BOOLEAN NOT NULL,
  PRIMARY KEY (section_id)
);

CREATE TABLE menu_items (
  item_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  base_price MEDIUMINT,
  description VARCHAR(500),
  image_link VARCHAR(2048),
  display_text VARCHAR(100),
  display_price MEDIUMINT,
  is_active BOOLEAN NOT NULL,
  is_available BOOLEAN NOT NULL,
  display_order INT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id)
);

CREATE TABLE section_items (
  combo_id INT NOT NULL AUTO_INCREMENT,
  section_id INT NOT NULL,
  item_id INT NOT NULL,
  display_order INT NOT NULL, 
  is_active BOOLEAN NOT NULL,
  is_available BOOLEAN NOT NULL,
  PRIMARY KEY (combo_id),
  FOREIGN KEY (section_id) REFERENCES sections (section_id),
  FOREIGN KEY (item_id) REFERENCES menu_items (item_id)
);

CREATE TABLE selection_options (
  selection_option_id INT NOT NULL AUTO_INCREMENT,
  option_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (selection_option_id)
);

CREATE TABLE modifier_options (
  option_id INT NOT NULL AUTO_INCREMENT,
  modifier_id INT NOT NULL,
  name VARCHAR(100) NOT NULL, 
  display_text VARCHAR(50) NOT NULL,
  is_active BOOLEAN NOT NULL,
  is_available BOOLEAN NOT NULL,
  base_price MEDIUMINT,
  selection_option_id INT,
  PRIMARY KEY (option_id),
  FOREIGN KEY (modifier_id) REFERENCES modifiers (modifier_id),
  FOREIGN KEY (selection_option_id) REFERENCES selection_options (selection_option_id)
);

CREATE TABLE option_option_prices (
  combo_id INT NOT NULL AUTO_INCREMENT,
  parent_option_id INT NOT NULL,
  dependent_option_id INT NOT NULL,
  price MEDIUMINT NOT NULL,
  is_active BOOLEAN NOT NULL,
  is_available BOOLEAN NOT NULL,
  PRIMARY KEY (combo_id),
  FOREIGN KEY (parent_option_id) REFERENCES modifier_options (option_id),
  FOREIGN KEY (dependent_option_id) REFERENCES modifier_options (option_id)
);

CREATE TABLE item_modifiers (
  combo_id INT NOT NULL AUTO_INCREMENT,
  item_id INT NULL,
  modifier_id INT NULL,
  display_order INT NOT NULL, 
  is_active BOOLEAN NOT NULL,
  is_available BOOLEAN NOT NULL,
  PRIMARY KEY (combo_id),
  FOREIGN KEY (item_id) REFERENCES menu_items (item_id),
  FOREIGN KEY (modifier_id) REFERENCES modifiers (modifier_id)
);

CREATE TABLE item_option_prices (
  combo_id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  option_id INT NOT NULL,
  price MEDIUMINT NOT NULL,
  is_active BOOLEAN NOT NULL,
  is_available BOOLEAN NOT NULL,
  PRIMARY KEY (combo_id),
  FOREIGN KEY (item_id) REFERENCES menu_items (item_id),
  FOREIGN KEY (option_id) REFERENCES modifier_options (option_id)
);

CREATE TABLE order_items (
  order_item_id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  item_price MEDIUMINT NOT NULL,
  PRIMARY KEY (order_item_id),
  FOREIGN KEY (order_id) REFERENCES orders (order_id),
  FOREIGN KEY (item_id) REFERENCES menu_items (item_id)
);

CREATE TABLE order_item_modifiers (
  order_item_modifier_id INT NOT NULL AUTO_INCREMENT,
  order_item_id INT NOT NULL,
  modifier_option_id INT NOT NULL,
  selection_option_id INT,
  PRIMARY KEY (order_item_modifier_id),
  FOREIGN KEY (order_item_id) REFERENCES order_items (order_item_id),
  FOREIGN KEY (modifier_option_id) REFERENCES modifier_options (option_id),
  FOREIGN KEY (selection_option_id) REFERENCES selection_options (selection_option_id)
);

INSERT INTO sections (name, display_order, is_active, is_available, display_text) VALUES 
  ("deals", 0, 1, 1, "Deals and Coupons"), 
  ("popular", 1, 1, 1, "Popular Items"), 
  ("specials", 2, 1, 1, "Specials"), 
  ("pizzas", 3, 1, 1, "Pizzas"), 
  ("pizza_by_the_slice", 4, 1, 1, "Pizza By The Slice"), 
  ("appetizers", 5, 1, 1, "Appetizers"), 
  ("soups", 6, 1, 1, "Soups"), 
  ("salads", 7, 1, 1, "Salads"), 
  ("sandwiches", 8, 1, 1, "Sandwiches"), 
  ("grinders", 9, 1, 1, "Grinders"), 
  ("grinders_grill", 10, 1, 1, "Grinders From The Grill"), 
  ("wraps", 11, 1, 1, "Wraps"), 
  ("calzones_strombolis", 12, 1, 1, "Calzones & Strombolis"), 
  ("pasta_dinners", 13, 1, 1, "Pasta Dinners"), 
  ("desserts", 14, 1, 1, "Desserts"), 
  ("drinks", 15, 1, 1, "Drinks");

INSERT INTO menu_items (name, description, image_link, base_price, display_order, is_active, is_available, display_text, display_price) VALUES 
  ("pizza_specialty_buffalo", "Our homemade buffalo chicken pizza. White pizza topped with buffalo chicken, our special blend of mozzarella cheese, and blue cheese as a sauce substitute.", "https://img.freepik.com/premium-photo/aesthetic-dripping-tasty-pizza-slice-generative-ai_863013-1954.jpg", NULL, 0, 1, 1, "Buffalo Chicken Pizza", 1699), 
  ("pizza_specialty_margherita", "Our homemade buffalo margherita pizza. White pizza topped with fresh tomatoes, fresh basil, and fresh garlic", "https://img.freepik.com/premium-photo/aesthetic-dripping-tasty-pizza-slice-generative-ai_863013-1954.jpg", NULL, 1, 1, 1, "Margherita Pizza", 1399);

INSERT INTO section_items (display_order, is_active, is_available, section_id, item_id) VALUES 
  (0, 1, 1, 2, 1), 
  (1, 1, 1, 2, 2);