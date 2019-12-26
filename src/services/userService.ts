import bcrypt from 'bcrypt';

import User, { UserInterface } from '@models/user';
import { USER_EXISTS, SERVER_ERROR } from '@constants/errorConstants';
import { SALTED_ROUNDS } from '@constants/constants';

export default class UserService {
  _generateHashForPassword = async (password: string): Promise<string> => {
    try {
      return bcrypt.hash(password, SALTED_ROUNDS);
    } catch (error) {
      throw new Error(SERVER_ERROR);
    }
  };

  createUser = async ({ email, firstName, lastName, password }: UserInterface): Promise<UserInterface> => {
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

    return newUser.save();
  };
}
