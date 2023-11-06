import { Router } from "express";
import productContoller from "../controllers/products.controller";
import productValidator from "../validators/products.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  productValidator.createProduct(),
  validationResults,
  productContoller.createProduct
);
router.put(
  "/update",
  productValidator.updateProduct(),
  validationResults,
  productContoller.updateProduct
);
router.post(
  "/upload-image",
  productValidator.uploadImage(),
  validationResults,
  productContoller.uploadImage
);
router.delete("/delete-image/:imageId", productContoller.deleteImage);
export default router;
