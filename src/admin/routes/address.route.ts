import { Router } from "express";
import addressValidator from "../validators/address.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  addressValidator.createAddress(),
  validationResults,
);

export default router;
