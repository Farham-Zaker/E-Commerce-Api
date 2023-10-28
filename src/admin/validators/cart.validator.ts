import { check, ValidationChain } from "express-validator";

export default new (class {
  createCart(): ValidationChain[] {
    return [
      check("userId")
        .notEmpty()
        .withMessage("'userId' field can not be empty."),
      check("productId")
        .notEmpty()
        .withMessage("'productId' field can not be empty."),
      check("colorId")
        .notEmpty()
        .withMessage("'colorId' field can not be empty."),
      check("quantity")
        .notEmpty()
        .withMessage("'quantity' field can not be empty.")
        .custom((value) => {
          return this.isNumber("filed", value);
        }),
    ];
  }
  getCart(): ValidationChain[] {
    return [
      check("userId")
        .optional()
        .notEmpty()
        .withMessage("'userId' field can not be empty."),
      check("productId")
        .optional()
        .notEmpty()
        .withMessage("'productId' field can not be empty."),
      check("take")
        .optional()
        .notEmpty()
        .withMessage("'take' field can not be empty.")
        .isNumeric()
        .withMessage("'take' field must be a number."),
      check("user")
        .optional()
        .notEmpty()
        .withMessage("'user' field can not be empty.")
        .custom((value) => {
          return this.isBoolean("user", value);
        }),
      check("cartInventories")
        .optional()
        .notEmpty()
        .withMessage("'cartInventories' field can not be empty.")
        .custom((value) => {
          return this.isBoolean("cartInventories", value);
        }),
      check("skip")
        .optional()
        .notEmpty()
        .withMessage("'skip' field can not be empty.")
        .isNumeric()
        .withMessage("'skip' field must be a number."),
    ];
  }
  private isBoolean(field: string, value: string): boolean {
    if (value === "true" || value === "false") {
      return true;
    }
    throw new Error(`'${field}' must be 'true' or 'false'.`);
  }
  private isNumber(field: string, value: string): boolean {
    if (typeof value !== "number") {
      throw new Error(`'${field}' field must be a number.`);
    }
    return true;
  }
})();
