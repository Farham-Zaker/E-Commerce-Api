import { Router } from "express";
import accountController from "../controllers/account.controller";
const router = Router();

router.put("/update-info", accountController.updateInfoRoute);
router.put('/set-password', accountController.setPasswordRoute)

export default router;
