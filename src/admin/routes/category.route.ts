import { Router } from "express";
import validationResults from "../../validators/validationResults";
import categoryValidator from "../validators/category.validator";
const router = Router();

router.post(
  "/create",
  categoryValidator.createCategory(),
  validationResults,
);

export default router;
