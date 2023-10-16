import { body, check, ValidationChain } from "express-validator";

export default new (class accountValidators {
  updateInfoValidator(): ValidationChain[] {
    return [
      body().custom((value, { req }) => {
        if (Object.keys(req.body).length === 0) {
          throw new Error("Request body should not be empty");
        }
        return true;
      }),
      check("firstName")
        .optional()
        .notEmpty()
        .withMessage("'firstName' field can not be empty.")
        .isString()
        .withMessage("'firstName' field must be string.")
        .isLength({ min: 2 })
        .withMessage("'firstName' field must be at lest two charachter."),
      check("lastName")
        .optional()
        .notEmpty()
        .withMessage("'lastName' field can not be empty.")
        .isString()
        .withMessage("'lastName' field must be string.")
        .isLength({ min: 2 })
        .withMessage("'lastName' field must be at lest two charachter."),
      check("phone")
        .optional()
        .notEmpty()
        .withMessage("'phonr' field can not be empty.")
        .isLength({ min: 11, max: 11 })
        .withMessage("phone number is invalid."),
      check("email").optional().isEmail().withMessage("Your email is invalid."),
    ];
  }
  setPasswordValidator(): ValidationChain[] {
    return [
      check("newPassword")
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
  changePasswordValidator(): ValidationChain[] {
    return [
      check("newPassword")
        .isLength({ min: 8 })
        .withMessage(
          "The new password must be more than 8 character and contain alphatic character."
        )
        .custom((value: string) => {
          const lettersCount: number = value
            .split("")
            .filter((char: string) => char.match(/[a-zA-Z]/)).length;
          if (lettersCount >= 2) {
            return true;
          }
          throw "The new password must contain at lest 2 alphatic character.";
        }),
    ];
  }
  getUserInfoValidator(): ValidationChain[] {
    return [
      check("userId")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'userId' field in query."
        ),
      check("firstName")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'firstName' field in query."
        ),
      check("lastName")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'lastName' field in query."
        ),
      check("image")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'image' field in query."
        ),
      check("email")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'email' field in query."
        ),
      check("phone")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'phone' field in query."
        ),
      check("createdAt")
        .optional()
        .isIn(["true", "false"])
        .withMessage(
          "Provide 'true' or 'false' value for 'createdAt' field in query."
        ),
    ];
  }
})();
