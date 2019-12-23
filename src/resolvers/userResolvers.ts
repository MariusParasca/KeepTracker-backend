import User, { UserInterface } from '@models/user';
import { DocumentQuery } from 'mongoose';

const userResolvers = {
  Query: {
    userByEmail: (_root: any, args: any): DocumentQuery<UserInterface | null, UserInterface, {}> => {
      return User.findOne({ email: args.userEmail });
    },
  },
  Mutation: {
    createUser: (_root: any, args: any): Promise<UserInterface> => {
      const user = new User({
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
      });
      return user.save();
    },
  },
};

export default userResolvers;
