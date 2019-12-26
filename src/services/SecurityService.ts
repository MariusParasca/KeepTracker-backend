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
      refreshToken.token = token;
      await refreshToken.updateOne({ _id: refreshToken.id });
    }

    return token;
  };
}
