import { Router } from "express";
const router = Router();
import isAdmin from "../middlewares/isAdmin";

import productsRoute from "./routes/products.route";
router.use("/products", isAdmin, productsRoute);

import categoryRoute from "./routes/categories.route";
router.use("/categories", isAdmin, categoryRoute);

import colorRoute from "./routes/colors.route";
router.use("/colors", isAdmin, colorRoute);

import inventoriesRoute from "./routes/inventories.route";
router.use("/inventories", isAdmin, inventoriesRoute);

import ordersRoute from "./routes/orders.route";
router.use("/orders", isAdmin, ordersRoute);

import orderItemsRoute from "./routes/orderItems.route";
router.use("/orderItems", isAdmin, orderItemsRoute);

import paymentsRoute from "./routes/payments.route";
router.use("/payments", isAdmin, paymentsRoute);

import cartRoute from "./routes/carts.route";
router.use("/carts", isAdmin, cartRoute);

import usersRoute from "./routes/users.route";
router.use("/users", isAdmin, usersRoute);

import addressRoute from "./routes/addresses.route";
router.use("/addresses", isAdmin, addressRoute);

import commentsRoute from "./routes/comments.route";
router.use("/comments", isAdmin, commentsRoute);

import likeRoute from "./routes/likes.route";
router.use("/likes", isAdmin, likeRoute);

export default router;
