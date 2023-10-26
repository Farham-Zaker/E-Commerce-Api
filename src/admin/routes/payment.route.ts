import { Router } from "express";
import paymentValidator from "../validators/payment.validator";
import validationResults from "../../validators/validationResults";
import paymentController from "../controllers/payment.controller";
const router = Router();

router.post(
  "/create",
  paymentValidator.createPayment(),
  validationResults,
  paymentController.createPayment
);


export default router;
