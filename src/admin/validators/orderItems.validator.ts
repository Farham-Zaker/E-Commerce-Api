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
})();
