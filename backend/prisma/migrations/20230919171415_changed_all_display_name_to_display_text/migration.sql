/*
  Warnings:

  - You are about to drop the column `display_name` on the `menu_items` table. All the data in the column will be lost.
  - You are about to drop the column `displa_test` on the `modifier_options` table. All the data in the column will be lost.
  - You are about to drop the column `display_name` on the `modifiers` table. All the data in the column will be lost.
  - You are about to drop the column `display_name` on the `sections` table. All the data in the column will be lost.
  - Added the required column `display_text` to the `menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_text` to the `modifier_options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_text` to the `sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu_items` DROP COLUMN `display_name`,
    ADD COLUMN `display_text` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `modifier_options` DROP COLUMN `displa_test`,
    ADD COLUMN `display_text` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `modifiers` DROP COLUMN `display_name`,
    ADD COLUMN `display_text` VARCHAR(100) NOT NULL DEFAULT 'Modifier Section';

-- AlterTable
ALTER TABLE `sections` DROP COLUMN `display_name`,
    ADD COLUMN `display_text` VARCHAR(100) NOT NULL;
