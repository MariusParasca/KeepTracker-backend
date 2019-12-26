require('dotenv').config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
// import jwt from 'jsonwebtoken';
import { makeExecutableSchema } from 'graphql-tools';

import 'module-alias/register';
import './connection';

import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

const app: Application = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors(), express.json());

const server = new ApolloServer({
  schema,
  // formatError: (err: GraphQLError): GraphQLFormattedError<Record<string, any>> => {
  //   return new Error(err.message);
  // },
});

server.applyMiddleware({ app });

app.listen(9000, () => console.info(`Server started on port 9000`));
