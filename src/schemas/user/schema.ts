import { gql } from 'apollo-server-express';

export const User = gql`
	type User {
		id: Int!
		firstName: String!
		lastName: String!
	}
`;
