CREATE DATABASE PizzeriaTest;
USE PizzeriaTest;

-- 

CREATE TABLE `Users` (
  `user_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `profile_picture` varchar(255) DEFAULT null,
  `email` varchar(255) UNIQUE NOT NULL,
  `phone_number` varchar(25) NOT NULL,
  `password_hash` varchar(255) DEFAULT null,
  `provider` varchar(50) DEFAULT null,
  `registered_at` datetime DEFAULT null,
  `last_login` datetime DEFAULT null
);

CREATE TABLE `Addresses` (
  `address_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `state` varchar(20) NOT NULL,
  `city` varchar(50) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `zip_code` varchar(10) NOT NULL,
  `is_default` boolean NOT NULL DEFAULT false
);

CREATE TABLE `MenuItems` (
  `item_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `base_price` mediumint DEFAULT null,
  `description` varchar(500) DEFAULT null,
  `image_link` varchar(2048) DEFAULT null,
  `is_active` boolean NOT NULL DEFAULT false,
  `is_available` boolean NOT NULL DEFAULT false,
  `display_order` int NOT NULL DEFAULT 0,
  `is_featured` boolean NOT NULL DEFAULT false
);

CREATE TABLE `Modifiers` (
  `modifier_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `display_text` varchar(100) NOT NULL,
  `is_required` boolean NOT NULL DEFAULT false,
  `max_selection` int DEFAULT null,
  `modifier_type` enum NOT NULL,
  `default_option_id` int DEFAULT null,
  `display_order` int NOT NULL DEFAULT 0,
  `is_active` boolean NOT NULL DEFAULT false,
  `is_available` boolean NOT NULL DEFAULT false,
  `description` varchar(255) DEFAULT null
);

CREATE TABLE `ItemModifiers` (
  `combo_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `modifier_id` int NOT NULL,
  `display_order` int NOT NULL DEFAULT 0,
  `is_active` boolean NOT NULL DEFAULT false,
  `is_available` boolean NOT NULL DEFAULT false
);

CREATE TABLE `ModifierOptions` (
  `option_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `modifier_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `display_text` varchar(50) NOT NULL,
  `is_active` boolean NOT NULL DEFAULT false,
  `is_available` boolean NOT NULL DEFAULT false,
  `base_price` mediumint DEFAULT null,
  `selection_option_id` int DEFAULT null
);

CREATE TABLE `SelectionOptions` (
  `selection_option_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `option_name` varchar(50) NOT NULL
);

CREATE TABLE `ItemOptionPrices` (
  `combo_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `option_id` int NOT NULL,
  `price` mediumint NOT NULL,
  `is_active` boolean NOT NULL DEFAULT false,
  `is_available` boolean NOT NULL DEFAULT false
);

CREATE TABLE `OptionOptionPrices` (
  `combo_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `parent_option_id` int NOT NULL,
  `dependent_option_id` int NOT NULL,
  `price` mediumint NOT NULL,
  `is_active` boolean NOT NULL DEFAULT false,
  `is_available` boolean NOT NULL DEFAULT false
);

CREATE TABLE `Sections` (
  `section_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `display_order` int NOT NULL DEFAULT 0,
  `is_active` boolean NOT NULL DEFAULT false,
  `is_available` boolean NOT NULL DEFAULT false
);

CREATE TABLE `SectionItems` (
  `combo_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `section_id` int NOT NULL,
  `item_id` int NOT NULL,
  `display_order` int NOT NULL DEFAULT 0,
  `is_active` boolean NOT NULL DEFAULT false,
  `is_available` boolean NOT NULL DEFAULT false
);

CREATE TABLE `Orders` (
  `order_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_price` mediumint NOT NULL,
  `checkout_time` datetime NOT NULL,
  `delivery_method` enum NOT NULL,
  `instructions` varchar(500) DEFAULT null,
  `status` varchar(50) NOT NULL
);

CREATE TABLE `OrderItems` (
  `order_item_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `menu_item_id` int NOT NULL,
  `item_price` mediumint NOT NULL
);

CREATE TABLE `OrderItemModifiers` (
  `order_item_modifier_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_item_id` int NOT NULL,
  `modifier_option_id` int NOT NULL,
  `selection_option_id` int DEFAULT null
);

ALTER TABLE `Addresses` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `ModifierOptions` ADD FOREIGN KEY (`modifier_id`) REFERENCES `Modifiers` (`default_option_id`);

ALTER TABLE `ItemModifiers` ADD FOREIGN KEY (`item_id`) REFERENCES `MenuItems` (`item_id`);

ALTER TABLE `ItemModifiers` ADD FOREIGN KEY (`modifier_id`) REFERENCES `Modifiers` (`modifier_id`);

ALTER TABLE `ModifierOptions` ADD FOREIGN KEY (`modifier_id`) REFERENCES `Modifiers` (`modifier_id`);

ALTER TABLE `ModifierOptions` ADD FOREIGN KEY (`selection_option_id`) REFERENCES `SelectionOptions` (`selection_option_id`);

ALTER TABLE `ItemOptionPrices` ADD FOREIGN KEY (`item_id`) REFERENCES `MenuItems` (`item_id`);

ALTER TABLE `ItemOptionPrices` ADD FOREIGN KEY (`option_id`) REFERENCES `ModifierOptions` (`option_id`);

ALTER TABLE `OptionOptionPrices` ADD FOREIGN KEY (`parent_option_id`) REFERENCES `ModifierOptions` (`modifier_id`);

ALTER TABLE `OptionOptionPrices` ADD FOREIGN KEY (`dependent_option_id`) REFERENCES `ModifierOptions` (`modifier_id`);

ALTER TABLE `SectionItems` ADD FOREIGN KEY (`section_id`) REFERENCES `Sections` (`section_id`);

ALTER TABLE `SectionItems` ADD FOREIGN KEY (`item_id`) REFERENCES `MenuItems` (`item_id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `OrderItems` ADD FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`);

ALTER TABLE `OrderItems` ADD FOREIGN KEY (`menu_item_id`) REFERENCES `MenuItems` (`item_id`);

ALTER TABLE `OrderItemModifiers` ADD FOREIGN KEY (`order_item_id`) REFERENCES `OrderItems` (`order_item_id`);

ALTER TABLE `OrderItemModifiers` ADD FOREIGN KEY (`modifier_option_id`) REFERENCES `ModifierOptions` (`option_id`);

ALTER TABLE `OrderItemModifiers` ADD FOREIGN KEY (`selection_option_id`) REFERENCES `SelectionOptions` (`selection_option_id`);
