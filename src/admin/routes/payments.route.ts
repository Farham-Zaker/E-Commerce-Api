import { Router } from "express";
import paymentController from "../controllers/payments.controller";
import paymentValidator from "../validators/payments.validator";
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
  paymentController.updatePayment
);
router.delete("/delete/:paymentId", paymentController.deletePayment);

export default router;
