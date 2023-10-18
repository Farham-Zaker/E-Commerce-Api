import { Router } from "express";
import validationResults from "../../validators/validationResults";
import categoryValidator from "../validators/category.validator";
import categoryController from "../controllers/category.controller";
const router = Router();

router.post(
  "/create",
  categoryValidator.createCategory(),
  validationResults,
  categoryController.createProduct
);
router.get("/get");

export default router;
