import { Router } from "express";
import isLogged from "../middlewares/isLogged";
const router = Router();

router.post("/cancel", isLogged);

export default router;
