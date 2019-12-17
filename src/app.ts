import express, { Application } from 'express';
import { ApolloServer, gql } from 'apollo-server-express'
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';

const app: Application = express();

const typeDefs = gql`
  type Query {
    announcement: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		announcement: () =>
			`Say hello to the new Apollo Server! A production ready GraphQL server with an incredible getting started experience.`
	}
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors(), bodyParser.json());

const server = new ApolloServer({
	schema
});

server.applyMiddleware({ app });

app.listen(
	9000, () => console.info(
		`Server started on port 9000`
	)
);
