import { Router } from "express";
const router = Router();
import isAdmin from "./middlewares/isAdmin";
import productRoute from "./routes/product.route";

router.use("/product", isAdmin, productRoute);

export default router;
