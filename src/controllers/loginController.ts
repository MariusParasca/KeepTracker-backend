import HttpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import { validationResult, check } from 'express-validator';

import User from '@models/user';
import SecurityService from '@services/SecurityService';

const securityService: SecurityService = new SecurityService();

export const loginValidator = [check('email').isEmail(), check('password').isLength({ min: 3 })];

const loginController = async (req: any, res: any): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(HttpStatus.NOT_FOUND).send({
      message: `Could not find account`,
    });
    return;
  }

  const samePassword = await bcrypt.compare(password, user.password);
  if (!samePassword) {
    res.status(HttpStatus.UNAUTHORIZED).send({
      message: 'Incorrect credentials',
    });
    return;
  }

  const accessToken = securityService.generateAccessToken(email);
  const refreshToken = await securityService.generateRefreshToken(email);

  res.send({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    accessToken,
    refreshToken,
  });

  return;
};

export default loginController;
