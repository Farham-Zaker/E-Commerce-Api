import { check, ValidationChain } from "express-validator";

export default new (class {
  createLike(): ValidationChain[] {
    return [
      check("userId")
        .notEmpty()
        .withMessage("'userId' field can not be empty."),
      check("productId")
        .notEmpty()
        .withMessage("'productId' field can not be empty."),
    ];
  }
})();
