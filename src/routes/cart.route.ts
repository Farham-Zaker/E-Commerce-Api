import { Router } from 'express';
import isLogged from '../middlewares/isLogged';
import cartValidator from "../validators/cart.validator";
import validationResults from "../validators/validationResults";
const router = Router();

router.post(
  "/add",
  isLogged,
  cartValidator.addToCartValidator(),
  validationResults
);

export default router;
