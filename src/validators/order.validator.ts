import { ValidationChain, check } from "express-validator";

export default new (class {
  cancelvalidator(): ValidationChain {
    return check("orderId")
      .notEmpty()
      .withMessage("'orderId' field can not be empty.");
  }
})();
