/*
  Warnings:

  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `likes` table. All the data in the column will be lost.
  - The required column `likeId` was added to the `likes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `likes` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `likeId` VARCHAR(55) NOT NULL,
    ADD PRIMARY KEY (`likeId`);
