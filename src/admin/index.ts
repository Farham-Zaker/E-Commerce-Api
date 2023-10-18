import { Router } from "express";
const router = Router();
import isAdmin from "./middlewares/isAdmin";
import productRoute from "./routes/product.route";

router.use("/product", isAdmin, productRoute);

import categoryRoute from "./routes/category.route"
router.use("/category", isAdmin, categoryRoute);

import colorRoute from "./routes/color.route"
router.use("/color", isAdmin, colorRoute);

export default router;
