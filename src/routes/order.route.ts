import { Router } from "express";
import isLogged from "../middlewares/isLogged";
import orderValidator from "../validators/order.validator";
import validationResults from "../validators/validationResults";
const router = Router();

router.post(
  "/cancel",
  isLogged,
  orderValidator.cancelvalidator(),
  validationResults
);

export default router;
