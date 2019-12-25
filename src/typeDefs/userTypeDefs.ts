import { gql } from 'apollo-server-express';

export const UserTypeDef = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    userByEmail(userEmail: String!): User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!): User
  }
`;

export default UserTypeDef;
