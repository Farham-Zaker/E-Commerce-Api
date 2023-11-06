import { Router } from "express";
import commentsController from "../controllers/comments.controller";
import commentsValidator from "../validators/comments.validator";
import validationResults from "../validators/validationResults";
import isLogged from "../middlewares/isLogged";
const router = Router();

router.post(
  "/add",
  commentsValidator.addCommentValidator(),
  validationResults,
  commentsController.addToComment
);
router.get("/get", isLogged, commentsController.getUserCommments);
router.get("/get/:productId", commentsController.getCommentByProductId);
router.put(
  "/update",
  isLogged,
  commentsValidator.updateCommentValidator(),
  validationResults,
  commentsController.updateComment
);
router.delete("/delete/:commentId", isLogged, commentsController.deleteComment);

export default router;
