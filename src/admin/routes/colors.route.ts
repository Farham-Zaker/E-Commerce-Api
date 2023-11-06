import { Router } from "express";
import validationResults from "../../validators/validationResults";
import colorController from "../controllers/colors.controller";
import colorValidator from "../validators/colors.validator";
const router = Router();

router.post(
  "/create",
  colorValidator.createColor(),
  validationResults,
  colorController.createColor
);
router.get("/get", colorController.getAllColors);
router.get("/get/:colorId", colorController.getColorById);
router.put(
  "/update",
  colorValidator.updateColor(),
  validationResults,
  colorController.updateColor
);
router.delete("/delete/:colorId", colorController.deleteColor);

export default router;
