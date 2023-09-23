import { Router } from "express";
const router = Router();

import authRoute from "../routes/auth.route";
router.use("/auth", authRoute);

import accountRoute from "./../routes/account.route"
router.use('/account', accountRoute)

export default router;
