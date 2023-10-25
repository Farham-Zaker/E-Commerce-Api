import { Router } from "express";
import orderItemsValidator from "../validators/orderItems.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  orderItemsValidator.createOrderItem(),
  validationResults,

);

export default router;
