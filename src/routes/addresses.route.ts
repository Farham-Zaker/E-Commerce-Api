import { Router } from "express";
import isLogged from "../middlewares/isLogged";
import addressValidator from "../validators/addresses.validator";
import validationResults from "../validators/validationResults";
import addressController from "../controllers/addresses.controller";
const router = Router();

router.post(
  "/add",
  isLogged,
  addressValidator.addUserAddressValidator(),
  validationResults,
  addressController.addUserAddress
);
router.get(
  "/get",
  isLogged,
  addressValidator.getUserAddressesValidator(),
  validationResults,
  addressController.getUserAddresses
);
router.get("/get/:addressId", isLogged, addressController.getAddressById);
router.put(
  "/update",
  isLogged,
  addressValidator.updateUserAddressValidator(),
  validationResults,
  addressController.updateUserAddresses
);
router.delete(
  "/delete/:addressId",
  isLogged,
  addressController.deleteUserAddress
);

export default router;
