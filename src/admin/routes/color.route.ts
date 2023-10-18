import { Router } from "express";
import validationResults from "../../validators/validationResults";
import colorController from "../controllers/color.controller";
import colorValidator from "../validators/color.validator";
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

export default router;
