/*
  Warnings:

  - You are about to drop the `SectionItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SectionItems` DROP FOREIGN KEY `SectionItems_section_id_fkey`;

-- DropForeignKey
ALTER TABLE `menu_items` DROP FOREIGN KEY `menu_items_section_id_fkey`;

-- DropTable
DROP TABLE `SectionItems`;

-- CreateTable
CREATE TABLE `section_items` (
    `combo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `is_available` BOOLEAN NOT NULL DEFAULT false,
    `section_id` INTEGER NOT NULL,

    PRIMARY KEY (`combo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menu_items` ADD CONSTRAINT `menu_items_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `section_items`(`combo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `section_items` ADD CONSTRAINT `section_items_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `sections`(`section_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
