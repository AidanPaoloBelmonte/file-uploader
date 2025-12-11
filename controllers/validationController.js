import { body } from "express-validator";

const reqErr = "is required.";
const lenErr = `must be between $1 and $2 characters.`;
const patErr = "can only contain letters, numbers or an underscore";

const validateUser = [
  body("username")
    .escape()
    .notEmpty()
    .withMessage(`A Username ${reqErr}`)
    .isLength({ min: 3, max: 32 })
    .withMessage(`A Username ${(lenErr, [3, 32])}`)
    .matches(/^\w+$/)
    .withMessage(`A Username ${patErr}`),
  body("password")
    .escape()
    .notEmpty()
    .withMessage(`A Password ${reqErr}`)
    .isLength({ min: 3, max: 32 })
    .withMessage(`A Password must be between 3 and 32 characters.`),
];

const validatePost = [
  body("post")
    .escape()
    .notEmpty()
    .withMessage(`The post ${reqErr}`)
    .isLength({ min: 3, max: 255 })
    .withMessage(`The post must be between 3 and 255 characters.`),
];

export { validateUser, validatePost };
