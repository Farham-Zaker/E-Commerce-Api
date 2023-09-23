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
router.put('/set-password', accountController.setPasswordRoute)

export default router;
