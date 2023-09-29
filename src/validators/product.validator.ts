import { ValidationChain, check } from "express-validator";

export default new (class {
  filterProductValidator(): ValidationChain[] {
    return [
      check("orderBy")
        .notEmpty()
        .withMessage("'orderBy' field must be a non-empty string.")
        .isString()
        .withMessage("'orderBy' field must be a string"),

      check("colorIds")
        .optional()
        .isArray()
        .isUUID()
        .withMessage("The 'colorIds' field must be array of uuid(string)."),

      check("categoryIds")
        .optional()
        .isArray()
        .isUUID()
        .withMessage("The 'categoryIds' field must be array of uuid(string)."),

      check("minPrice")
        .optional()
        .isNumeric()
        .withMessage("'minPrice' field must be a number."),

      check("maxPrice")
        .optional()
        .isNumeric()
        .withMessage("'maxPrice' field must be a number."),

      check("extence")
        .optional()
        .isBoolean()
        .withMessage("'extence' field must be a boolean value."),

      check("hasDiscount")
        .optional()
        .isBoolean()
        .withMessage("'hasDiscount' field must be a number."),

      check("take")
        .notEmpty()
        .withMessage("'take' field must be a non-empty string.")
        .isNumeric()
        .withMessage("'take' field must be a number."),

      check("skip")
        .notEmpty()
        .withMessage("'skip' field must be a non-empty string.")
        .isNumeric()
        .withMessage("'skip' field must be a number."),
    ];
  }
})();
