import { check, ValidationChain } from "express-validator";

export default new (class {
  createCategory(): ValidationChain {
    return check("name")
      .notEmpty()
      .withMessage("'name' field can not be empty.");
  }
})();
