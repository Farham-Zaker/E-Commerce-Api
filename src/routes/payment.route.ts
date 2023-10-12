import { Router } from "express";
import isLogged from "../middlewares/isLogged";
import paymentController from "../controllers/payment.controller";
const router = Router();

router.post("/pay", isLogged, paymentController.pay);
router.get("/payCallback");

export default router;
