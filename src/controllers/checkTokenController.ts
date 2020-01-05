import HttpStatus from 'http-status-codes';
import { validationResult, check } from 'express-validator';

import SecurityService from '@services/SecurityService';

export const checkTokenValidator = [check('token').isString()];

const securityService = new SecurityService();

const checkTokenController = async (req: any, res: any): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  const token: string = req.body.token;

  if (securityService.isTokenValid(token)) {
    return res.sendStatus(HttpStatus.OK);
  } else {
    return res.sendStatus(HttpStatus.UNAUTHORIZED);
  }
};

export default checkTokenController;
