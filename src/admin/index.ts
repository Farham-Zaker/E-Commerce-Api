import { Router } from "express";
const router = Router();
import isAdmin from "./middlewares/isAdmin";
import productRoute from "./routes/product.route";

router.use("/product", isAdmin, productRoute);

import categoryRoute from "./routes/category.route"
router.use("/category", isAdmin, categoryRoute);

import colorRoute from "./routes/color.route"
router.use("/color", isAdmin, colorRoute);

import inventoryRoute from "./routes/inventory.route";
router.use("/inventory", inventoryRoute);

import orderRoute from "./routes/order.route";
router.use("/order", orderRoute);

export default router;
