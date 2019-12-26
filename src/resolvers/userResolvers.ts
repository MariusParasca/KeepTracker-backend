import User, { UserInterface } from '@models/user';
import { DocumentQuery } from 'mongoose';
import UserService from '@services/userService';

const userService = new UserService();

const userResolvers = {
  Query: {
    userByEmail: (_root: any, args: any): DocumentQuery<UserInterface | null, UserInterface, {}> => {
      return User.findOne({ email: args.userEmail });
    },
  },
  Mutation: {
    createUser: (_root: any, args: UserInterface): Promise<UserInterface> => {
      return userService.createUser(args);
    },
  },
};

export default userResolvers;
