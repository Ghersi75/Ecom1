-- CreateTable
CREATE TABLE `SelectionOptions` (
    `selection_option_id` INTEGER NOT NULL AUTO_INCREMENT,
    `option_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`selection_option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `option_option_prices` (
    `combo_id` INTEGER NOT NULL,
    `parent_option_id` INTEGER NOT NULL,
    `dependent_option_id` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `is_available` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`combo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `modifier_options` ADD CONSTRAINT `modifier_options_selection_option_id_fkey` FOREIGN KEY (`selection_option_id`) REFERENCES `SelectionOptions`(`selection_option_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `option_option_prices` ADD CONSTRAINT `option_option_prices_parent_option_id_fkey` FOREIGN KEY (`parent_option_id`) REFERENCES `modifier_options`(`option_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `option_option_prices` ADD CONSTRAINT `option_option_prices_dependent_option_id_fkey` FOREIGN KEY (`dependent_option_id`) REFERENCES `modifier_options`(`option_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
