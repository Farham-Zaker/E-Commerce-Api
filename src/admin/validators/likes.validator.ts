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
  getLike(): ValidationChain[] {
    return [
      check("user")
        .optional()
        .notEmpty()
        .withMessage("'userId' field can not be empty.")
        .custom((value) => {
          return this.isBoolean("user", value);
        }),
      check("product")
        .optional()
        .notEmpty()
        .withMessage("'productId' field can not be empty.")
        .custom((value) => {
          return this.isBoolean("product", value);
        }),
    ];
  }
  private isBoolean(filed: string, value: string): boolean {
    if (value !== "true" && value !== "false") {
      throw new Error(`'${filed}' field must be 'true' or 'false'.`);
    }
    return true;
  }
})();
