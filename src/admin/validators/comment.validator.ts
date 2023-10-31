import { check, ValidationChain } from "express-validator";

export default new (class {
  createComment(): ValidationChain[] {
    return [
      check("comment")
        .notEmpty()
        .withMessage("'comment' field can not be empty.")
        .isString()
        .withMessage("'comment' field must be a string."),
      check("role")
        .notEmpty()
        .withMessage("'role' field can not be empty.")
        .custom((value) => {
          return this.isCommentOrRepoly(value);
        }),
      check("replyId")
        .custom((value, { req }) => {
          return this.validateReplyId(value, req.body.role);
        }),
      check("userId")
        .notEmpty()
        .withMessage("'userId' field can not be empty."),
      check("productId")
        .notEmpty()
        .withMessage("'productId' field can not be empty."),
    ];
  }
  getValidator(): ValidationChain[] {
    return [
      check("role")
        .optional()
        .notEmpty()
        .withMessage("'role' field can not be empty.")
        .custom((value) => {
          return this.isCommentOrRepoly(value);
        }),
      check("user")
        .optional()
        .notEmpty()
        .withMessage("'user' field can not be empty.")
        .custom((value) => {
          return this.isBoolean("user", value);
        }),
      check("product")
        .optional()
        .notEmpty()
        .withMessage("'product' field can not be empty.")
        .custom((value) => {
          return this.isBoolean("product", value);
        }),
      check("reply")
        .optional()
        .notEmpty()
        .withMessage("'reply' field can not be empty.")
        .custom((value, { req }) => {
          const replyValidation = this.isBoolean("reply", value);
          if (replyValidation && req.query?.role != "comment") {
            throw new Error(
              "'role' must be 'comment' when 'reply' feild is true."
            );
          }
          return true;
        }),
    ];
  }
  private isCommentOrRepoly(value: string): boolean {
    if (value !== "comment" && value !== "reply") {
      throw new Error(
        "Avialable option for 'role' field are 'comment' and 'reply'."
      );
    }
    return true;
  }
  private validateReplyId(value: string, role: string): boolean {
    if ((role === "reply" && !value) || value === "") {
      throw new Error("'replyId' field can not be empty when role is 'reply'.");
    }
    return true;
  }
  private isBoolean(filed: string, value: string): boolean {
    if (value !== "true" && value !== "false") {
      throw new Error(`'${filed}' field must be 'true' or 'false'.`);
    }
    return true;
  }
})();
