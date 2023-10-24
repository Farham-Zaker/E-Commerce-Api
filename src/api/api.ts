import { Router } from "express";
const router = Router();

import authRoute from "../routes/auth.route";
router.use("/auth", authRoute);

import accountRoute from "./../routes/account.route";
router.use("/account", isLogged, accountRoute);

import productRoute from "./../routes/product.route";
router.use("/products", productRoute);

import addressRoute from "./../routes/address.route";
router.use("/address", isLogged, addressRoute);

import cartRoute from "./../routes/cart.route";
router.use("/cart", cartRoute);

import likesRoute from "../routes/likes.route";
router.use("/likes", likesRoute);

import commentRoute from "../routes/comments.route";
router.use("/comments", commentRoute);

import paymentRoute from "../routes/payment.route";
router.use("/payment", paymentRoute);

import orderRoute from "./../routes/order.route";
router.use("/order", orderRoute);

import adminRoute from "./../admin/index";
import isLogged from "../middlewares/isLogged";
router.use("/admin", adminRoute);

export default router;
