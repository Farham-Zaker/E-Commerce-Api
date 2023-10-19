import { Router } from "express";
import inventoryValidator from "../validators/inventory.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  inventoryValidator.createInventory(),
  validationResults,
);

export default router;
