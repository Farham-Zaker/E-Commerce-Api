import { Router } from "express";
const router = Router();
import authController from "../controllers/auth.controller";
import passport = require("passport");

router.post("/register", authController.registerRoute);
router.post("/login", authController.loginRoute);

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
