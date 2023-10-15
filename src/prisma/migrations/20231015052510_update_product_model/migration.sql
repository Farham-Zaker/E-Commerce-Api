/*
  Warnings:

  - Made the column `finalPrice` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `finalPrice` INTEGER NOT NULL;
