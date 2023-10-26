import { Router } from "express";
import paymentController from "../controllers/payment.controller";
import paymentValidator from "../validators/payment.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  paymentValidator.createPayment(),
  validationResults,
  paymentController.createPayment
);
router.get("/get", paymentController.getAllPaynent);
router.get("/get/:paymentId", paymentController.getPaymentById);
router.put(
  "/update",
  paymentValidator.updatePayment(),
  validationResults,
);

export default router;
