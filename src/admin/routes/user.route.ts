import { Router } from "express";
import userValidator from "../validators/user.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  userValidator.createOrder(),
  validationResults,
);


export default router;
