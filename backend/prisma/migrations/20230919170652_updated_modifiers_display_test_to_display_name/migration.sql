/*
  Warnings:

  - You are about to drop the column `display_test` on the `modifiers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `modifiers` DROP COLUMN `display_test`,
    ADD COLUMN `display_name` VARCHAR(100) NOT NULL DEFAULT 'Modifier Section';
