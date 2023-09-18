/*
  Warnings:

  - You are about to drop the column `section_id` on the `menu_items` table. All the data in the column will be lost.
  - Added the required column `item_id` to the `section_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `menu_items` DROP FOREIGN KEY `menu_items_section_id_fkey`;

-- AlterTable
ALTER TABLE `menu_items` DROP COLUMN `section_id`;

-- AlterTable
ALTER TABLE `section_items` ADD COLUMN `item_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `section_items` ADD CONSTRAINT `section_items_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `menu_items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
