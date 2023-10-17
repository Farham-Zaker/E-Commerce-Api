import { check, ValidationChain } from "express-validator";

export default new (class {
  createProduct(): ValidationChain[] {
    return [
      check("title")
        .notEmpty()
        .withMessage("'title' field can not be empty.")
        .isString()
        .withMessage("'title' field must be a string."),

      check("price")
        .notEmpty()
        .withMessage("'price' field can not be empty.")
        .custom((value) => {
          if (typeof value !== "number") {
            throw new Error("'price' field must be a string.");
          }
          return true;
        }),

      check("discountStatus")
        .notEmpty()
        .withMessage("'discountStatus' field can not be empty.")
        .isBoolean()
        .withMessage("'discountStatus' field must be a boolean."),

      check("discountPercent").custom((value, { req }) => {
        const { discountStatus, discountPercent } = req.body;
        return this.validateDiscountPercent(
          discountStatus,
          discountPercent,
          value
        );
      }),
      check("discountEndTime").custom((value, { req }) => {
        const { discountStatus, discountEndTime } = req.body.newData;
        return this.discountEndTimeValidator(
          discountStatus,
          discountEndTime,
          value
        );
      }),
      check("categoryId")
        .notEmpty()
        .withMessage("'categoryId' field can not be empty."),
    ];
  }

  private validateDiscountPercent(
    discountStatus: boolean,
    discountPercent: number,
    value: any
  ) {
    if (discountStatus === true) {
      if (value === undefined) {
        throw new Error(
          "'discountPercent' can not be empty when 'discountStatus' is true."
        );
      }
      if (typeof value !== "number") {
        throw new Error("'discountPercent' must be a number.");
      }
      if (value > 100) {
        throw new Error("'discountPercent' can not be more than 100.");
      }
      if (value < 1) {
        throw new Error("'discountPercent' can not be less than 100.");
      }
    }
    if (discountStatus === false && !discountStatus) {
      if (discountPercent) {
        throw new Error(
          "'discountPercent' is not requierd when 'discountStatus' is true."
        );
      }
    }
    return true;
  }

  private discountEndTimeValidator(
    discountStatus: boolean,
    discountEndTime: Date,
    value: any
  ) {
    if (discountStatus === true) {
      if (value === undefined) {
        throw new Error(
          "'discountEndTime' can not be empty when discountStatus is true"
        );
      }
      const isDateValidated =
        /^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value);
      if (!isDateValidated) {
        throw new Error("'discountEndTime' field must be a date.");
      }
    }

    if (discountStatus === false || !discountStatus) {
      if (discountEndTime) {
        throw new Error(
          "'discountPercent' is not requierd when 'discountEndTime' is true."
        );
      }
    }

    return true;
  }
})();
