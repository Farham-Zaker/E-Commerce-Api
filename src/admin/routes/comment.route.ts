import { Router } from "express";
import commentValidator from "../validators/comment.validator";
import validationResults from "../../validators/validationResults";
import commentController from "../controllers/comment.controller";
const router = Router();

router.post(
  "/create",
  commentValidator.createComment(),
  validationResults,
  commentController.createComment
);
router.get(
  "/get",
  commentValidator.getValidator(),
  validationResults,
  commentController.getComments
);
router.get(
  "/get/:commentId",
  commentValidator.getCommentById(),
  validationResults,
  commentController.getCommentById
);
router.put(
  "/update",
  commentValidator.updateComment(),
  validationResults,
  commentController.updateComments
);
router.delete("/delete/:commentId");

export default router;
