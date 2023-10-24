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
  private validateStatusField(value: string): boolean {
    if (value === "Pending" || value === "Canceled" || value === "Finished") {
      return true;
    }
    throw new Error(
      "Avialiable options for status field are Pending, Canceled and finished."
    );
  }
})();
