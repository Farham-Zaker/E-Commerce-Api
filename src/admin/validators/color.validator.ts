import { check, ValidationChain } from "express-validator";

export default new (class {
  createColor(): ValidationChain[] {
    return [
      check("name")
        .notEmpty()
        .withMessage("'name' field can not be empty.")
        .isString()
        .withMessage("'name' field must be a string."),
      check("hexCode")
        .notEmpty()
        .withMessage("'hexCode' field can not be empty.")
        .isString()
        .withMessage("'hexCode' field must be a string.")
        .custom((value) => {
          if (value[0] !== "#") {
            throw new Error("The first character of 'hexCode' must be '#'.");
          }
          return true;
        }),
    ];
  }
})();
