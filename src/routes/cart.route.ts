import { Router } from 'express';
import isLogged from '../middlewares/isLogged';
import cartValidator from "../validators/cart.validator";
import validationResults from "../validators/validationResults";
import cartController from '../controllers/cart.controller';
const router = Router();

router.post(
  "/add",
  isLogged,
  cartValidator.addToCartValidator(),
  validationResults,
  cartController.addToCarts
);
router.get("/get", isLogged, cartController.getAllCarts);

export default router;
