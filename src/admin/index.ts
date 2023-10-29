import { Router } from "express";
const router = Router();
import isAdmin from "../middlewares/isAdmin";
import productRoute from "./routes/product.route";

router.use("/product", isAdmin, productRoute);

import categoryRoute from "./routes/category.route";
router.use("/category", isAdmin, categoryRoute);

import colorRoute from "./routes/color.route";
router.use("/color", isAdmin, colorRoute);

import inventoryRoute from "./routes/inventory.route";
router.use("/inventory", isAdmin, inventoryRoute);

import orderRoute from "./routes/order.route";
router.use("/order", isAdmin, orderRoute);

import orderItemsRoute from "./routes/orderItems.route";
router.use("/orderItems", isAdmin, orderItemsRoute);

import paymentRoute from "./routes/payment.route";
router.use("/payment", isAdmin, paymentRoute);

import cartRoute from "./routes/cart.route";
router.use("/cart", isAdmin, cartRoute);

import userRoute from "./routes/user.route";
router.use("/user", isAdmin, userRoute);

export default router;
