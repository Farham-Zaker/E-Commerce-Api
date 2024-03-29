import { Router } from "express";
import accountController from "../controllers/account.controller";
import accountValidator from "../validators/account.validator";
import validationResults from "../validators/validationResults";
const router = Router();

router.put(
  "/update-info",
  accountValidator.updateInfoValidator(),
  validationResults,
  accountController.updateInfoRoute
);
router.post("/upload-image", accountController.uploadImage);
router.put(
  "/set-password",
  accountValidator.setPasswordValidator(),
  validationResults,
  accountController.setPasswordRoute
);
router.put(
  "/change-password",
  accountValidator.changePasswordValidator(),
  validationResults,
  accountController.changePasswordRoute
);
router.get(
  "/info",
  accountValidator.getUserInfoValidator(),
  validationResults,
  accountController.getUserInfo
);

export default router;
