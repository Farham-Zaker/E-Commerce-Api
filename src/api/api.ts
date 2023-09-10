import { Router } from "express";
const router = Router();

import userRoutes from "../routes/auth.route"
router.use('/user', userRoutes)

export default router;
