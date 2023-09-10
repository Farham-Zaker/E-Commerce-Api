import { Router } from "express";
const router = Router();

import userRoutes from "../routes/auth.route"
router.use('/auth', userRoutes)

export default router;
