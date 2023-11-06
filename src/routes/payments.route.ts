import { Router } from "express";
import paymentController from "../controllers/payments.controller";
const router = Router();

router.post("/pay", paymentController.pay);
router.get("/payCallback", paymentController.payCallback);
router.get("/get", paymentController.getAllPeyments);

export default router;
