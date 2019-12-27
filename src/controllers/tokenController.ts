import HttpStatus from 'http-status-codes';
import { validationResult, check } from 'express-validator';

import SecurityService from '@services/SecurityService';
import RefreshToken, { RefreshTokenInterface } from '@models/refreshToken';

const securityService: SecurityService = new SecurityService();

export const tokenValidator = [check('token').isString()];

const tokenController = async (req: any, res: any): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  const currentRefreshToken: string = req.body.token;
  if (currentRefreshToken == null) {
    return res.sendStatus(HttpStatus.UNAUTHORIZED);
  }
  const refreshToken: RefreshTokenInterface | null = await RefreshToken.findOne({ token: currentRefreshToken });
  if (refreshToken === null) {
    return res.sendStatus(HttpStatus.FORBIDDEN);
  }

  const accessToken: string | number = securityService.generateAccessTokenByRefreshToken(refreshToken.token);

  if (accessToken === HttpStatus.FORBIDDEN) {
    return res.sendStatus(HttpStatus.FORBIDDEN);
  }
  return res.json({ accessToken: accessToken });
};

export default tokenController;
