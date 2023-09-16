-- CreateTable
CREATE TABLE `users` (
    `userId` VARCHAR(55) NOT NULL,
    `firstName` VARCHAR(55) NOT NULL,
    `lastName` VARCHAR(85) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(195) NOT NULL,
    `image` VARCHAR(1500) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_likes` (
    `id` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `productId` VARCHAR(55) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_carts` (
    `id` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `productId` VARCHAR(55) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `commentId` VARCHAR(55) NOT NULL,
    `comment` TEXT NOT NULL,
    `role` VARCHAR(6) NOT NULL,
    `replyId` VARCHAR(55) NULL,
    `userId` VARCHAR(55) NOT NULL,
    `productId` VARCHAR(55) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `productId` VARCHAR(55) NOT NULL,
    `title` VARCHAR(155) NOT NULL,
    `price` INTEGER NOT NULL,
    `image` VARCHAR(355) NOT NULL,
    `discountStatus` CHAR(1) NOT NULL,
    `discountPercent` SMALLINT NULL,
    `DicountEndTime` DATETIME(3) NULL,
    `prisceAfterDiscount` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categoryId` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `categoryId` VARCHAR(55) NOT NULL,
    `name` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventories` (
    `inventoryId` VARCHAR(55) NOT NULL,
    `quantity` SMALLINT NOT NULL,
    `productId` VARCHAR(55) NOT NULL,
    `colorId` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`inventoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colors` (
    `colorId` VARCHAR(55) NOT NULL,
    `name` VARCHAR(35) NOT NULL,
    `hexCode` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`colorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth` (
    `authId` VARCHAR(55) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isAdmin` TINYINT NOT NULL DEFAULT 0,
    `userId` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `auth_userId_key`(`userId`),
    PRIMARY KEY (`authId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addreesses` (
    `addressId` VARCHAR(55) NOT NULL,
    `country` VARCHAR(155) NOT NULL,
    `state` VARCHAR(155) NOT NULL,
    `city` VARCHAR(155) NOT NULL,
    `zone` VARCHAR(155) NOT NULL,
    `houseIlate` SMALLINT NOT NULL,
    `apartmentInite` SMALLINT NOT NULL,
    `postalIard` VARCHAR(20) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `orderId` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `totalPrice` INTEGER NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `orderItemId` VARCHAR(55) NOT NULL,
    `orderId` VARCHAR(55) NOT NULL,
    `productId` VARCHAR(55) NOT NULL,
    `quantity` SMALLINT NOT NULL,
    `colorId` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`orderItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `paymentId` VARCHAR(55) NOT NULL,
    `authorityId` VARCHAR(55) NOT NULL,
    `amount` INTEGER NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `orderId` VARCHAR(55) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payments_orderId_key`(`orderId`),
    PRIMARY KEY (`paymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_likes` ADD CONSTRAINT `user_likes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_likes` ADD CONSTRAINT `user_likes_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_carts` ADD CONSTRAINT `user_carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_carts` ADD CONSTRAINT `user_carts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `comments`(`commentId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventories` ADD CONSTRAINT `inventories_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventories` ADD CONSTRAINT `inventories_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `colors`(`colorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth` ADD CONSTRAINT `auth_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addreesses` ADD CONSTRAINT `addreesses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `colors`(`colorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;
