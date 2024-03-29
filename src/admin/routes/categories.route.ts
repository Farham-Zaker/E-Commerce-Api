import { Router } from "express";
import validationResults from "../../validators/validationResults";
import categoryValidator from "../validators/categories.validator";
import categoryController from "../controllers/categories.controller";
const router = Router();

router.post(
  "/create",
  categoryValidator.createCategory(),
  validationResults,
  categoryController.createProduct
);
router.get("/get", categoryController.getAllCategories);
router.delete("/delete/:categoryId", categoryController.deleteCategory);

export default router;
