import { Router } from "express";
import likesValidator from "../validators/likes.validator";
import validationResults from "../validators/validationResults";
import likesController from "../controllers/likes.controller";
const router = Router();

router.post(
  "/add",
  likesValidator.addToLikesValidator(),
  validationResults,
  likesController.addToLikes
);
router.get("/get", likesController.getAllLikes);
router.delete("/delete/:productId", likesController.deleteFromCarts);

export default router;
