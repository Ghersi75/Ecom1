/*
  Warnings:

  - You are about to alter the column `price` on the `item_option_prices` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `MediumInt`.
  - You are about to alter the column `base_price` on the `menu_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `MediumInt`.
  - You are about to alter the column `base_price` on the `modifier_options` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `MediumInt`.
  - You are about to alter the column `price` on the `option_option_prices` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `MediumInt`.

*/
-- AlterTable
ALTER TABLE `item_option_prices` MODIFY `price` MEDIUMINT NOT NULL;

-- AlterTable
ALTER TABLE `menu_items` ADD COLUMN `display_price` MEDIUMINT NULL,
    MODIFY `base_price` MEDIUMINT NULL;

-- AlterTable
ALTER TABLE `modifier_options` MODIFY `base_price` MEDIUMINT NULL;

-- AlterTable
ALTER TABLE `option_option_prices` MODIFY `price` MEDIUMINT NOT NULL;
