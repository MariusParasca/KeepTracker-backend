import User, { UserInterface } from '@models/user';
import { USER_EXISTS } from './errorConstants';

export default class UserService {
  createUser = async ({ email, firstName, lastName }: UserInterface): Promise<UserInterface> => {
    const user = await User.findOne({ email: email });

    if (user !== null) {
      throw new Error(USER_EXISTS);
    }

    const newUser = new User({
      email: email,
      firstName: firstName,
      lastName: lastName,
    });

    return newUser.save();
  };
}
