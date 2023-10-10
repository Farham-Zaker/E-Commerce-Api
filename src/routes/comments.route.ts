import { Router } from "express";
import isLogged from "../middlewares/isLogged";
import commentsController from "../controllers/comments.controller";
import commentsValidator from "../validators/comments.validator";
import validationResults from "../validators/validationResults";
const router = Router();

router.post(
  "/add",
  isLogged,
  commentsValidator.addCommentValidator(),
  validationResults,
  commentsController.addToComment
);

export default router;
