/*
  Warnings:

  - You are about to alter the column `discountStatus` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Int` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `discountStatus` SMALLINT NULL DEFAULT 0;
