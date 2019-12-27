import HttpStatus from 'http-status-codes';
import { validationResult, check } from 'express-validator';
import UserService from '@services/UserService';

export const registerValidator = [
  check('email').isEmail(),
  check('firstName').isString(),
  check('lastName').isString(),
  check('password').isLength({ min: 3 }),
];

const userService = new UserService();

const registerController = async (req: any, res: any): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  const user = await userService.createUser(req.body);

  if (user === HttpStatus.BAD_REQUEST) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      success: false,
      message: `Email already exists: ${req.body.email}`,
    });
  }

  return res.json(user);
};

export default registerController;
