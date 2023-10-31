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
})();
