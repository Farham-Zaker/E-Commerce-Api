import { Router } from "express";
import likesValidator from "../validators/likes.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/add",
  likesValidator.createLike(),
  validationResults,
);
export default router;
