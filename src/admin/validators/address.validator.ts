import { check, ValidationChain } from "express-validator";

export default new (class {
  createAddress(): ValidationChain[] {
    return [
      check("country")
        .notEmpty()
        .withMessage("'country' field can not be empty.")
        .isString()
        .withMessage("'country' field must be a string."),
      check("state")
        .notEmpty()
        .withMessage("'state' field can not be empty.")
        .isString()
        .withMessage("'state' field must be a string."),
      check("city")
        .notEmpty()
        .withMessage("'city' field can not be empty.")
        .isString()
        .withMessage("'city' field must be a string."),
      check("zone")
        .optional()
        .notEmpty()
        .withMessage("'zone' field can not be empty.")
        .isString()
        .withMessage("'zone' field must be a string."),
      check("apartmentUnite")
        .optional()
        .notEmpty()
        .withMessage("'apartmentUnite' field can not be empty.")
        .custom((value) => {
          return this.isNumber("apartmentUnite", value);
        }),
      check("postalCode")
        .notEmpty()
        .withMessage("'postalCode' field can not be empty.")
        .isString()
        .withMessage("'postalCode' field must be a string."),
      check("userId")
        .notEmpty()
        .withMessage("'userId' field can not be empty."),
    ];
  }
  getAddresses(): ValidationChain[] {
    return [
      check("user")
        .optional()
        .notEmpty()
        .withMessage("'user' field can not be empty.")
        .custom((value) => {
          if (value != "true" && value != "false") {
            throw new Error(
              "Avialable option for 'user' field are true or false."
            );
          }
          return true;
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
