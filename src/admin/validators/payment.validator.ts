import { check, ValidationChain } from "express-validator";

export default new (class {
  createPayment(): ValidationChain[] {
    return [
      check("authorityId")
        .notEmpty()
        .withMessage("'authorityId' field can not be empty.")
        .isString()
        .withMessage("'authorityId' field must be a string."),
      check("status")
        .notEmpty()
        .withMessage("'status' field can not be empty.")
        .isString()
        .withMessage("'status' field must be a string."),
      check("amount")
        .notEmpty()
        .withMessage("'amount' field can not be empty.")
        .custom((value) => {
          if (typeof value !== "number") {
            throw new Error("'amount' field must be a number.");
          }
          return true;
        }),
      check("orderId")
        .notEmpty()
        .withMessage("'orderId' field can not be empty."),
    ];
  }
})();
