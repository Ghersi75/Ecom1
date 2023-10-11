-- `00001.up.sql`
-- Created by ChatGPT based on the Prisma schema at github.com/Ghersi75/Ecom1/blob/main/backend/prisma/schema.prisma

-- Users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(191) UNIQUE NOT NULL,
    first_name VARCHAR(191),
    last_name VARCHAR(191),
    -- This'll need to change to a higher number for a link
    profile_picture VARCHAR(191),
    email VARCHAR(191) UNIQUE NOT NULL,
    phone_number VARCHAR(191),
    password_hash VARCHAR(191),
    provider VARCHAR(191) NOT NULL,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sections
CREATE TABLE sections (
    section_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    display_text VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT FALSE
);

-- Menu Items
CREATE TABLE menu_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    display_text VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    image_link VARCHAR(2048),
    base_price MEDIUMINT,
    display_price MEDIUMINT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE
);

-- Section Items
CREATE TABLE section_items (
    combo_id INT AUTO_INCREMENT PRIMARY KEY,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT FALSE,
    section_id INT,
    item_id INT,
    FOREIGN KEY (section_id) REFERENCES sections(section_id),
    FOREIGN KEY (item_id) REFERENCES menu_items(item_id)
);

-- Modifiers
CREATE TABLE modifiers (
    modifier_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) DEFAULT 'modifier',
    display_text VARCHAR(100) DEFAULT 'Modifier Section',
    description VARCHAR(255),
    is_required BOOLEAN DEFAULT FALSE,
    max_selection INT,
    modifier_type ENUM('RADIO', 'CHECKBOX'),
    default_option_id INT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT FALSE
);

-- Item Modifiers
CREATE TABLE item_modifiers (
    combo_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    modifier_id INT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (item_id) REFERENCES menu_items(item_id),
    FOREIGN KEY (modifier_id) REFERENCES modifiers(modifier_id)
);

-- Modifier Options
CREATE TABLE modifier_options (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    modifier_id INT,
    name VARCHAR(100) NOT NULL,
    display_text VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT FALSE,
    base_price MEDIUMINT,
    selection_option_id INT,
    FOREIGN KEY (modifier_id) REFERENCES modifiers(modifier_id)
    -- Note: ForeignKey to selection_options will be added later
);

-- Selection Options
CREATE TABLE selection_options (
    selection_option_id INT AUTO_INCREMENT PRIMARY KEY,
    option_name VARCHAR(100)
);

-- Now, adding the foreign key for modifier_options
ALTER TABLE modifier_options ADD FOREIGN KEY (selection_option_id) REFERENCES selection_options(selection_option_id);

-- Item Option Prices
CREATE TABLE item_option_prices (
    combo_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    option_id INT,
    price MEDIUMINT,
    is_active BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (item_id) REFERENCES menu_items(item_id),
    FOREIGN KEY (option_id) REFERENCES modifier_options(option_id)
);

-- Option Option Prices
CREATE TABLE option_option_prices (
    combo_id INT AUTO_INCREMENT PRIMARY KEY,
    parent_option_id INT,
    dependent_option_id INT,
    price MEDIUMINT,
    is_active BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (parent_option_id) REFERENCES modifier_options(option_id),
    FOREIGN KEY (dependent_option_id) REFERENCES modifier_options(option_id)
);

