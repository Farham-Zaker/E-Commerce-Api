import { Router } from "express";
import validationResults from "../../validators/validationResults";
import colorValidator from "../validators/color.validator";
const router = Router();

router.post(
  "/create",
  colorValidator.createColor(),
  validationResults,
);


export default router;
