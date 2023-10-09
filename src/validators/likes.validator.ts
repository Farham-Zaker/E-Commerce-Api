import { ValidationChain, check } from "express-validator";

export default new (class {
  addToLikesValidator(): ValidationChain {
    return check("productId")
      .notEmpty()
      .withMessage("'productId' can not be empty.");
  }
})();
