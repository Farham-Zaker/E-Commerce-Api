import { Router } from "express";
import cartController from "../controllers/carts.controller";
import cartValidator from "../validators/carts.validator";
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
  cartController.deleteCartInventories
);

export default router;
