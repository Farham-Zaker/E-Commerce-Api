import { check, ValidationChain } from "express-validator";

export default new (class {
  addCommentValidator(): ValidationChain[] {
    return [
      check("comment")
        .isLength({ min: 1 })
        .withMessage("'comment' field can not be empty."),
      check("productId")
        .notEmpty()
        .withMessage("'productId' field can not be empty."),
    ];
  }
  updateCommentValidator(): ValidationChain[] {
    return [
      check("commentId")
        .notEmpty()
        .withMessage("'commentId' field can not be empty."),
      check("comment")
        .isLength({ min: 1 })
        .withMessage("'comment' field can not be empty."),
    ];
  }
})();
