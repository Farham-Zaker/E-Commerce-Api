import { Router } from "express";
const router = Router();
import authController from "../controllers/auth.controller";
import authValidator from "../validators/auth.validator";
import validationResults from "../validators/validationResults";
import passport = require("passport");

router.post(
  "/register",
  authValidator.registerValidator(),
  validationResults,
  authController.registerRoute
);
router.post(
  "/login",
  authValidator.loginValidator(),
  validationResults,
  authController.loginRoute
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google"),
  authController.googleCallbackRoute
);
export default router;
