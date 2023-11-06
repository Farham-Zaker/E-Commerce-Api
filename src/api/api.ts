import { Router } from "express";
const router = Router();
import isLogged from "../middlewares/isLogged";
import isAdmin from "../middlewares/isAdmin";

import authRoute from "../routes/auth.route";
router.use("/auth", authRoute);

import accountRoute from "./../routes/account.route";
router.use("/account", isLogged, accountRoute);

import productRoute from "../routes/products.route";
router.use("/products", productRoute);

import addressesRoute from "../routes/addresses.route";
router.use("/addresses", isLogged, addressesRoute);

import cartRoute from "./../routes/cart.route";
router.use("/cart", isLogged, cartRoute);

import likesRoute from "../routes/likes.route";
router.use("/likes", isLogged, likesRoute);

import commentsRoute from "../routes/comments.route";
router.use("/comments", commentsRoute);

import paymentsRoute from "../routes/payments.route";
router.use("/payments", isLogged, paymentsRoute);

import ordersRoute from "../routes/orders.route";
router.use("/orders", isLogged, ordersRoute);

import adminRoute from "./../admin/index";
router.use("/admin",isAdmin, adminRoute);

export default router;
