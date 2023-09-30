import { check, ValidationChain } from "express-validator";

export default new (class V {
  registerValidator(): ValidationChain[] {
    return [
      check("firstName")
        .notEmpty()
        .withMessage("Enter your first name.")
        .isString()
        .withMessage("'firstName' field must be string."),
      check("lastName")
        .notEmpty()
        .withMessage("Enter your first name.")
        .isString()
        .withMessage("'firstName' field must be string."),
      check("phone")
        .notEmpty()
        .withMessage("Enter your phone number.")
        .isLength({ min: 11, max: 11 })
        .withMessage("Your phone number is invalid."),

      check("email").isEmail().withMessage("Your email is invalid."),
      check("password")
        .isLength({ min: 8 })
        .withMessage(
          "The password must be more than 8 character and contain alphatic character."
        )
        .custom((value: string) => {
          const lettersCount: number = value
            .split("")
            .filter((char: string) => char.match(/[a-zA-Z]/)).length;
          if (lettersCount >= 2) {
            return true;
          }
          throw "The password must contain at lest 2 alphatic character.";
        }),
    ];
  }
  loginValidator(): ValidationChain[] {
    return [
      check("phoneOrEmail")
        .notEmpty()
        .withMessage("Enter your phone number or  email."),
      check("password").notEmpty().withMessage("Enter your password."),
    ];
  }
})();
