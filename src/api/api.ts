import { Router } from "express";
const router = Router();

import userRoutes from "./../routes/user.route"
router.use('/user', userRoutes)

export default router;
