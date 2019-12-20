import { gql } from 'apollo-server-express';

export const UserTypeDef = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    users: String
  }

	type Mutation {
		createUser: (firstName: String, lastName: String, email: String): User
	}
`;

export default UserTypeDef;
