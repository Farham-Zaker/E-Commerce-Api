import { Router } from "express";
import isLogged from "../middlewares/isLogged";
import cartValidator from "../validators/cart.validator";
import validationResults from "../validators/validationResults";
import cartController from "../controllers/cart.controller";
const router = Router();

router.post(
  "/add",
  isLogged,
  cartValidator.addToCartValidator(),
  validationResults,
  cartController.addToCarts
);
router.get("/get", isLogged, cartController.getAllCarts);
router.get("/get/:cartId", isLogged, cartController.getCartById);
router.put(
  "/update",
  isLogged,
  cartValidator.updateCartValidator(),
  validationResults,
  cartController.updateCarts
);
router.delete("/delete/:cartId", isLogged, cartController.deleteCartByIdreq);

export default router;
