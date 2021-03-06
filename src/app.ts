require('dotenv').config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { makeExecutableSchema } from 'graphql-tools';

import 'module-alias/register';
import './connection';

import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

const app: Application = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors(), express.json());

const context = ({ req }: any): any => {
  const token = req.headers.authorization || '';

  try {
    const [authType, tokenString]: Array<string> = token.split(' ');
    if (authType.toLowerCase() === 'bearer') {
      return jwt.verify(tokenString, process.env.ACCESS_TOKEN_SECRET || '');
    }
    throw new Error();
  } catch (e) {
    throw new Error('Authentication token is invalid, please log in');
  }
};

const server = new ApolloServer({
  schema,
  context,
  formatError: (err: GraphQLError): GraphQLFormattedError<Record<string, any>> => {
    return err;
  },
});

server.applyMiddleware({ app });

app.listen(9000, () => console.info(`Server started on port 9000`));
