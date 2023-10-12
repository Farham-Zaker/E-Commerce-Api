/*
  Warnings:

  - You are about to drop the column `dicountEndTime` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `dicountEndTime`,
    ADD COLUMN `discountEndTime` DATETIME(3) NULL;
