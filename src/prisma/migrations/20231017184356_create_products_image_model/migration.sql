/*
  Warnings:

  - You are about to drop the column `image` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `image`;

-- CreateTable
CREATE TABLE `product_images` (
    `imageId` VARCHAR(55) NOT NULL,
    `imageUrl` VARCHAR(355) NOT NULL,
    `productId` VARCHAR(55) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
