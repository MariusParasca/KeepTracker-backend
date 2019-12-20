import User from '@models/user';

const userResolvers = {
  Query: {
    users: (): string => 'Test ',
  },
  Mutation: {
    createUser: (root, args): User => {},
  },
};

export default userResolvers;
