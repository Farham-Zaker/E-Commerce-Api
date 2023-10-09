import { Router } from "express";
import isLogged from "../middlewares/isLogged";
import likesValidator from "../validators/likes.validator";
import validationResults from "../validators/validationResults";
import likesController from "../controllers/likes.controller";
const router = Router();

router.post(
  "/add",
  isLogged,
  likesValidator.addToLikesValidator(),
  validationResults,
  likesController.addToLikes
);
router.get("/get", isLogged);

export default router;
