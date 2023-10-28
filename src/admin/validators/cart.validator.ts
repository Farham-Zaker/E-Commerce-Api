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
  private isNumber(field: string, value: string): boolean {
    if (typeof value !== "number") {
      throw new Error(`'${field}' field must be a number.`);
    }
    return true;
  }
})();
