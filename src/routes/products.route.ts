import { Router } from "express";
const router = Router();
import productController from "../controllers/products.controller";
import productValidator from "../validators/products.validator";
import validationResults from "../validators/validationResults";

router.get("/", productController.getAllProduct);
router.get("/:productId", productController.getProductByIdRoute);
router.get(
  "/getByFilter",
  productValidator.filterProductValidator(),
  validationResults,
  productController.getByFilterRoute
);
router.get(
  "/search",
  productValidator.searchProductValidator(),
  validationResults,
  productController.searchProductRoute
);

export default router;
