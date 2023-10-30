import { Router } from "express";
import addressValidator from "../validators/address.validator";
import validationResults from "../../validators/validationResults";
import addressController from "../controllers/address.controller";
const router = Router();

router.post(
  "/create",
  addressValidator.createAddress(),
  validationResults,
  addressController.createAddress
);
router.get(
  "/get",
  addressValidator.getAddresses(),
  validationResults,
  addressController.getAddresses
);
router.get("/get/:addressId",);

export default router;
