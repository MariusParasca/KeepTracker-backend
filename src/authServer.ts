require('dotenv').config();

import express, { Application } from 'express';
import cors from 'cors';

import 'module-alias/register';
import './connection';

import loginController, { loginValidator } from '@controllers/loginController';
import tokenController, { tokenValidator } from '@controllers/tokenController';

const app: Application = express();

app.use(cors(), express.json());

app.post('/login', loginValidator, loginController);

app.post('/token', tokenValidator, tokenController);

app.listen(9001, () => console.info(`Server started on port 9001`));
