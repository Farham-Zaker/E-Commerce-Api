import { Router } from "express";
import productContoller from "../controllers/product.contoller";
import productValidator from "../validators/product.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  productValidator.createProduct(),
  validationResults,
  productContoller.createProduct
);

export default router;
