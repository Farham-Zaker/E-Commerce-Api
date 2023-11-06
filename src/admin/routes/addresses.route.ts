import { Router } from "express";
import addressValidator from "../validators/addresses.validator";
import validationResults from "../../validators/validationResults";
import addressController from "../controllers/addresses.controller";
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
router.get("/get/:addressId", addressController.getAddressById);
router.put(
  "/update",
  addressValidator.updateAddress(),
  validationResults,
  addressController.updateAddress
);
router.delete("/delete/:addressId", addressController.deleteAddress);

export default router;
