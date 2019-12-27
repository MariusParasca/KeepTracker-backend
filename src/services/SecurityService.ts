import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import RefreshToken, { RefreshTokenInterface } from '@models/refreshToken';

export default class SecurityService {
  generateAccessToken = (email: string): string => {
    return jwt.sign({ name: email }, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '15m' });
  };

  generateRefreshToken = async (email: string): Promise<string> => {
    const token: string = jwt.sign({ name: email }, process.env.REFRESH_TOKEN_SECRET || '');
    let refreshToken: RefreshTokenInterface | null = await RefreshToken.findOne({ email });
    if (refreshToken === null) {
      refreshToken = new RefreshToken({ token, email });
      await refreshToken.save();
    } else {
      await refreshToken.updateOne({ token });
    }

    return token;
  };

  generateAccessTokenByRefreshToken = (refreshToken: string): string | number => {
    try {
      const user: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '');
      const accessToken: string = this.generateAccessToken(user.name);
      return accessToken;
    } catch (error) {
      return HttpStatus.FORBIDDEN;
    }
  };
}
