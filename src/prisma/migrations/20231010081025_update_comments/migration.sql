-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_replyId_fkey`;

-- AlterTable
ALTER TABLE `comments` ADD COLUMN `commentsCommentId` VARCHAR(55) NULL,
    MODIFY `role` VARCHAR(7) NOT NULL;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_commentsCommentId_fkey` FOREIGN KEY (`commentsCommentId`) REFERENCES `comments`(`commentId`) ON DELETE SET NULL ON UPDATE CASCADE;
