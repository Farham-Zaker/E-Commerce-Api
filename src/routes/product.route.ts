import { Router } from "express";
const router = Router();
import productController from "../controllers/product.controller";

router.get("/", productController.getAllProduct);
router.get('/:productId', productController.getProductByIdRoute)

export default router;