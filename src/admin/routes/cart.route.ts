import { Router } from "express";
import cartController from "../controllers/cart.controller";
import cartValidator from "../validators/cart.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  cartValidator.createCart(),
  validationResults,
  cartController.createCart
);
router.get(
  "/get",
  cartValidator.getCart(),
  validationResults,
  cartController.getCarts
);
router.get("/get/:cartId", cartController.getCartById);
router.put(
  "/update",
  cartValidator.updateCart(),
  validationResults,
  cartController.updateCart
);
router.delete("/delete/:cartId", cartController.deleteCart);
router.delete(
  "/inventories/delete",
  cartValidator.deleteInventories(),
  validationResults,
);

export default router;
