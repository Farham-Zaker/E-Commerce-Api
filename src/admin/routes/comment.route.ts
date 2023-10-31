import { Router } from "express";
import commentValidator from "../validators/comment.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  commentValidator.createComment(),
  validationResults,
);

export default router;
