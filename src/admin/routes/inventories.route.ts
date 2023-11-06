import { Router } from "express";
import inventoryController from "../controllers/inventories.controller";
import inventoryValidator from "../validators/inventories.validator";
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
router.delete("/delete/:inventoryId", inventoryController.deleteInventory);

export default router;
