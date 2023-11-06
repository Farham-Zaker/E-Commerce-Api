import { check, ValidationChain } from "express-validator";

export default new (class {
  createOrder(): ValidationChain[] {
    return [
      check("userId")
        .notEmpty()
        .withMessage("'userId' field can not be empty."),
      check("totalPrice")
        .notEmpty()
        .withMessage("'userId' field can not be empty.")
        .custom((value) => {
          if (typeof value !== "number") {
            throw new Error("Provide a number for 'totalPrice' field.");
          }
          return true;
        }),
      check("status")
        .notEmpty()
        .withMessage("'status' field can not be empty.")
        .custom((value) => {
          return this.validateStatusField(value);
        }),
    ];
  }
  getOrders(): ValidationChain[] {
    return [
      check("date")
        .optional()
        .notEmpty()
        .withMessage("'date' field can not be empty.")
        .isISO8601()
        .withMessage("'date' must be in ISO08604 format."),
      check("totalSale")
        .optional()
        .notEmpty()
        .withMessage("'totalSale' field can not be empty.")
        .custom((value, { req }) => {
          return this.validateWhenOrderItemIsFalse("totalSale", value, req);
        }),
      check("oderItems")
        .optional()
        .notEmpty()
        .withMessage("'oderItems' field can not be empty.")
        .custom((value) => {
          return this.validateWhenOrderItemIsFalse("orderItemd", value);
        }),
      check("user")
        .optional()
        .notEmpty()
        .withMessage("'user' field can not be empty.")
        .custom((value) => {
          return this.validateWhenOrderItemIsFalse("user", value);
        }),
      check("color")
        .optional()
        .notEmpty()
        .withMessage("'color' field can not be empty.")
        .custom((value, { req }) => {
          return this.validateWhenOrderItemIsFalse("color", value, req);
        }),
      check("payment")
        .optional()
        .custom((value) => {
          return this.validateWhenOrderItemIsFalse("paymeny", value);
        }),
      check("take")
        .optional()
        .isNumeric()
        .withMessage("'take' field must be a number.")
        .isNumeric()
        .withMessage("'take' field must be a number."),
      check("skip")
        .optional()
        .notEmpty()
        .withMessage("'skip' field can not be empty.")
        .isNumeric()
        .withMessage("'skip' field must be a number."),
      check("product")
        .optional()
        .custom((value, { req }) => {
          return this.validateWhenOrderItemIsFalse("product", value, req);
        }),
      check("status")
        .optional()
        .notEmpty()
        .withMessage("'status' field can not empty.")
        .custom((value) => {
          return this.validateStatusField(value);
        }),
    ];
  }
  updateOrderValidator(): ValidationChain[] {
    return [
      check("orderId")
        .notEmpty()
        .withMessage("'orderId' field can not be empty."),
      check("status")
        .notEmpty()
        .withMessage("'status' field can not be empty.")
        .custom((value) => {
          return this.validateStatusField(value);
        }),
      check("totalPrice")
        .optional()
        .notEmpty()
        .withMessage("'totalPrice' field cant not be empty.")
        .custom((value) => {
          if (typeof value !== "number") {
            throw new Error("Provide a number for 'totalPrice' field.");
          }
          return true;
        }),
    ];
  }
  private validateWhenOrderItemIsFalse(
    field: string,
    value: string,
    req?: any
  ) {
    if (value === "") {
      throw new Error(`'${field}' field can not be empty.`);
    }

    switch (field) {
      case "totalSale":
      case "color":
      case "product":
        if (value === "true" && req.query?.orderItems === "false") {
          throw new Error(
            `'orderItems' field must be true when '${field}' field is true.`
          );
        }
        if (value !== "true" && value !== "false") {
          throw new Error(`'${field}' must be a boolean.`);
        }
        break;

      default:
        if (value !== "true" && value !== "false") {
          throw new Error(`'${field}' must be a boolean.`);
        }
        break;
    }

    return true;
  }
  private validateStatusField(value: string): boolean {
    if (value === "Pending" || value === "Canceled" || value === "Finished") {
      return true;
    }
    throw new Error(
      "Avialiable options for status field are Pending, Canceled and finished."
    );
  }
})();
