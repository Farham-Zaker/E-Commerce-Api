import { Router } from "express";
import likesValidator from "../validators/likes.validator";
import validationResults from "../../validators/validationResults";
import likesController from "../controllers/likes.controller";
const router = Router();

router.post(
  "/add",
  likesValidator.createLike(),
  validationResults,
  likesController.addToLikes
);
router.get(
  "/get",
  likesValidator.getLike(),
  validationResults,
  likesController.getAllLikes
);
router.get(
  "/get/:likeId",
  likesValidator.getLike(),
  validationResults,
  likesController.getLikeById
);

export default router;
