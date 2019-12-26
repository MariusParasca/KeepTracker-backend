import bcrypt from 'bcrypt';

import SecurityService from '@services/SecurityService';
import User, { UserInterface, UserLoggedInterface } from '@models/user';
import { USER_EXISTS, SERVER_ERROR } from '@constants/errorConstants';
import { SALTED_ROUNDS } from '@constants/constants';

export default class UserService {
  securityService: SecurityService;
  constructor() {
    this.securityService = new SecurityService();
  }

  _generateHashForPassword = async (password: string): Promise<string> => {
    try {
      return bcrypt.hash(password, SALTED_ROUNDS);
    } catch (error) {
      throw new Error(SERVER_ERROR);
    }
  };

  createUser = async ({ email, firstName, lastName, password }: UserInterface): Promise<UserLoggedInterface> => {
    const user = await User.findOne({ email: email });

    if (user !== null) {
      throw new Error(USER_EXISTS);
    }

    const newUser = new User({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: await this._generateHashForPassword(password),
    });

    const savedUser = await newUser.save();

    const userDTO: UserLoggedInterface = {
      id: savedUser.id,
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      accessToken: this.securityService.generateAccessToken(savedUser.email),
      refreshToken: await this.securityService.generateRefreshToken(savedUser.email),
    };

    return userDTO;
  };
}
