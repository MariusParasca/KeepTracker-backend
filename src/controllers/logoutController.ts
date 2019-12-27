import HttpStatus from 'http-status-codes';
import { validationResult, check } from 'express-validator';

import RefreshToken from '@models/refreshToken';

export const logoutValidator = [check('token').isString()];

const logoutController = async (req: any, res: any): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  const token: string = req.body.token;

  await RefreshToken.findOneAndRemove({ token: token });

  return res.sendStatus(HttpStatus.OK);
};

export default logoutController;
