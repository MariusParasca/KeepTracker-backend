import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';

import 'module-alias/register';
import './connection';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

const app: Application = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors(), bodyParser.json());

const server = new ApolloServer({
  schema,
});

server.applyMiddleware({ app });

app.listen(9000, () => console.info(`Server started on port 9000`));
