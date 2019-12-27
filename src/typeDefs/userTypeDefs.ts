import { gql } from 'apollo-server-express';

export const UserTypeDef = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    accessToken: String
    refreshToken: String
  }

  type Query {
    userByEmail(userEmail: String!): User
  }
`;

export default UserTypeDef;
