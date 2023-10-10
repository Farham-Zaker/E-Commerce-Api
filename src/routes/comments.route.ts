import { Router } from "express";
import isLogged from "../middlewares/isLogged";
import commentsValidator from "../validators/comments.validator";
import validationResults from "../validators/validationResults";
const router = Router();

router.post(
  "/add",
  isLogged,
  commentsValidator.addCommentValidator(),
  validationResults,
);

export default router;
