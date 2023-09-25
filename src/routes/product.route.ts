import { Router } from "express";
const router = Router();
import productController from "../controllers/product.controller";

router.get("/", productController.getAllProduct);

export default router;