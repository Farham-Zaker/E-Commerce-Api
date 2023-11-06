import { Router } from "express";
import commentsController from "../controllers/comments.controller";
import commentsValidator from "../validators/comments.validator";
import validationResults from "../validators/validationResults";
const router = Router();

router.post(
  "/add",
  commentsValidator.addCommentValidator(),
  validationResults,
  commentsController.addToComment
);
router.get("/get");
router.get("/get/:productId", commentsController.getCommentByProductId);
router.put(
  "/update",
  commentsValidator.updateCommentValidator(),
  validationResults,
  commentsController.updateComment
);
router.delete("/delete/:commentId", commentsController.deleteComment);

export default router;
