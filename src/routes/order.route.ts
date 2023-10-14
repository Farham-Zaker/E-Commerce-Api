import { Router } from "express";
import orderController from "../controllers/order.controller";
import isLogged from "../middlewares/isLogged";
import orderValidator from "../validators/order.validator";
import validationResults from "../validators/validationResults";
const router = Router();

router.post(
  "/cancel",
  isLogged,
  orderValidator.cancelvalidator(),
  validationResults,
  orderController.cancelOrder
);
router.get("/get", isLogged, orderController.getAllOrders);

export default router;
