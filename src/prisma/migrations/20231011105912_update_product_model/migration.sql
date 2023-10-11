/*
  Warnings:

  - You are about to drop the column `commentsCommentId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `discountedPrice` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_commentsCommentId_fkey`;

-- DropIndex
DROP INDEX `comments_replyId_fkey` ON `comments`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `commentsCommentId`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `discountedPrice`,
    ADD COLUMN `finalPrice` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `comments`(`commentId`) ON DELETE SET NULL ON UPDATE CASCADE;
