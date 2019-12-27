import { validationResult, check } from 'express-validator';

import SecurityService from '@services/SecurityService';
import RefreshToken, { RefreshTokenInterface } from '@models/refreshToken';

const securityService: SecurityService = new SecurityService();

export const tokenValidator = [check('token').isString()];

const tokenController = async (req: any, res: any): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const currentRefreshToken: string = req.body.token;
  if (currentRefreshToken == null) {
    return res.sendStatus(401);
  }
  const refreshToken: RefreshTokenInterface | null = await RefreshToken.findOne({ token: currentRefreshToken });
  if (refreshToken === null) {
    return res.sendStatus(403);
  }

  const accessToken: string | number = securityService.generateAccessTokenByRefreshToken(refreshToken.token);

  if (accessToken === 403) {
    return res.sendStatus(403);
  }
  return res.json({ accessToken: accessToken });
};

export default tokenController;
