import { check, ValidationChain } from "express-validator";

export default new (class V {
  addToCartValidator(): ValidationChain[] {
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
        .isNumeric()
        .withMessage("'quantity' field must be a number.")
        .custom((value) => {
          if (value < 1) {
            throw "Quantity should be greater than or equal to 1.";
          } else {
            return true;
          }
        }),
    ];
  }
  updateCartValidator(): ValidationChain[] {
    return [
      check("cartId")
        .notEmpty()
        .withMessage("'cartId' field must be a number."),
      check("colorId")
        .notEmpty()
        .withMessage("'colorId' field must be a number."),
      check("quantity")
        .notEmpty()
        .withMessage("'quantity' field can not be empty.")
        .isNumeric()
        .withMessage("'quantity' field must be a number.")
        .custom((value) => {
          if (value < 1) {
            throw "Quantity should be greater than or equal to 1.";
          } else {
            return true;
          }
        }),
    ];
  }
})();
