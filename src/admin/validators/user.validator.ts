import { check, ValidationChain } from "express-validator";

export default new (class {
  createOrder(): ValidationChain[] {
    return [
      check("firstName")
        .notEmpty()
        .withMessage("'firstName' field can not be empty.")
        .isString()
        .withMessage("'firstName' field must be string."),
      check("lastName")
        .notEmpty()
        .withMessage("'lastName' field can not be empty")
        .isString()
        .withMessage("'lastName' field must be string."),
      check("phone")
        .notEmpty()
        .withMessage("'phone' field can not be empty")
        .isLength({ min: 11, max: 11 })
        .withMessage("'phone' field is invalid."),

      check("email").isEmail().withMessage("'email' field is invalid."),
      check("password")
        .isLength({ min: 8 })
        .withMessage(
          "The password must be more than 8 character and contain alphatic character."
        )
        .custom((value: string) => {
          this.validatePassword(value);
        }),
    ];
  }
  uploadUserImage(): ValidationChain {
    return check("userId")
      .notEmpty()
      .withMessage("'userId' field can not be empty.");
  }
  private validatePassword(value: string): boolean {
    const lettersCount: number = value
      .split("")
      .filter((char: string) => char.match(/[a-zA-Z]/)).length;
    if (lettersCount >= 2) {
      return true;
    }
    throw "The password must contain at lest 2 alphatic character.";
  }
})();
