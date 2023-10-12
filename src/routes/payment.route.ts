import { Router } from "express";
import isLogged from "../middlewares/isLogged";
const router = Router();

router.post("/pay", isLogged);

export default router;
