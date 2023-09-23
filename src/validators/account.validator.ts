import { check, ValidationChain } from "express-validator";

export default new (class accountValidators {
  updateInfoValidator(): ValidationChain[] {
    return [
      check("userId").notEmpty().withMessage("Enter userId."),
      check("newData")
        .notEmpty()
        .withMessage("Enter the data that you want to update."),
      check("newData.firstName")
        .notEmpty()
        .withMessage("Enter your first name."),
      check("newData.lastName")
        .notEmpty()
        .withMessage("Enter your first name."),
      check("newData.phone").notEmpty().withMessage("Enter your phone number."),
      check("newData.phone")
        .isLength({ min: 11, max: 11 })
        .withMessage("Your phone number is invalid."),
      check("newData.email").isEmail().withMessage("Your email is invalid."),
    ];
  }
  setPasswordValidator(): ValidationChain[] {
    return [
      check("newPassword")
        .isLength({ min: 8 })
        .withMessage(
          "The password must be more than 8 character and contain alphatic character."
        ),
      check("newPassword").custom((value: string) => {
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
})();
