import { Router } from "express";
import orderValidator from "../validators/order.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  orderValidator.createOrder(),
  validationResults,
);

export default router;
