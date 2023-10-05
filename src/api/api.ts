import { Router } from "express";
const router = Router();

import authRoute from "../routes/auth.route";
router.use("/auth", authRoute);

import accountRoute from "./../routes/account.route";
router.use("/account", accountRoute);

import productRoute from "./../routes/product.route";
router.use('/products', productRoute)

import addressRoute from "./../routes/address.route"
router.use('/address', addressRoute)

export default router;