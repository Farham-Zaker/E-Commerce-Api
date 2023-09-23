import { Router } from "express";
import accountController from "../controllers/account.controller";
const router = Router();

router.put("/update-info", accountController.updateInfoRoute);

export default router;
