import { Router } from "express";
const router = Router();

import productsRoute from "./routes/products.route";
router.use("/products", productsRoute);

import categoriesRoute from "./routes/categories.route";
router.use("/categories", categoriesRoute);

import colorsRoute from "./routes/colors.route";
router.use("/colors", colorsRoute);

import inventoriesRoute from "./routes/inventories.route";
router.use("/inventories", inventoriesRoute);

import ordersRoute from "./routes/orders.route";
router.use("/orders", ordersRoute);

import orderItemsRoute from "./routes/orderItems.route";
router.use("/orderItems", orderItemsRoute);

import paymentsRoute from "./routes/payments.route";
router.use("/payments", paymentsRoute);

import cartsRoute from "./routes/carts.route";
router.use("/carts", cartsRoute);

import usersRoute from "./routes/users.route";
router.use("/users", usersRoute);

import addressesRoute from "./routes/addresses.route";
router.use("/addresses", addressesRoute);

import commentsRoute from "./routes/comments.route";
router.use("/comments", commentsRoute);

import likesRoute from "./routes/likes.route";
router.use("/likes", likesRoute);

export default router;
