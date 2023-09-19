-- CreateTable
CREATE TABLE `modifiers` (
    `modifier_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL DEFAULT 'modifier',
    `display_test` VARCHAR(100) NOT NULL DEFAULT 'Modifier Section',
    `description` VARCHAR(255) NULL,
    `is_required` BOOLEAN NOT NULL DEFAULT false,
    `max_selection` INTEGER NULL,
    `default_option_id` INTEGER NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `is_available` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`modifier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_modifiers` (
    `combo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `modifier_id` INTEGER NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `is_available` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`combo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modifier_options` (
    `option_id` INTEGER NOT NULL AUTO_INCREMENT,
    `modifier_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `displa_test` VARCHAR(100) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `is_available` BOOLEAN NOT NULL DEFAULT false,
    `base_price` DECIMAL(10, 2) NOT NULL,
    `selection_option_id` INTEGER NULL,

    PRIMARY KEY (`option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_option_prices` (
    `combo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `option_id` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `is_available` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`combo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `item_modifiers` ADD CONSTRAINT `item_modifiers_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `menu_items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_modifiers` ADD CONSTRAINT `item_modifiers_modifier_id_fkey` FOREIGN KEY (`modifier_id`) REFERENCES `modifiers`(`modifier_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `modifier_options` ADD CONSTRAINT `modifier_options_modifier_id_fkey` FOREIGN KEY (`modifier_id`) REFERENCES `modifiers`(`modifier_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_option_prices` ADD CONSTRAINT `item_option_prices_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `menu_items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_option_prices` ADD CONSTRAINT `item_option_prices_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `modifier_options`(`option_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
