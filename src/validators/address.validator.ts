import { ValidationChain, check } from "express-validator";

export default new (class {
  addUserAddressValidator(): ValidationChain[] {
    return [
      check("country")
        .notEmpty()
        .withMessage("'country' field can not be empty.")
        .isString()
        .withMessage("'country' field must be a string"),
      check("state")
        .notEmpty()
        .withMessage("'state' field can not be empty.")
        .isString()
        .withMessage("'state' field must be a string"),
      check("city")
        .notEmpty()
        .withMessage("'city' field can not be empty.")
        .isString()
        .withMessage("'city' field must be a string"),
      check("zone")
        .optional()
        .notEmpty()
        .withMessage("'zone' field can not be empty.")
        .isString()
        .withMessage("'zone' field must be a string"),
      check("apartmentUnite")
        .optional()
        .notEmpty()
        .withMessage("'apartmentUnite' field can not be empty.")
        .isNumeric()
        .withMessage("'apartmentUnite' field must be a number"),
      check("postalCode")
        .notEmpty()
        .withMessage("'postalCode' field can not be empty.")
        .isString()
        .withMessage("'postalCode' field must be a string")
        .isLength({ min: 10, max: 10 })
        .withMessage("'postalCode' field must be 10 character."),
    ];
  }
})();
