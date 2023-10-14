/*
  Warnings:

  - Made the column `discountStatus` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `status` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `discountStatus` SMALLINT NOT NULL DEFAULT 0;
