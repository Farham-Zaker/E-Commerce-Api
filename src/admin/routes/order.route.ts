import { Router } from "express";
import orderController from "../controllers/order.controller";
import orderValidator from "../validators/order.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  orderValidator.createOrder(),
  validationResults,
  orderController.createOrder
);
router.get(
  "/get",
  orderValidator.getOrders(),
  validationResults,
  orderController.getOrders
);
router.get("/get/:orderId", orderController.getOrderById);
router.put(
  "/update",
);

export default router;
