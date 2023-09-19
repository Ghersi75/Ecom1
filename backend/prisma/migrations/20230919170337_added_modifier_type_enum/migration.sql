/*
  Warnings:

  - Added the required column `modifier_type` to the `modifiers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `modifiers` ADD COLUMN `modifier_type` ENUM('RADIO', 'CHECKBOX') NOT NULL;
