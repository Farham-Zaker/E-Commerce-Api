import { Router } from "express";
import isLogged from "../middlewares/isLogged";
import likesValidator from "../validators/likes.validator";
import validationResults from "../validators/validationResults";
const router = Router();

router.post(
  "/add",
  isLogged,
  likesValidator.addToLikesValidator(),
  validationResults,
  
);

export default router;
