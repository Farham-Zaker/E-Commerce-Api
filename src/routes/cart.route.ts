import { Router } from "express";
import cartValidator from "../validators/cart.validator";
import validationResults from "../validators/validationResults";
import cartController from "../controllers/cart.controller";
const router = Router();

router.post(
  "/add",
  cartValidator.addToCartValidator(),
  validationResults,
  cartController.addToCarts
);
router.get("/get", cartController.getAllCarts);
router.get("/get/:cartId", cartController.getCartById);
router.put(
  "/update",
  cartValidator.updateCartValidator(),
  validationResults,
  cartController.updateCarts
);
router.delete("/delete/:cartId", cartController.deleteCartByIdreq);

export default router;
