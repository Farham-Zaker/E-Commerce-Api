import { Router } from "express";
import paymentValidator from "../validators/payment.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  paymentValidator.createPayment(),
  validationResults,
);


export default router;
