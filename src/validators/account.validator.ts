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
})();
