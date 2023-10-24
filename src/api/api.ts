import { Router } from "express";
const router = Router();
import isLogged from "../middlewares/isLogged";

import authRoute from "../routes/auth.route";
router.use("/auth", isLogged, authRoute);

import accountRoute from "./../routes/account.route";
router.use("/account", isLogged, accountRoute);

import productRoute from "./../routes/product.route";
router.use("/products", productRoute);

import addressRoute from "./../routes/address.route";
router.use("/address", isLogged, addressRoute);

import cartRoute from "./../routes/cart.route";
router.use("/cart", isLogged, cartRoute);

import likesRoute from "../routes/likes.route";
router.use("/likes", isLogged, likesRoute);

import commentRoute from "../routes/comments.route";
router.use("/comments", isLogged, commentRoute);

import paymentRoute from "../routes/payment.route";
router.use("/payment", isLogged, paymentRoute);

import orderRoute from "./../routes/order.route";
router.use("/order", orderRoute);

import adminRoute from "./../admin/index";
router.use("/admin", adminRoute);

export default router;
