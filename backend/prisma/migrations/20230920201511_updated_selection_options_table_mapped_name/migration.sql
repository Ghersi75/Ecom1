/*
  Warnings:

  - You are about to drop the `SelectionOptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `modifier_options` DROP FOREIGN KEY `modifier_options_selection_option_id_fkey`;

-- DropTable
DROP TABLE `SelectionOptions`;

-- CreateTable
CREATE TABLE `selection_options` (
    `selection_option_id` INTEGER NOT NULL AUTO_INCREMENT,
    `option_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`selection_option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `modifier_options` ADD CONSTRAINT `modifier_options_selection_option_id_fkey` FOREIGN KEY (`selection_option_id`) REFERENCES `selection_options`(`selection_option_id`) ON DELETE SET NULL ON UPDATE CASCADE;
