import { Router } from "express";
import inventoryController from "../controllers/inventory.controller";
import inventoryValidator from "../validators/inventory.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  inventoryValidator.createInventory(),
  validationResults,
  inventoryController.createInventory
);
router.get("/get", inventoryController.getInventory);
router.put(
  "/update",
  inventoryValidator.updateInventory(),
  validationResults,
  inventoryController.updateInventory
);

export default router;
