/*
  Warnings:

  - Made the column `provider` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `provider` VARCHAR(191) NOT NULL;
