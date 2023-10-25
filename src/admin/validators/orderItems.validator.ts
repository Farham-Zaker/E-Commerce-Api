import { check, ValidationChain } from "express-validator";

export default new (class {
  createOrderItem(): ValidationChain[] {
    return [
      check("orderId")
        .notEmpty()
        .withMessage("'orderId' field can not be empty."),
      check("productId")
        .notEmpty()
        .withMessage("'productId' field can not be empty."),
      check("quantity")
        .notEmpty()
        .withMessage("'quantity' field can not be empty.")
        .custom((value) => {
          if (typeof value !== "number") {
            throw new Error("Provide a number for 'quantity' field.");
          }
          return true;
        }),
      check("colorId")
        .notEmpty()
        .withMessage("'colorId' field can not be empty."),
    ];
  }
  getOrderItems(): ValidationChain[] {
    return [
      check("color")
        .optional()
        .notEmpty()
        .withMessage("'color' field can not be empty.")
        .custom((value) => {
          return this.isTrueOrFalse("color", value);
        }),
      check("product")
        .optional()
        .notEmpty()
        .withMessage("'product' field can not be empty.")
        .custom((value) => {
          return this.isTrueOrFalse("product", value);
        }),
      check("order")
        .optional()
        .notEmpty()
        .withMessage("'order' field can not be empty.")
        .custom((value) => {
          return this.isTrueOrFalse("order", value);
        }),
    ];
  }
  private isTrueOrFalse(field: string, value: string): boolean {
    if (value == "true" || value == "false") {
      return true;
    }
    throw new Error(`'${field}' must be true or false.`);
  }
})();
