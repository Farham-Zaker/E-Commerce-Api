import { check, ValidationChain } from "express-validator";

export default new (class {
  createInventory(): ValidationChain[] {
    return [
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
          if (typeof value !== "number") {
            throw new Error("'quantity' field must be a number.");
          }
          return true;
        }),
    ];
  }
})();
