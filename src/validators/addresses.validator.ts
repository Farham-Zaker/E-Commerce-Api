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
  getUserAddressesValidator(): ValidationChain[] {
    return [
      check("addressId")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'addressId' field in query."
        ),
      check("country")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'country' field in query."
        ),
      check("state")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'state' field in query."
        ),
      check("city")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'city' field in query."
        ),
      check("zone")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'zone' field in query."
        ),
      check("apartmentUnite")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'apartmentUnite' field in query."
        ),
      check("userId")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'userId' field in query."
        ),
      check("createdAt")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'createdAt' field in query."
        ),
    ];
  }
  updateUserAddressValidator(): ValidationChain[] {
    return [
      check("addressId")
        .notEmpty()
        .withMessage("'addressId' can not be empty."),
      check("newAddress")
        .isObject()
        .withMessage(
          "Provide a object contain 'country', 'state', 'zone', 'apartmentUnite', 'postalCode'."
        ),
      check("newAddress.country")
        .notEmpty()
        .withMessage("'country' field can not be empty.")
        .isString()
        .withMessage("'country' field must be a string."),
      check("newAddress.state")
        .notEmpty()
        .withMessage("'state' field can not be empty.")
        .isString()
        .withMessage("'state' field must be a string."),
      check("newAddress.city")
        .notEmpty()
        .withMessage("'city' field can not be empty.")
        .isString()
        .withMessage("'city' field must be a string."),
      check("newAddress.zone")
        .optional()
        .notEmpty()
        .withMessage("'zone' field can not be empty.")
        .isString()
        .withMessage("'zone' field must be a string."),
      check("newAddress.apartmentUnite")
        .optional()
        .notEmpty()
        .withMessage("'apartmentUnite' field can not be empty.")
        .custom((value) => {
          if (typeof value === "string") {
            return false;
          }
          return true;
        })
        .withMessage("'apartmentUnite' field must be a number."),
      check("newAddress.postalCode")
        .notEmpty()
        .withMessage("'postalCode' field can not be empty.")
        .isString()
        .withMessage("'postalCode' field must be a string.")
        .isLength({ min: 10, max: 10 })
        .withMessage("'postalCode' field must be 10 character."),
    ];
  }
})();
