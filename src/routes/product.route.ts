import { Router } from "express";
const router = Router();
import productController from "../controllers/product.controller";
import productValidator from "../validators/product.validator";
import validationResults from "../validators/validationResults";

router.get("/", productController.getAllProduct);
router.get("/getById/:productId", productController.getProductByIdRoute);
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
