import { Router } from "express";
import productValidator from "../validators/product.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  productValidator.createProduct(),
  validationResults,
);

export default router;
