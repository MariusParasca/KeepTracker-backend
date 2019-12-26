import User, { UserInterface, UserLoggedInterface } from '@models/user';
import { DocumentQuery } from 'mongoose';
import UserService from '@services/UserService';

const userService = new UserService();

const userResolvers = {
  Query: {
    userByEmail: (_root: any, args: any): DocumentQuery<UserInterface | null, UserInterface, {}> => {
      return User.findOne({ email: args.userEmail });
    },
  },
  Mutation: {
    createUser: (_root: any, args: UserInterface): Promise<UserLoggedInterface> => {
      return userService.createUser(args);
    },
  },
};

export default userResolvers;
