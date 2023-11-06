import { Router } from "express";
import orderController from "../controllers/orders.controller";
import orderValidator from "../validators/orders.validator";
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
  orderValidator.updateOrderValidator(),
  validationResults,
  orderController.updateOrder
);
router.delete("/delete/:orderId", orderController.deleteOrder);

export default router;
