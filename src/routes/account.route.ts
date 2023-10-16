import { Router } from "express";
import accountController from "../controllers/account.controller";
import accountValidator from "../validators/account.validator";
import validationResults from "../validators/validationResults";
import isLogged from "../middlewares/isLogged";
const router = Router();

router.put(
  "/update-info",
  isLogged,
  accountValidator.updateInfoValidator(),
  validationResults,
  accountController.updateInfoRoute
);
router.post("/upload-image", isLogged, accountController.uploadImage);
router.put(
  "/set-password",
  isLogged,
  accountValidator.setPasswordValidator(),
  validationResults,
  accountController.setPasswordRoute
);
router.put(
  "/change-password",
  isLogged,
  accountValidator.changePasswordValidator(),
  validationResults,
  accountController.changePasswordRoute
);
router.get(
  "/info",
  isLogged,
  accountValidator.getUserInfoValidator(),
  validationResults,
  accountController.getUserInfo
);

export default router;
